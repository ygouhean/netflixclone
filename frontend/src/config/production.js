// Configuration de production
export const config = {
  API_URL: process.env.VUE_APP_API_URL || 'https://netflixclonebackend-ryt0.onrender.com',
  STRIPE_PUBLISHABLE_KEY: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_votre_cle_publique_stripe'
};

// Debug: Afficher la configuration
console.log('🔧 Configuration de production:', config);
console.log('🔧 VUE_APP_API_URL:', process.env.VUE_APP_API_URL);

// Version: 1.0.2 - Debug configuration

