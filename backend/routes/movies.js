const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { protect, admin, checkSubscription } = require('../middleware/auth');

// @route   GET /api/movies
// @desc    Obtenir tous les films
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { genre, categorie, search, tendance, nouveaute } = req.query;
    
    let query = {};
    
    if (genre) query.genre = genre;
    if (categorie) query.categorie = categorie;
    if (tendance) query.tendance = true;
    if (nouveaute) query.nouveaute = true;
    if (search) {
      query.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    }
    
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: movies.length,
      movies
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des films', error: error.message });
  }
});

// @route   GET /api/movies/:id
// @desc    Obtenir un film par ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du film' });
  }
});

// @route   POST /api/movies
// @desc    Créer un nouveau film
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    
    res.status(201).json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du film', error: error.message });
  }
});

// @route   PUT /api/movies/:id
// @desc    Mettre à jour un film
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du film' });
  }
});

// @route   DELETE /api/movies/:id
// @desc    Supprimer un film
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    
    res.json({
      success: true,
      message: 'Film supprimé'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du film' });
  }
});

// @route   POST /api/movies/:id/view
// @desc    Incrémenter le nombre de vues
// @access  Private
router.post('/:id/view', protect, checkSubscription, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $inc: { nombreVues: 1 } },
      { new: true }
    );
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des vues' });
  }
});

module.exports = router;

