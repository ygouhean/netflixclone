<template>
  <div class="register-page">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-logo">NETFLIX</router-link>
      </div>
    </nav>

    <div class="register-container">
      <div class="register-box">
        <h1>Créer votre compte</h1>
        <p class="subtitle">Quelques étapes simples et c'est terminé - nous détestons les paperasses, nous aussi.</p>
        
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <input
              type="text"
              v-model="prenom"
              placeholder="Prénom"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              v-model="nom"
              placeholder="Nom"
              class="form-control"
              required
            />
          </div>

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
              placeholder="Mot de passe (minimum 6 caractères)"
              class="form-control"
              required
              minlength="6"
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Inscription...' : 'S\'inscrire' }}
          </button>
        </form>

        <div class="register-help">
          <p>
            Déjà membre ?
            <router-link to="/login">Connectez-vous</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
      password: '',
      error: null,
      loading: false
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.loading = true;
        this.error = null;
        
        await this.$store.dispatch('auth/register', {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password
        });
        
        // Rediriger vers la page d'abonnement
        this.$router.push('/subscribe');
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de l\'inscription';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23141414" width="1200" height="800"/></svg>');
  background-size: cover;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

.register-box {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.register-box h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #8c8c8c;
  margin-bottom: 2rem;
  font-size: 1.1rem;
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

.register-help {
  margin-top: 2rem;
  color: #8c8c8c;
}

.register-help a {
  color: white;
  text-decoration: none;
}

.register-help a:hover {
  text-decoration: underline;
}
</style>

