// Configuration de production
const getAPIUrl = () => {
  // Priorité 1: Variable d'environnement
  if (process.env.VUE_APP_API_URL) {
    return process.env.VUE_APP_API_URL;
  }
  
  // Priorité 2: URL de production par défaut
  return 'https://netflixclonebackend-ryt0.onrender.com';
};

export const config = {
  API_URL: getAPIUrl(),
  STRIPE_PUBLISHABLE_KEY: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_votre_cle_publique_stripe'
};

// Debug: Afficher la configuration
console.log('🔧 Configuration de production:', config);
console.log('🔧 VUE_APP_API_URL:', process.env.VUE_APP_API_URL);
console.log('🔧 API_URL finale:', config.API_URL);

// Version: 1.0.3 - Robust API URL configuration

