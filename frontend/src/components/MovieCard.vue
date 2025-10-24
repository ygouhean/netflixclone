<template>
  <div class="movie-card">
    <img :src="movie.imageUrl" :alt="movie.titre" />
    <div class="movie-card-overlay">
      <h3>{{ movie.titre }}</h3>
      <div class="movie-meta">
        <span class="rating">⭐ {{ movie.note }}</span>
        <span>{{ movie.anneeSortie }}</span>
      </div>
      <div class="movie-actions">
        <button @click="$emit('play', movie._id)" class="btn-play">▶</button>
        <button @click="$emit('toggle-favoris', movie._id)" class="btn-favorite">
          {{ isFavorite ? '✓' : '+' }}
        </button>
        <button @click="$emit('info', movie._id)" class="btn-info">ℹ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFavorite() {
      const user = this.$store.state.auth.user;
      return user?.favoris?.includes(this.movie._id);
    }
  }
};
</script>

<style scoped>
.movie-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  aspect-ratio: 2/3;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.95));
  padding: 1.5rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-card-overlay {
  transform: translateY(0);
}

.movie-card-overlay h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #ccc;
}

.rating {
  color: #ffd700;
}

.movie-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-play,
.btn-favorite,
.btn-info {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.btn-play:hover {
  background-color: white;
  color: #000;
  border-color: white;
}

.btn-favorite:hover {
  background-color: var(--netflix-red);
  border-color: var(--netflix-red);
}

.btn-info:hover {
  background-color: #46d369;
  border-color: #46d369;
}
</style>

