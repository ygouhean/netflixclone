<template>
  <div class="success-page">
    <Navbar />
    
    <div class="container">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h1>Paiement réussi !</h1>
          <p v-if="isAuthenticated && hasActiveSubscription">Bienvenue sur Netflix ! Votre abonnement est maintenant actif.</p>
          <p v-else-if="isAuthenticated">Votre paiement a été traité. Nous activons votre abonnement...</p>
          <p v-else>Votre paiement a été traité. Veuillez vous connecter pour accéder à votre abonnement.</p>
        
        <div class="success-actions">
          <button @click="goToBrowse" class="btn btn-primary btn-large" v-if="isAuthenticated">
            Commencer à regarder
          </button>
          <button @click="goToLogin" class="btn btn-primary btn-large" v-else>
            Se connecter
          </button>
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
    console.log('🎉 Page de succès chargée');
    
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = this.$store.getters['auth/isAuthenticated'];
    console.log('🔐 Utilisateur authentifié:', isAuthenticated);
    
    if (isAuthenticated) {
      // Rafraîchir les données utilisateur après paiement
      await this.$store.dispatch('auth/checkAuth');
    } else {
      console.log('⚠️ Utilisateur non authentifié, redirection vers la page de connexion');
      setTimeout(() => {
        this.$router.push('/login');
      }, 3000);
      return;
    }
    
    // Récupérer le plan depuis l'URL ou le localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');
    const planFromStorage = localStorage.getItem('selectedPlan');
    const selectedPlan = planFromUrl || planFromStorage || 'standard';
    
    console.log('📋 Plan sélectionné:', selectedPlan);
    
    // Vérifier immédiatement l'état de l'abonnement
    let hasActiveSubscription = this.$store.getters['auth/hasActiveSubscription'];
    const user = this.$store.state.auth.user;
    console.log('🔍 Abonnement actif immédiatement:', hasActiveSubscription);
    console.log('👤 Utilisateur:', user);
    console.log('📋 Abonnement utilisateur:', user?.abonnement);
    
    // Si pas d'abonnement actif, attendre le webhook puis activer automatiquement
    if (!hasActiveSubscription) {
      console.log('⏳ Attente du webhook Stripe...');
      
      // Attendre le webhook avec plusieurs tentatives
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`🔄 Tentative ${attempt}/3 - Attente de 2 secondes...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await this.$store.dispatch('auth/checkAuth');
        hasActiveSubscription = this.$store.getters['auth/hasActiveSubscription'];
        
        if (hasActiveSubscription) {
          console.log('✅ Webhook reçu, abonnement activé !');
          break;
        }
        
        console.log(`❌ Tentative ${attempt} échouée, abonnement non actif`);
      }
      
      // Si toujours pas d'abonnement après 3 tentatives, activation automatique
      if (!hasActiveSubscription) {
        console.log('🚀 Activation automatique avec le plan:', selectedPlan);
        try {
          await this.$store.dispatch('auth/forceActivateSubscription', { plan: selectedPlan });
          await this.$store.dispatch('auth/checkAuth');
          console.log('✅ Abonnement activé automatiquement avec le plan:', selectedPlan);
        } catch (error) {
          console.error('❌ Erreur activation automatique:', error);
        }
      }
    }
    
    // Nettoyer le localStorage après activation
    localStorage.removeItem('selectedPlan');
    
    // Redirection automatique vers la page de visualisation après 3 secondes
    // Seulement si l'utilisateur est authentifié et a un abonnement actif
    setTimeout(() => {
      const hasActiveSubscription = this.$store.getters['auth/hasActiveSubscription'];
      console.log('🔍 Abonnement actif avant redirection:', hasActiveSubscription);
      
      if (hasActiveSubscription) {
        console.log('🎬 Redirection vers la page de visualisation...');
        this.$router.push('/browse');
      } else {
        console.log('⚠️ Pas d\'abonnement actif, redirection vers la page d\'abonnement...');
        this.$router.push('/subscribe');
      }
    }, 3000);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    hasActiveSubscription() {
      return this.$store.getters['auth/hasActiveSubscription'];
    }
  },
  methods: {
    goToBrowse() {
      const hasActiveSubscription = this.$store.getters['auth/hasActiveSubscription'];
      console.log('🔍 Abonnement actif (manuel):', hasActiveSubscription);
      
      if (hasActiveSubscription) {
        console.log('🎬 Redirection manuelle vers la page de visualisation...');
        this.$router.push('/browse');
      } else {
        console.log('⚠️ Pas d\'abonnement actif, redirection vers la page d\'abonnement...');
        this.$router.push('/subscribe');
      }
    },
    goToLogin() {
      console.log('🔐 Redirection vers la page de connexion...');
      this.$router.push('/login');
    }
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

