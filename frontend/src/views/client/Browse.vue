<template>
  <div class="browse-page">
    <Navbar />

    <!-- Hero Banner -->
    <div v-if="featuredMovie" class="hero-banner" :style="{ backgroundImage: `url(${featuredMovie.banniereUrl || featuredMovie.imageUrl})` }">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ featuredMovie.titre }}</h1>
          <p class="hero-description">{{ featuredMovie.description }}</p>
          <div class="hero-buttons">
            <button @click="playMovie(featuredMovie._id)" class="btn btn-primary">
              ▶ Lecture
            </button>
            <button @click="toggleFavoris(featuredMovie._id)" class="btn btn-secondary">
              ℹ Plus d'infos
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Catalogues -->
    <div class="catalogs container">
      <!-- Tendances -->
      <div class="catalog-section" v-if="trendingMovies.length">
        <h2 class="catalog-title">Tendances actuelles</h2>
        <div class="movies-row">
          <MovieCard
            v-for="movie in trendingMovies"
            :key="movie._id"
            :movie="movie"
            @play="playMovie"
            @toggle-favoris="toggleFavoris"
            @info="showMovieInfo"
          />
        </div>
      </div>

      <!-- Nouveautés -->
      <div class="catalog-section" v-if="newMovies.length">
        <h2 class="catalog-title">Nouveautés</h2>
        <div class="movies-row">
          <MovieCard
            v-for="movie in newMovies"
            :key="movie._id"
            :movie="movie"
            @play="playMovie"
            @toggle-favoris="toggleFavoris"
            @info="showMovieInfo"
          />
        </div>
      </div>

      <!-- Par genre -->
      <div class="catalog-section" v-for="genre in genres" :key="genre">
        <h2 class="catalog-title">{{ genre }}</h2>
        <div class="movies-row">
          <MovieCard
            v-for="movie in getMoviesByGenre(genre)"
            :key="movie._id"
            :movie="movie"
            @play="playMovie"
            @toggle-favoris="toggleFavoris"
            @info="showMovieInfo"
          />
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import MovieCard from '../../components/MovieCard.vue';

export default {
  name: 'Browse',
  components: {
    Navbar,
    MovieCard
  },
  data() {
    return {
      genres: ['Action', 'Comédie', 'Drame', 'Science-Fiction', 'Thriller', 'Romance']
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    featuredMovie() {
      return this.trendingMovies[0] || this.movies[0];
    },
    trendingMovies() {
      return this.$store.getters['movies/trendingMovies'];
    },
    newMovies() {
      return this.$store.getters['movies/newMovies'];
    },
    loading() {
      return this.$store.state.movies.loading;
    }
  },
  methods: {
    getMoviesByGenre(genre) {
      return this.$store.getters['movies/moviesByGenre'](genre).slice(0, 10);
    },
    playMovie(movieId) {
      if (this.$store.getters['auth/hasActiveSubscription']) {
        this.$router.push(`/watch/${movieId}`);
      } else {
        this.$router.push('/subscribe');
      }
    },
    toggleFavoris(movieId) {
      this.$store.dispatch('movies/toggleFavoris', movieId);
    },
    showMovieInfo(movieId) {
      // Pour l'instant, rediriger vers la page de lecture
      // Plus tard, on pourra créer une modal avec les infos
      this.$router.push(`/watch/${movieId}`);
    }
  },
  created() {
    this.$store.dispatch('movies/fetchMovies');
    // Rafraîchir les données utilisateur pour s'assurer que l'abonnement est à jour
    this.$store.dispatch('auth/checkAuth');
  }
};
</script>

<style scoped>
.browse-page {
  padding-top: 70px;
}

.hero-banner {
  height: 80vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(20, 20, 20, 0.5) 50%, #141414 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.catalogs {
  padding: 2rem 0;
  margin-top: -150px;
  position: relative;
  z-index: 3;
}

.catalog-section {
  margin-bottom: 3rem;
}

.catalog-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.movies-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .movies-row {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>

