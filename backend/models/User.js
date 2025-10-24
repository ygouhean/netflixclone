const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe requis'],
    minlength: 6,
    select: false
  },
  nom: {
    type: String,
    required: [true, 'Nom requis']
  },
  prenom: {
    type: String,
    required: [true, 'Prénom requis']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  abonnement: {
    type: {
      type: String,
      enum: ['basique', 'standard', 'premium', 'none'],
      default: 'none'
    },
    statut: {
      type: String,
      enum: ['actif', 'inactif', 'annule'],
      default: 'inactif'
    },
    dateDebut: Date,
    dateFin: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String
  },
  favoris: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  historique: [{
    film: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    dateVu: {
      type: Date,
      default: Date.now
    },
    progression: {
      type: Number,
      default: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Crypter le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

