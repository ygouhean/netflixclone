<template>
  <div class="success-page">
    <Navbar />
    
    <div class="container">
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h1>Paiement réussi !</h1>
        <p>Bienvenue sur Netflix ! Votre abonnement est maintenant actif.</p>
        
        <div class="success-actions">
          <router-link to="/browse" class="btn btn-primary btn-large">
            Commencer à regarder
          </router-link>
        </div>
        
        <div class="success-info">
          <h3>Prochaines étapes :</h3>
          <ul>
            <li>✓ Explorez notre catalogue de films et séries</li>
            <li>✓ Ajoutez des titres à votre liste</li>
            <li>✓ Regardez sur tous vos appareils</li>
            <li>✓ Gérez votre abonnement à tout moment</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';

export default {
  name: 'Success',
  components: {
    Navbar
  },
  async mounted() {
    // Rafraîchir les données utilisateur après paiement
    await this.$store.dispatch('auth/checkAuth');
    
    // Récupérer le plan depuis l'URL ou le localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');
    const planFromStorage = localStorage.getItem('selectedPlan');
    const selectedPlan = planFromUrl || planFromStorage || 'standard';
    
    // Attendre un peu pour que le webhook soit traité
    setTimeout(async () => {
      await this.$store.dispatch('auth/checkAuth');
      
      // Si l'abonnement n'est toujours pas actif après 2 secondes, l'activer automatiquement
      const hasActiveSubscription = this.$store.getters['auth/hasActiveSubscription'];
      if (!hasActiveSubscription) {
        console.log('Webhook non reçu, activation automatique avec le plan:', selectedPlan);
        try {
          await this.$store.dispatch('auth/forceActivateSubscription', { plan: selectedPlan });
          await this.$store.dispatch('auth/checkAuth');
          console.log('✅ Abonnement activé automatiquement avec le plan:', selectedPlan);
          
          // Nettoyer le localStorage après activation
          localStorage.removeItem('selectedPlan');
        } catch (error) {
          console.error('Erreur activation automatique:', error);
        }
      }
    }, 3000);
  },
};
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-content {
  text-align: center;
  max-width: 600px;
  padding: 3rem;
}

.success-icon {
  width: 100px;
  height: 100px;
  background-color: #46d369;
  color: white;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 2rem;
}

.success-content h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.success-content > p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.success-actions {
  margin: 3rem 0;
}

.success-info {
  background-color: #2f2f2f;
  padding: 2rem;
  border-radius: 12px;
  text-align: left;
}

.success-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.success-info ul {
  list-style: none;
}

.success-info li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  border-bottom: 1px solid #444;
}

.success-info li:last-child {
  border-bottom: none;
}
</style>

