<template>
  <div class="admin-movies">
    <AdminNav />
    
    <div class="movies-content container">
      <div class="header">
        <h1>Gestion des films et séries</h1>
        <button @click="openAddModal" class="btn btn-primary">+ Ajouter un contenu</button>
      </div>
      
      <div class="filters">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un titre..."
          class="search-input"
        />
        <select v-model="filterGenre" class="filter-select">
          <option value="">Tous les genres</option>
          <option value="Action">Action</option>
          <option value="Comédie">Comédie</option>
          <option value="Drame">Drame</option>
          <option value="Science-Fiction">Science-Fiction</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
        </select>
      </div>
      
      <div class="movies-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Genre</th>
              <th>Année</th>
              <th>Note</th>
              <th>Vues</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in filteredMovies" :key="movie._id">
              <td>
                <img :src="movie.imageUrl" :alt="movie.titre" class="movie-thumb" />
              </td>
              <td>{{ movie.titre }}</td>
              <td>{{ movie.genre.join(', ') }}</td>
              <td>{{ movie.anneeSortie }}</td>
              <td>{{ movie.note }}/10</td>
              <td>{{ movie.nombreVues }}</td>
              <td class="actions">
                <button @click="openEditModal(movie)" class="btn-icon">✏️</button>
                <button @click="deleteMovie(movie._id)" class="btn-icon">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Modal Ajout/Édition -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editingMovie ? 'Modifier' : 'Ajouter' }} un contenu</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveMovie">
            <div class="form-row">
              <div class="form-group">
                <label>Titre *</label>
                <input type="text" v-model="movieForm.titre" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Année *</label>
                <input type="number" v-model="movieForm.anneeSortie" class="form-control" required />
              </div>
            </div>
            
            <div class="form-group">
              <label>Description *</label>
              <textarea v-model="movieForm.description" class="form-control" rows="3" required></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Durée (min) *</label>
                <input type="number" v-model="movieForm.duree" class="form-control" required />
              </div>
              
              <div class="form-group">
                <label>Note</label>
                <input type="number" v-model="movieForm.note" class="form-control" min="0" max="10" step="0.1" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Genres *</label>
              <input type="text" v-model="genresInput" class="form-control" placeholder="Action, Drame, ..." />
              <small>Séparez les genres par des virgules</small>
            </div>
            
            <div class="form-group">
              <label>Catégorie *</label>
              <select v-model="movieForm.categorie" class="form-control" required>
                <option value="film">Film</option>
                <option value="serie">Série</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>URL de l'image *</label>
              <input type="url" v-model="movieForm.imageUrl" class="form-control" required />
            </div>
            
            <div class="form-group">
              <label>URL de la bannière</label>
              <input type="url" v-model="movieForm.banniereUrl" class="form-control" />
            </div>
            
            <div class="form-group">
              <label>URL de la vidéo *</label>
              <input type="url" v-model="movieForm.videoUrl" class="form-control" required />
            </div>
            
            <div class="form-group">
              <label>URL de la bande-annonce</label>
              <input type="url" v-model="movieForm.trailerUrl" class="form-control" />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Réalisateur</label>
                <input type="text" v-model="movieForm.realisateur" class="form-control" />
              </div>
              
              <div class="form-group">
                <label>Langue</label>
                <input type="text" v-model="movieForm.langue" class="form-control" />
              </div>
            </div>
            
            <div class="form-checkboxes">
              <label>
                <input type="checkbox" v-model="movieForm.tendance" />
                Tendance
              </label>
              <label>
                <input type="checkbox" v-model="movieForm.nouveaute" />
                Nouveauté
              </label>
            </div>
            
            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn btn-secondary">Annuler</button>
              <button type="submit" class="btn btn-primary">{{ editingMovie ? 'Mettre à jour' : 'Ajouter' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  name: 'AdminMovies',
  components: {
    AdminNav
  },
  data() {
    return {
      searchQuery: '',
      filterGenre: '',
      showModal: false,
      editingMovie: null,
      movieForm: this.getEmptyForm(),
      genresInput: ''
    };
  },
  computed: {
    movies() {
      return this.$store.state.admin.movies;
    },
    filteredMovies() {
      let filtered = this.movies;
      
      if (this.searchQuery) {
        filtered = filtered.filter(m =>
          m.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      if (this.filterGenre) {
        filtered = filtered.filter(m => m.genre.includes(this.filterGenre));
      }
      
      return filtered;
    }
  },
  methods: {
    getEmptyForm() {
      return {
        titre: '',
        description: '',
        duree: 90,
        anneeSortie: new Date().getFullYear(),
        genre: [],
        categorie: 'film',
        imageUrl: '',
        banniereUrl: '',
        videoUrl: '',
        trailerUrl: '',
        note: 7.0,
        realisateur: '',
        langue: 'Français',
        tendance: false,
        nouveaute: false
      };
    },
    
    openAddModal() {
      this.editingMovie = null;
      this.movieForm = this.getEmptyForm();
      this.genresInput = '';
      this.showModal = true;
    },
    
    openEditModal(movie) {
      this.editingMovie = movie;
      this.movieForm = { ...movie };
      this.genresInput = movie.genre.join(', ');
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
      this.editingMovie = null;
    },
    
    async saveMovie() {
      try {
        // Convertir les genres
        this.movieForm.genre = this.genresInput.split(',').map(g => g.trim());
        
        if (this.editingMovie) {
          await this.$store.dispatch('admin/updateMovie', {
            id: this.editingMovie._id,
            data: this.movieForm
          });
        } else {
          await this.$store.dispatch('admin/createMovie', this.movieForm);
        }
        
        this.closeModal();
      } catch (error) {
        alert('Erreur lors de la sauvegarde');
      }
    },
    
    async deleteMovie(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
        try {
          await this.$store.dispatch('admin/deleteMovie', id);
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }
    }
  },
  created() {
    this.$store.dispatch('admin/fetchMovies');
  }
};
</script>

<style scoped>
.admin-movies {
  min-height: 100vh;
  padding-top: 80px;
}

.movies-content {
  padding: 2rem 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 900;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input,
.filter-select {
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2f2f2f;
  color: white;
  font-size: 1rem;
}

.search-input {
  flex: 1;
}

.filter-select {
  min-width: 200px;
}

.movies-table {
  background-color: #2f2f2f;
  border-radius: 8px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #1f1f1f;
  padding: 1rem;
  text-align: left;
  font-weight: 700;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #444;
}

.movie-thumb {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.2);
}

.modal {
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.btn-close {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-checkboxes {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
}

.form-checkboxes label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
</style>

