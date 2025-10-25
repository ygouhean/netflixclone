// Script de test pour vérifier la configuration Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_votre_cle_secrete_stripe');

async function testStripeConfig() {
  console.log('🧪 Test de la configuration Stripe...\n');
  
  try {
    // Test 1: Vérifier la clé API
    console.log('1. Test de la clé API Stripe...');
    const account = await stripe.accounts.retrieve();
    console.log('✅ Clé API valide pour le compte:', account.display_name || account.id);
    
    // Test 2: Vérifier les webhooks
    console.log('\n2. Test des webhooks...');
    const webhooks = await stripe.webhookEndpoints.list();
    console.log('✅ Webhooks configurés:', webhooks.data.length);
    
    webhooks.data.forEach(webhook => {
      console.log(`   - ${webhook.url} (${webhook.status})`);
    });
    
    // Test 3: Vérifier les produits
    console.log('\n3. Test des produits...');
    const products = await stripe.products.list({ limit: 5 });
    console.log('✅ Produits disponibles:', products.data.length);
    
    console.log('\n🎉 Configuration Stripe OK !');
    
  } catch (error) {
    console.error('❌ Erreur de configuration Stripe:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.log('\n💡 Solution: Vérifiez votre clé secrète Stripe dans les variables d\'environnement');
    }
  }
}

testStripeConfig();
