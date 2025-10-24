const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protéger les routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, token manquant' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer l'utilisateur
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé, token invalide' });
  }
};

// Vérifier le rôle admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé - Droits admin requis' });
  }
};

// Vérifier l'abonnement actif
exports.checkSubscription = (req, res, next) => {
  if (req.user && req.user.abonnement.statut === 'actif') {
    next();
  } else {
    res.status(403).json({ message: 'Abonnement requis pour accéder à ce contenu' });
  }
};

