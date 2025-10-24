const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/subscriptions/stats
// @desc    Obtenir les statistiques des abonnements
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$abonnement.type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await User.countDocuments({ 'abonnement.statut': 'actif' });
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        activeSubscriptions,
        byPlan: stats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
});

module.exports = router;

