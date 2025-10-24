<template>
  <div class="watch-page">
    <div class="video-player">
      <div class="player-header">
        <button @click="goBack" class="btn-back">← Retour</button>
        <h2 v-if="movie">{{ movie.titre }}</h2>
      </div>
      
      <div class="video-container">
        <!-- Si c'est un lien YouTube -->
        <iframe
          v-if="movie && isYouTubeUrl(movie.videoUrl)"
          :src="getYouTubeEmbedUrl(movie.videoUrl)"
          frameborder="0"
          allowfullscreen
          class="youtube-player"
        ></iframe>
        
        <!-- Si c'est une vidéo directe -->
        <video
          v-else-if="movie"
          :src="movie.videoUrl"
          controls
          autoplay
          @timeupdate="updateProgress"
          @ended="onVideoEnded"
          ref="videoPlayer"
        >
          Votre navigateur ne supporte pas la lecture de vidéo.
        </video>
        
        <div v-else class="loading">
          <div class="spinner"></div>
        </div>
      </div>
      
      <div v-if="movie" class="video-info">
        <div class="container">
          <div class="info-grid">
            <div class="info-main">
              <h3>{{ movie.titre }}</h3>
              <div class="meta">
                <span class="year">{{ movie.anneeSortie }}</span>
                <span class="duration">{{ formatDuration(movie.duree) }}</span>
                <span class="rating">{{ movie.note }}/10</span>
              </div>
              <p class="description">{{ movie.description }}</p>
            </div>
            
            <div class="info-side">
              <p><strong>Réalisateur :</strong> {{ movie.realisateur }}</p>
              <p><strong>Genre :</strong> {{ movie.genre.join(', ') }}</p>
              <p><strong>Casting :</strong> {{ getCasting() }}</p>
              <p><strong>Langue :</strong> {{ movie.langue }}</p>
            </div>
          </div>
          
          <div class="actions">
            <button @click="toggleFavoris" class="btn btn-secondary">
              {{ isFavorite ? '✓ Dans ma liste' : '+ Ma liste' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watch',
  data() {
    return {
      movie: null,
      progressInterval: null,
      isFavorite: false
    };
  },
  methods: {
    async loadMovie() {
      try {
        const movieId = this.$route.params.id;
        this.movie = await this.$store.dispatch('movies/fetchMovie', movieId);
        
        // Incrémenter les vues
        await this.$store.dispatch('movies/incrementViews', movieId);
        
        // Vérifier si dans les favoris
        const user = this.$store.state.auth.user;
        this.isFavorite = user?.favoris?.includes(movieId);
      } catch (error) {
        console.error('Erreur chargement film:', error);
        this.$router.push('/browse');
      }
    },
    
    goBack() {
      this.$router.push('/browse');
    },
    
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
    },
    
    getCasting() {
      return this.movie.casting?.slice(0, 3).map(c => c.nom).join(', ') || 'Non disponible';
    },
    
    updateProgress(event) {
      const video = event.target;
      const progression = (video.currentTime / video.duration) * 100;
      
      // Sauvegarder la progression toutes les 10 secondes
      if (Math.floor(video.currentTime) % 10 === 0) {
        this.$store.dispatch('movies/updateHistorique', {
          filmId: this.movie._id,
          progression
        });
      }
    },
    
    onVideoEnded() {
      this.$store.dispatch('movies/updateHistorique', {
        filmId: this.movie._id,
        progression: 100
      });
    },
    
    toggleFavoris() {
      this.$store.dispatch('movies/toggleFavoris', this.movie._id);
      this.isFavorite = !this.isFavorite;
    },
    
    isYouTubeUrl(url) {
      return url && (url.includes('youtube.com') || url.includes('youtu.be'));
    },
    
    getYouTubeEmbedUrl(url) {
      if (!url) return '';
      
      let videoId = '';
      
      // Gérer les différents formats YouTube
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      }
      
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  },
  mounted() {
    this.loadMovie();
  },
  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
};
</script>

<style scoped>
.watch-page {
  background-color: #000;
  min-height: 100vh;
}

.video-player {
  width: 100%;
}

.player-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 4%;
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%);
  z-index: 10;
}

.btn-back {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-back:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.video-container {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.youtube-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info {
  background-color: #141414;
  padding: 3rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.info-main h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #46d369;
}

.meta span {
  padding: 0.25rem 0.5rem;
  border: 1px solid #46d369;
  border-radius: 4px;
  font-size: 0.9rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
}

.info-side p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #ccc;
}

.info-side strong {
  color: #fff;
}

.actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .video-container {
    height: 50vh;
  }
}
</style>

