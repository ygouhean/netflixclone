const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Titre requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description requise']
  },
  duree: {
    type: Number,
    required: [true, 'Durée requise']
  },
  anneeSortie: {
    type: Number,
    required: [true, 'Année de sortie requise']
  },
  genre: [{
    type: String,
    required: true
  }],
  categorie: {
    type: String,
    enum: ['film', 'serie'],
    required: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Image requise']
  },
  banniereUrl: {
    type: String
  },
  videoUrl: {
    type: String,
    required: [true, 'URL vidéo requise']
  },
  trailerUrl: {
    type: String
  },
  note: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  ageMinimum: {
    type: Number,
    default: 0
  },
  casting: [{
    nom: String,
    role: String
  }],
  realisateur: {
    type: String
  },
  langue: {
    type: String,
    default: 'Français'
  },
  sousTitres: [{
    type: String
  }],
  nombreVues: {
    type: Number,
    default: 0
  },
  tendance: {
    type: Boolean,
    default: false
  },
  nouveaute: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour la recherche
movieSchema.index({ titre: 'text', description: 'text' });

module.exports = mongoose.model('Movie', movieSchema);

