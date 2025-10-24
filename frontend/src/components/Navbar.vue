<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-content container">
      <div class="navbar-left">
        <router-link to="/browse" class="navbar-logo">NETFLIX</router-link>
        <ul class="navbar-menu">
          <li><router-link to="/browse">Accueil</router-link></li>
          <li><router-link to="/my-list">Ma liste</router-link></li>
        </ul>
      </div>
      
      <div class="navbar-right">
        <div class="user-menu">
          <button class="user-button" @click="toggleMenu">
            <span>{{ userInitials }}</span>
            <span class="arrow">▼</span>
          </button>
          
          <div v-if="showMenu" class="dropdown-menu">
            <div class="user-info">
              <p class="user-name">{{ user.prenom }} {{ user.nom }}</p>
              <p class="user-email">{{ user.email }}</p>
              <p class="user-plan">{{ getPlanName() }}</p>
            </div>
            <div class="menu-divider"></div>
            <router-link to="/subscribe" class="menu-item" v-if="!hasActiveSubscription">
              S'abonner
            </router-link>
            <router-link to="/admin" class="menu-item" v-if="isAdmin">
              Administration
            </router-link>
            <button @click="logout" class="menu-item">Se déconnecter</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false,
      showMenu: false
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user || {};
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    hasActiveSubscription() {
      return this.$store.getters['auth/hasActiveSubscription'];
    },
    userInitials() {
      const first = this.user.prenom?.charAt(0) || '';
      const last = this.user.nom?.charAt(0) || '';
      return (first + last).toUpperCase() || '?';
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    getPlanName() {
      const names = {
        basique: 'Basique',
        standard: 'Standard',
        premium: 'Premium',
        none: 'Sans abonnement'
      };
      return names[this.user.abonnement?.type] || 'Sans abonnement';
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showMenu = false;
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
  transition: background-color 0.3s ease;
  z-index: 999;
}

.navbar.scrolled {
  background-color: var(--netflix-black);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-logo {
  color: var(--netflix-red);
  font-size: 2rem;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: -2px;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.navbar-menu a:hover,
.navbar-menu a.router-link-active {
  color: #ccc;
}

.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
}

.user-button span:first-child {
  width: 35px;
  height: 35px;
  background-color: var(--netflix-red);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.arrow {
  font-size: 0.7rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.95);
  border: 1px solid #333;
  border-radius: 4px;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.user-info {
  padding: 1rem;
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.user-plan {
  font-size: 0.85rem;
  color: var(--netflix-red);
  font-weight: 600;
}

.menu-divider {
  height: 1px;
  background-color: #333;
  margin: 0.5rem 0;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: white;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
}
</style>

