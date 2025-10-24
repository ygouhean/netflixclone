// Configuration de production
export const config = {
  API_URL: process.env.VUE_APP_API_URL || 'https://netflix-clone-backend.onrender.com',
  STRIPE_PUBLISHABLE_KEY: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_votre_cle_publique_stripe'
};
