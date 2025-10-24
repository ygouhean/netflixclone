const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Générer le token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @route   POST /api/auth/register
// @desc    Inscription d'un nouvel utilisateur
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password, nom, prenom } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password,
      nom,
      prenom
    });

    // Retourner le token
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        abonnement: user.abonnement
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Connexion utilisateur
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Retourner le token
    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        abonnement: user.abonnement
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Obtenir l'utilisateur connecté
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoris');
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        abonnement: user.abonnement,
        favoris: user.favoris,
        historique: user.historique
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});

// @route   POST /api/auth/force-activate-subscription
// @desc    Activer manuellement l'abonnement (pour les tests)
// @access  Private
router.post('/force-activate-subscription', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Activer l'abonnement manuellement avec le plan choisi
    // Si pas de plan spécifié, utiliser 'standard' par défaut
    const plan = req.body.plan || 'standard';
    user.abonnement.type = plan;
    user.abonnement.statut = 'actif';
    user.abonnement.dateDebut = new Date();
    await user.save();
    
    console.log('✅ Abonnement activé manuellement pour:', user.email);
    
    res.json({
      success: true,
      message: 'Abonnement activé avec succès',
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        abonnement: user.abonnement
      }
    });
  } catch (error) {
    console.error('Erreur activation manuelle:', error);
    res.status(500).json({ message: 'Erreur lors de l\'activation de l\'abonnement' });
  }
});

module.exports = router;

