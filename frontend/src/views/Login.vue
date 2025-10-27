<template>
  <div class="login-page">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-logo">NETFLIX</router-link>
      </div>
    </nav>

    <div class="login-container">
      <div class="login-box">
        <h1>Se connecter</h1>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
              class="form-control"
              required
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <div class="login-help">
          <p>
            Première visite sur Netflix ?
            <router-link to="/register">Inscrivez-vous maintenant</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <div class="container">
        <p>Attention !!! Ceci est un projet academic pour validation de compétences techniques nommé Netflixclone Côte d'Ivoire dévéloppé par ❤️Dev Gysc</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;
        this.error = null;
        
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });
        
        // Rediriger selon le rôle
        if (this.$store.getters['auth/isAdmin']) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/browse');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur de connexion';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/CI-fr-20251020-TRIFECTA-perspective_71a7851d-2e85-4ac1-9020-f65dc4ea2988_large.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
}

.login-box {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
}

.login-box h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
}

.error-message {
  background-color: #e87c03;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.login-help {
  margin-top: 2rem;
  color: #8c8c8c;
}

.login-help a {
  color: white;
  text-decoration: none;
}

.login-help a:hover {
  text-decoration: underline;
}

.login-footer {
  padding: 2rem 0;
  background-color: rgba(0, 0, 0, 0.75);
  color: #8c8c8c;
  text-align: center;
}
</style>

