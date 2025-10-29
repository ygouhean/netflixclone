<template>
  <div class="search-container">
    <div class="search-input-wrapper" :class="{ focused: isFocused, 'has-results': searchResults.length > 0 }">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher des films..."
        class="search-input"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleSearch"
        @keydown.enter="performSearch"
        @keydown.escape="clearSearch"
      />
      <div class="search-icon">
        <svg v-if="!isSearching" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <div v-else class="search-spinner"></div>
      </div>
      <button v-if="searchQuery" @click="clearSearch" class="clear-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Résultats de recherche en temps réel -->
    <div v-if="showResults && searchResults.length > 0" class="search-results">
      <div class="search-results-header">
        <span class="results-count">{{ searchResults.length }} résultat(s)</span>
        <button @click="viewAllResults" class="view-all-btn">Voir tout</button>
      </div>
      <div class="results-list">
        <div
          v-for="movie in searchResults.slice(0, 5)"
          :key="movie._id"
          class="result-item"
          @click="selectMovie(movie)"
        >
          <img :src="movie.imageUrl" :alt="movie.titre" class="result-image" />
          <div class="result-info">
            <h4 class="result-title">{{ movie.titre }}</h4>
            <p class="result-year">{{ new Date(movie.dateSortie).getFullYear() }}</p>
            <p class="result-genre">{{ movie.genre.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message quand aucun résultat -->
    <div v-if="showResults && searchQuery && searchResults.length === 0 && !isSearching" class="no-results">
      <p>Aucun film trouvé pour "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      isFocused: false,
      isSearching: false,
      searchTimeout: null,
      searchResults: []
    };
  },
  computed: {
    showResults() {
      return this.isFocused && this.searchQuery.length > 0;
    }
  },
  methods: {
    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      // Délai pour permettre les clics sur les résultats
      setTimeout(() => {
        this.isFocused = false;
      }, 200);
    },
    handleSearch() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      if (this.searchQuery.length < 2) {
        this.searchResults = [];
        return;
      }

      this.isSearching = true;
      this.searchTimeout = setTimeout(() => {
        this.performSearch();
      }, 300);
    },
    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        this.isSearching = false;
        return;
      }

      try {
        const results = await this.$store.dispatch('movies/searchMovies', this.searchQuery);
        this.searchResults = results;
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        this.searchResults = [];
      } finally {
        this.isSearching = false;
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.isSearching = false;
      this.$refs.searchInput.focus();
    },
    selectMovie(movie) {
      this.$emit('movie-selected', movie);
      this.clearSearch();
    },
    viewAllResults() {
      this.$router.push({
        name: 'SearchResults',
        query: { q: this.searchQuery }
      });
      this.clearSearch();
    }
  },
  beforeUnmount() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-input-wrapper.focused {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.search-input-wrapper.has-results {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-icon {
  padding: 0 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
}

.search-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.clear-button {
  padding: 0.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.clear-button:hover {
  color: white;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.95);
  border: 1px solid #333;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

.search-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #333;
}

.results-count {
  font-size: 0.85rem;
  color: #999;
}

.view-all-btn {
  background: none;
  border: none;
  color: var(--netflix-red);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.view-all-btn:hover {
  color: #ff6b6b;
}

.results-list {
  padding: 0.5rem 0;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.result-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.result-image {
  width: 40px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 0.75rem;
}

.result-info {
  flex: 1;
}

.result-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.result-year {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.result-genre {
  font-size: 0.75rem;
  color: #666;
}

.no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.95);
  border: 1px solid #333;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 1rem;
  text-align: center;
  color: #999;
}

@media (max-width: 768px) {
  .search-container {
    max-width: 100%;
  }
  
  .search-input {
    font-size: 16px; /* Évite le zoom sur iOS */
  }
}
</style>
