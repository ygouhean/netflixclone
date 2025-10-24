<template>
  <div class="subscribe-page">
    <Navbar />
    
    <div class="container">
      <div class="subscribe-header">
        <h1>Choisissez votre forfait</h1>
        <p>Regardez tout ce que vous voulez. Aucune publicité. Annulez à tout moment.</p>
      </div>
      
      <div class="plans-grid">
        <div
          v-for="(plan, key) in plans"
          :key="key"
          class="plan-card"
          :class="{ selected: selectedPlan === key, popular: key === 'standard' }"
        >
          <div v-if="key === 'standard'" class="popular-badge">Le plus populaire</div>
          
          <h2>{{ plan.name }}</h2>
          <div class="price">
            <span class="amount">{{ (plan.price / 100).toFixed(2) }} €</span>
            <span class="period">/mois</span>
          </div>
          
          <ul class="features">
            <li v-for="(feature, index) in plan.features" :key="index">
              ✓ {{ feature }}
            </li>
          </ul>
          
          <button
            @click="selectPlan(key)"
            class="btn"
            :class="selectedPlan === key ? 'btn-primary' : 'btn-secondary'"
          >
            {{ selectedPlan === key ? 'Sélectionné' : 'Choisir' }}
          </button>
        </div>
      </div>
      
      <div v-if="selectedPlan" class="checkout-section">
        <h2>Récapitulatif</h2>
        <div class="summary">
          <div class="summary-row">
            <span>Forfait {{ plans[selectedPlan].name }}</span>
            <span>{{ (plans[selectedPlan].price / 100).toFixed(2) }} €/mois</span>
          </div>
        </div>
        
        <button
          @click="proceedToPayment"
          class="btn btn-primary btn-large"
          :disabled="loading"
        >
          {{ loading ? 'Traitement...' : 'Continuer vers le paiement' }}
        </button>
        
        <p class="terms">
          En continuant, vous acceptez nos conditions d'utilisation. Vous pouvez annuler votre abonnement à tout moment.
        </p>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../../components/Navbar.vue';

export default {
  name: 'Subscribe',
  components: {
    Navbar
  },
  data() {
    return {
      plans: {
        basique: {
          name: 'Basique',
          price: 799,
          features: ['Qualité SD', '1 écran', 'Ordinateur et mobile']
        },
        standard: {
          name: 'Standard',
          price: 1199,
          features: ['Qualité HD', '2 écrans', 'Tous les appareils']
        },
        premium: {
          name: 'Premium',
          price: 1599,
          features: ['Qualité 4K+HDR', '4 écrans', 'Tous les appareils']
        }
      },
      selectedPlan: null,
      loading: false,
      error: null
    };
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    },
    
    async proceedToPayment() {
      try {
        this.loading = true;
        this.error = null;
        
        // Stocker le plan choisi dans localStorage
        localStorage.setItem('selectedPlan', this.selectedPlan);
        
        // Créer la session Stripe
        const response = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
          plan: this.selectedPlan
        });
        
        // Charger Stripe et rediriger
        const stripe = await loadStripe('pk_test_51SK9qJHwzP8G0qsCIi7TXDZRu9HnNKVSiOFsrHCA07VirjZnC54QzJibdi5RFmzwsFr0raaBvXaIPaeZzwBGF3hb00T0UikeYu');
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId
        });
        
        if (error) {
          this.error = error.message;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors du paiement';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.subscribe-page {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 4rem;
}

.subscribe-header {
  text-align: center;
  margin-bottom: 3rem;
}

.subscribe-header h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.subscribe-header p {
  font-size: 1.2rem;
  color: #ccc;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.plan-card {
  background-color: #2f2f2f;
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  transition: transform 0.3s, border-color 0.3s;
  border: 2px solid transparent;
}

.plan-card:hover {
  transform: translateY(-5px);
}

.plan-card.selected {
  border-color: var(--netflix-red);
}

.plan-card.popular {
  border-color: #46d369;
}

.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #46d369;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
}

.plan-card h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.price {
  margin-bottom: 2rem;
}

.amount {
  font-size: 2.5rem;
  font-weight: 900;
}

.period {
  color: #ccc;
  font-size: 1.2rem;
}

.features {
  list-style: none;
  margin-bottom: 2rem;
}

.features li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  border-bottom: 1px solid #444;
}

.plan-card .btn {
  width: 100%;
}

.checkout-section {
  max-width: 600px;
  margin: 3rem auto;
  background-color: #2f2f2f;
  border-radius: 12px;
  padding: 2rem;
}

.checkout-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.summary {
  background-color: #1f1f1f;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
}

.btn-large {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
}

.terms {
  text-align: center;
  color: #ccc;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.error-message {
  background-color: var(--netflix-red);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .subscribe-header h1 {
    font-size: 2rem;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style>

