const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Plans d'abonnement
const plans = {
  basique: {
    name: 'Basique',
    price: 799, // 7.99 EUR en centimes
    currency: 'eur',
    interval: 'month',
    features: ['Qualité SD', '1 écran']
  },
  standard: {
    name: 'Standard',
    price: 1199, // 11.99 EUR
    currency: 'eur',
    interval: 'month',
    features: ['Qualité HD', '2 écrans']
  },
  premium: {
    name: 'Premium',
    price: 1599, // 15.99 EUR
    currency: 'eur',
    interval: 'month',
    features: ['Qualité 4K+HDR', '4 écrans']
  }
};

// @route   GET /api/payment/plans
// @desc    Obtenir les plans d'abonnement
// @access  Public
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    plans
  });
});

// @route   POST /api/payment/create-checkout-session
// @desc    Créer une session de paiement Stripe
// @access  Private
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!plans[plan]) {
      return res.status(400).json({ message: 'Plan invalide' });
    }
    
    const planDetails = plans[plan];
    
    // Créer un client Stripe si nécessaire
    let customerId = req.user.abonnement.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        metadata: {
          userId: req.user._id.toString()
        }
      });
      customerId = customer.id;
      
      req.user.abonnement.stripeCustomerId = customerId;
      await req.user.save();
    }
    
    // Créer la session de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: planDetails.currency,
            product_data: {
              name: `Abonnement ${planDetails.name}`,
              description: planDetails.features.join(', '),
            },
            unit_amount: planDetails.price,
            recurring: {
              interval: planDetails.interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/subscribe`,
      metadata: {
        userId: req.user._id.toString(),
        plan: plan
      }
    });
    
    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la session', error: error.message });
  }
});

// @route   POST /api/payment/webhook
// @desc    Webhook Stripe pour les événements
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  console.log('Webhook reçu:', {
    signature: sig ? 'présente' : 'manquante',
    bodyLength: req.body ? req.body.length : 0,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'configuré' : 'manquant'
  });
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('Événement webhook validé:', event.type);
  } catch (err) {
    console.error('Erreur webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Gérer l'événement
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('🎉 Événement checkout.session.completed reçu');
      const session = event.data.object;
      console.log('Session metadata:', session.metadata);
      
      // Mettre à jour l'abonnement de l'utilisateur
      const user = await User.findById(session.metadata.userId);
      if (user) {
        console.log('Utilisateur trouvé:', user.email);
        console.log('Ancien abonnement:', user.abonnement);
        
        user.abonnement.type = session.metadata.plan;
        user.abonnement.statut = 'actif';
        user.abonnement.dateDebut = new Date();
        user.abonnement.stripeSubscriptionId = session.subscription;
        await user.save();
        
        console.log('Nouvel abonnement:', user.abonnement);
        console.log('✅ Abonnement mis à jour avec succès');
      } else {
        console.log('❌ Utilisateur non trouvé avec l\'ID:', session.metadata.userId);
      }
      break;
      
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      const userToCancel = await User.findOne({ 'abonnement.stripeSubscriptionId': subscription.id });
      
      if (userToCancel) {
        userToCancel.abonnement.statut = 'annule';
        await userToCancel.save();
      }
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({ received: true });
});

// @route   POST /api/payment/cancel-subscription
// @desc    Annuler l'abonnement
// @access  Private
router.post('/cancel-subscription', protect, async (req, res) => {
  try {
    const subscriptionId = req.user.abonnement.stripeSubscriptionId;
    
    if (!subscriptionId) {
      return res.status(400).json({ message: 'Aucun abonnement actif' });
    }
    
    await stripe.subscriptions.cancel(subscriptionId);
    
    req.user.abonnement.statut = 'annule';
    await req.user.save();
    
    res.json({
      success: true,
      message: 'Abonnement annulé'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'annulation', error: error.message });
  }
});

module.exports = router;

