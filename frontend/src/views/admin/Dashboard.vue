<template>
  <div class="admin-dashboard">
    <AdminNav />
    
    <div class="dashboard-content container">
      <h1>Tableau de bord administrateur</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>Utilisateurs totaux</h3>
            <p class="stat-number">{{ stats?.totalUsers || 0 }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✓</div>
          <div class="stat-info">
            <h3>Abonnements actifs</h3>
            <p class="stat-number">{{ stats?.activeSubscriptions || 0 }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎬</div>
          <div class="stat-info">
            <h3>Films et séries</h3>
            <p class="stat-number">{{ movies.length }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <h3>Revenus mensuels (estimé)</h3>
            <p class="stat-number">{{ calculateRevenue() }} €</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-sections">
        <div class="section">
          <h2>Distribution des abonnements</h2>
          <div v-if="stats?.byPlan" class="plans-distribution">
            <div v-for="plan in stats.byPlan" :key="plan._id" class="plan-stat">
              <span class="plan-name">{{ getPlanName(plan._id) }}</span>
              <div class="plan-bar">
                <div class="plan-fill" :style="{ width: calculatePercentage(plan.count) + '%' }"></div>
              </div>
              <span class="plan-count">{{ plan.count }} utilisateurs</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Accès rapide</h2>
          <div class="quick-actions">
            <router-link to="/admin/movies" class="action-card">
              <div class="action-icon">🎬</div>
              <h3>Gérer les films</h3>
              <p>Ajouter, modifier ou supprimer du contenu</p>
            </router-link>
            
            <router-link to="/admin/users" class="action-card">
              <div class="action-icon">👥</div>
              <h3>Gérer les utilisateurs</h3>
              <p>Consulter et gérer les comptes</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AdminNav
  },
  computed: {
    stats() {
      return this.$store.state.admin.stats;
    },
    movies() {
      return this.$store.state.admin.movies;
    }
  },
  methods: {
    calculateRevenue() {
      if (!this.stats?.byPlan) return 0;
      
      const prices = {
        basique: 7.99,
        standard: 11.99,
        premium: 15.99
      };
      
      return this.stats.byPlan.reduce((total, plan) => {
        return total + (prices[plan._id] || 0) * plan.count;
      }, 0).toFixed(2);
    },
    
    getPlanName(key) {
      const names = {
        basique: 'Basique',
        standard: 'Standard',
        premium: 'Premium',
        none: 'Sans abonnement'
      };
      return names[key] || key;
    },
    
    calculatePercentage(count) {
      if (!this.stats?.totalUsers) return 0;
      return (count / this.stats.totalUsers * 100).toFixed(1);
    }
  },
  created() {
    this.$store.dispatch('admin/fetchStats');
    this.$store.dispatch('admin/fetchMovies');
  }
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #141414;
  padding-top: 80px;
}

.dashboard-content {
  padding: 2rem 0;
}

.dashboard-content h1 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background-color: #2f2f2f;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 3rem;
}

.stat-info h3 {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  color: var(--netflix-red);
}

.dashboard-sections {
  display: grid;
  gap: 2rem;
}

.section {
  background-color: #2f2f2f;
  border-radius: 12px;
  padding: 2rem;
}

.section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.plans-distribution {
  display: grid;
  gap: 1rem;
}

.plan-stat {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 1rem;
  align-items: center;
}

.plan-name {
  font-weight: 600;
}

.plan-bar {
  background-color: #444;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
}

.plan-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--netflix-red), #ff4444);
  transition: width 0.5s ease;
}

.plan-count {
  font-weight: 600;
  color: #ccc;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  color: white;
  transition: transform 0.3s, background-color 0.3s;
}

.action-card:hover {
  transform: translateY(-5px);
  background-color: #2a2a2a;
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.action-card p {
  color: #ccc;
}
</style>

