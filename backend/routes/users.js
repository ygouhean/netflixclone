const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Obtenir tous les utilisateurs
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// @route   GET /api/users/favoris
// @desc    Obtenir les films favoris de l'utilisateur
// @access  Private
router.get('/favoris', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoris');
    
    res.json({
      success: true,
      favoris: user.favoris
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
  }
});

// @route   PUT /api/users/favoris/:movieId
// @desc    Ajouter/retirer un film des favoris
// @access  Private
router.put('/favoris/:movieId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieIndex = user.favoris.indexOf(req.params.movieId);
    
    if (movieIndex > -1) {
      // Retirer des favoris
      user.favoris.splice(movieIndex, 1);
    } else {
      // Ajouter aux favoris
      user.favoris.push(req.params.movieId);
    }
    
    await user.save();
    
    res.json({
      success: true,
      favoris: user.favoris
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des favoris' });
  }
});

// @route   POST /api/users/historique
// @desc    Ajouter à l'historique de visionnage
// @access  Private
router.post('/historique', protect, async (req, res) => {
  try {
    const { filmId, progression } = req.body;
    const user = await User.findById(req.user.id);
    
    // Vérifier si le film est déjà dans l'historique
    const existingIndex = user.historique.findIndex(
      item => item.film.toString() === filmId
    );
    
    if (existingIndex > -1) {
      // Mettre à jour la progression
      user.historique[existingIndex].progression = progression;
      user.historique[existingIndex].dateVu = Date.now();
    } else {
      // Ajouter à l'historique
      user.historique.push({
        film: filmId,
        progression
      });
    }
    
    await user.save();
    
    res.json({
      success: true,
      historique: user.historique
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'historique' });
  }
});

// @route   DELETE /api/users/:id
// @desc    Supprimer un utilisateur
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({
      success: true,
      message: 'Utilisateur supprimé'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

module.exports = router;

