<template>
  <nav class="admin-nav">
    <div class="admin-nav-content container">
      <div class="nav-left">
        <router-link to="/admin" class="admin-logo">
          <span class="logo-text">NETFLIX</span>
          <span class="admin-badge">Admin</span>
        </router-link>
        <ul class="admin-menu">
          <li><router-link to="/admin">Dashboard</router-link></li>
          <li><router-link to="/admin/movies">Films & Séries</router-link></li>
          <li><router-link to="/admin/users">Utilisateurs</router-link></li>
        </ul>
      </div>
      
      <div class="nav-right">
        <router-link to="/browse" class="btn btn-secondary">Vue client</router-link>
        <button @click="logout" class="btn-logout">Déconnexion</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNav',
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.admin-nav {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #0a0a0a;
  border-bottom: 2px solid var(--netflix-red);
  z-index: 999;
  padding: 1rem 0;
}

.admin-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-text {
  color: var(--netflix-red);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -2px;
}

.admin-badge {
  background-color: var(--netflix-red);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.admin-menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.admin-menu a {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.admin-menu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.admin-menu a.router-link-active {
  background-color: var(--netflix-red);
}

.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-logout {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  background-color: white;
  color: #000;
}

@media (max-width: 768px) {
  .admin-menu {
    display: none;
  }
}
</style>

