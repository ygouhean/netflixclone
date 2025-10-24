<template>
  <div class="my-list-page">
    <Navbar />
    
    <div class="container">
      <h1 class="page-title">Ma liste</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="favoriteMovies.length === 0" class="empty-state">
        <h2>Votre liste est vide</h2>
        <p>Ajoutez des films et séries à votre liste pour les retrouver facilement ici.</p>
        <router-link to="/browse" class="btn btn-primary">Découvrir le catalogue</router-link>
      </div>
      
      <div v-else class="movies-grid">
        <MovieCard
          v-for="movie in favoriteMovies"
          :key="movie._id"
          :movie="movie"
          @play="playMovie"
          @toggle-favoris="toggleFavoris"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import MovieCard from '../../components/MovieCard.vue';

export default {
  name: 'MyList',
  components: {
    Navbar,
    MovieCard
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters['movies/favoriteMovies'];
    },
    loading() {
      return this.$store.state.movies.loading;
    }
  },
  methods: {
    playMovie(movieId) {
      this.$router.push(`/watch/${movieId}`);
    },
    toggleFavoris(movieId) {
      this.$store.dispatch('movies/toggleFavoris', movieId);
    }
  },
  created() {
    // Charger les films favoris
    this.$store.dispatch('auth/checkAuth');
    this.$store.dispatch('movies/fetchFavoris');
  }
};
</script>

<style scoped>
.my-list-page {
  min-height: 100vh;
  padding-top: 100px;
}

.page-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-state h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>

