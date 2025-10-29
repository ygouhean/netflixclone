<template>
  <div class="search-results-page">
    <Navbar />

    <div class="container">
      <!-- En-tête de recherche -->
      <div class="search-header">
        <h1 class="search-title">
          Résultats pour "{{ searchQuery }}"
        </h1>
        <p class="search-count">
          {{ searchResults.length }} film(s) trouvé(s)
        </p>
      </div>

      <!-- Filtres -->
      <div class="search-filters">
        <div class="filter-group">
          <label>Trier par :</label>
          <select v-model="sortBy" @change="sortResults">
            <option value="relevance">Pertinence</option>
            <option value="title">Titre A-Z</option>
            <option value="year">Année</option>
            <option value="rating">Note</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Genre :</label>
          <select v-model="selectedGenre" @change="filterByGenre">
            <option value="">Tous les genres</option>
            <option v-for="genre in availableGenres" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </div>
      </div>

      <!-- Résultats -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Recherche en cours...</p>
      </div>

      <div v-else-if="filteredResults.length > 0" class="search-results">
        <div class="results-grid">
          <MovieCard
            v-for="movie in paginatedResults"
            :key="movie._id"
            :movie="movie"
            @play="playMovie"
            @toggle-favoris="toggleFavoris"
            @info="showMovieInfo"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            ← Précédent
          </button>
          
          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="{ active: page === currentPage }"
              class="page-btn"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Suivant →
          </button>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-else class="no-results">
        <div class="no-results-content">
          <h2>Aucun film trouvé</h2>
          <p>Essayez de modifier vos critères de recherche :</p>
          <ul>
            <li>Vérifiez l'orthographe</li>
            <li>Utilisez des mots-clés plus généraux</li>
            <li>Essayez des synonymes</li>
          </ul>
          <router-link to="/browse" class="btn btn-primary">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import MovieCard from '../../components/MovieCard.vue';

export default {
  name: 'SearchResults',
  components: {
    Navbar,
    MovieCard
  },
  data() {
    return {
      sortBy: 'relevance',
      selectedGenre: '',
      currentPage: 1,
      itemsPerPage: 12
    };
  },
  computed: {
    searchQuery() {
      return this.$route.query.q || '';
    },
    searchResults() {
      return this.$store.state.movies.searchResults;
    },
    loading() {
      return this.$store.state.movies.loading;
    },
    availableGenres() {
      const genres = new Set();
      this.searchResults.forEach(movie => {
        movie.genre.forEach(genre => genres.add(genre));
      });
      return Array.from(genres).sort();
    },
    filteredResults() {
      let results = [...this.searchResults];
      
      // Filtrer par genre
      if (this.selectedGenre) {
        results = results.filter(movie => 
          movie.genre.includes(this.selectedGenre)
        );
      }
      
      return results;
    },
    sortedResults() {
      const results = [...this.filteredResults];
      
      switch (this.sortBy) {
        case 'title':
          return results.sort((a, b) => a.titre.localeCompare(b.titre));
        case 'year':
          return results.sort((a, b) => 
            new Date(b.dateSortie) - new Date(a.dateSortie)
          );
        case 'rating':
          return results.sort((a, b) => (b.note || 0) - (a.note || 0));
        default:
          return results; // Pertinence (ordre original)
      }
    },
    paginatedResults() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedResults.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedResults.length / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  methods: {
    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.$router.push('/browse');
        return;
      }
      
      try {
        await this.$store.dispatch('movies/searchMovies', this.searchQuery);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      }
    },
    sortResults() {
      this.currentPage = 1; // Reset à la première page
    },
    filterByGenre() {
      this.currentPage = 1; // Reset à la première page
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
      this.$router.push(`/watch/${movieId}`);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  async created() {
    await this.performSearch();
  },
  watch: {
    '$route.query.q'() {
      this.performSearch();
    }
  }
};
</script>

<style scoped>
.search-results-page {
  padding-top: 70px;
  min-height: 100vh;
  background-color: var(--netflix-black);
}

.search-header {
  padding: 2rem 0 1rem;
  border-bottom: 1px solid #333;
  margin-bottom: 2rem;
}

.search-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.search-count {
  color: #999;
  font-size: 1rem;
}

.search-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 600;
}

.filter-group select {
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--netflix-red);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: white;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--netflix-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.page-btn.active {
  background-color: var(--netflix-red);
  border-color: var(--netflix-red);
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-results-content {
  text-align: center;
  color: white;
  max-width: 500px;
}

.no-results-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.no-results-content p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.no-results-content ul {
  text-align: left;
  margin-bottom: 2rem;
  color: #999;
}

.no-results-content li {
  margin-bottom: 0.5rem;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--netflix-red);
  color: white;
}

.btn-primary:hover {
  background-color: #e50914;
}

@media (max-width: 768px) {
  .search-filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .page-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 1rem;
  }
}
</style>
