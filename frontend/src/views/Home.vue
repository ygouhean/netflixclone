<template>
  <div class="netflix-home">
    <!-- Header -->
    <header class="netflix-header">
      <div class="header-container">
        <div class="netflix-logo">
          <router-link to="/">NETFLIX</router-link>
        </div>
        <div class="header-actions">
          <router-link to="/login" class="signin-btn">S'identifier</router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Films et séries en illimité, et bien plus</h1>
        <h2 class="hero-subtitle">À partir de 7,99 €. Annulable à tout moment.</h2>
        <p class="hero-description">
          Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.
        </p>
        <div class="email-signup">
          <div class="email-input-container">
            <input type="email" placeholder="Adresse e-mail" class="email-input" v-model="email">
            <router-link to="/register" class="get-started-btn">
          Commencer
        </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Netflix with Ads Section -->
    <section class="netflix-ads-section">
      <div class="container">
        <div class="ads-content">
          <h2>Le Netflix que vous aimez pour juste 7,99 €.</h2>
          <p>Profitez de notre offre avec pub, la plus économique.</p>
          <a href="#" class="learn-more-link">En savoir plus</a>
        </div>
      </div>
    </section>

    <!-- Trending Section -->
    <section class="trending-section">
      <div class="container">
        <h2 class="trending-title">Tendances actuelles</h2>
        <div class="trending-movies-grid">
          <div class="trending-movie-card" v-for="(movie, index) in trendingMovies" :key="movie._id" @click="showMovieDetails(movie)">
            <div class="trending-rank">{{ index + 1 }}</div>
            <div class="movie-poster">
              <img :src="movie.imageUrl" :alt="movie.titre" class="poster-image">
              <div class="movie-overlay">
                <div class="play-icon">▶</div>
              </div>
            </div>
            <div class="movie-info">
              <h3 class="movie-title">{{ movie.titre }}</h3>
              <div class="movie-stats">
                <span class="movie-year">{{ new Date(movie.annee).getFullYear() }}</span>
                <span class="movie-rating">{{ movie.note }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">Encore plus de raisons de vous abonner</h2>
        
        <div class="feature-item">
          <div class="feature-content">
            <h3>Regardez Netflix sur votre TV</h3>
            <p>Regardez Netflix sur votre Smart TV, PlayStation, Xbox, Chromecast, Apple TV, lecteur Blu-ray et bien plus.</p>
          </div>
          <div class="feature-image">
            <div class="tv-icon">📺</div>
          </div>
        </div>

        <div class="feature-item reverse">
          <div class="feature-content">
            <h3>Téléchargez vos séries pour les regarder hors connexion</h3>
            <p>Enregistrez vos programmes préférés et ayez toujours quelque chose à regarder.</p>
          </div>
          <div class="feature-image">
            <div class="mobile-icon">📱</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-content">
            <h3>Où que vous soyez</h3>
            <p>Regardez des films et séries en accès illimité sur votre TV, smartphone, tablette et ordinateur.</p>
          </div>
          <div class="feature-image">
            <div class="devices-icon">💻</div>
          </div>
        </div>

        <div class="feature-item reverse">
          <div class="feature-content">
            <h3>Créez des profils pour les enfants</h3>
            <p>Les enfants découvrent de nouvelles aventures et retrouvent leurs personnages préférés dans un espace bien à eux, déjà inclus dans votre abonnement.</p>
          </div>
          <div class="feature-image">
            <div class="kids-icon">👶</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="faq-title">Foire aux questions</h2>
        <div class="faq-container">
          <div class="faq-item" v-for="(item, index) in faqItems" :key="index">
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ item.question }}</span>
              <span class="faq-icon">{{ openFaq === index ? '×' : '+' }}</span>
            </button>
            <div class="faq-answer" v-show="openFaq === index">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section">
      <div class="container">
        <div class="cta-content">
          <p class="cta-text">Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</p>
          <div class="email-signup">
            <div class="email-input-container">
              <input type="email" placeholder="Adresse e-mail" class="email-input" v-model="email">
              <router-link to="/register" class="get-started-btn">
                Commencer
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="netflix-footer">
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">Des questions ? Appelez le 1-866-952-4456</p>
          <div class="footer-links">
            <a href="#">FAQ</a>
            <a href="#">Centre d'aide</a>
            <a href="#">Compte</a>
            <a href="#">Presse</a>
            <a href="#">Relations Investisseurs</a>
            <a href="#">Recrutement</a>
            <a href="#">Modes de lecture</a>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Confidentialité</a>
            <a href="#">Préférences de cookies</a>
            <a href="#">Mentions légales</a>
            <a href="#">Nous contacter</a>
            <a href="#">Test de vitesse</a>
            <a href="#">Informations légales</a>
            <a href="#">Seulement sur Netflix</a>
          </div>
          <div class="language-selector">
            <select class="language-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
          <p class="footer-copyright">Netflix Côte d'Ivoire</p>
        </div>
      </div>
    </footer>

    <!-- Movie Details Modal -->
    <div class="movie-modal" v-if="selectedMovie" @click="closeMovieDetails">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeMovieDetails">×</button>
        <div class="modal-body">
          <div class="modal-poster">
            <img :src="selectedMovie.imageUrl" :alt="selectedMovie.titre" class="modal-image">
          </div>
          <div class="modal-info">
            <h2 class="modal-title">{{ selectedMovie.titre }}</h2>
            <div class="modal-meta">
              <span class="modal-year">{{ new Date(selectedMovie.annee).getFullYear() }}</span>
              <span class="modal-rating">{{ selectedMovie.note }}/10</span>
              <span class="modal-duration">{{ selectedMovie.duree }} min</span>
            </div>
            <p class="modal-description">{{ selectedMovie.description }}</p>
            <div class="modal-genres">
              <span class="genre-tag" v-for="genre in selectedMovie.genres" :key="genre">{{ genre }}</span>
            </div>
            <div class="modal-actions">
              <router-link :to="`/watch/${selectedMovie._id}`" class="watch-btn">
                ▶ Regarder maintenant
              </router-link>
              <button class="favorite-btn" @click="toggleFavorite(selectedMovie._id)">
                {{ isFavorite(selectedMovie._id) ? '❤️' : '🤍' }} Favoris
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      openFaq: null,
      selectedMovie: null,
      trendingMovies: [],
      faqItems: [
        {
          question: 'Netflix, qu\'est-ce que c\'est ?',
          answer: 'Netflix est un service de streaming qui propose une vaste sélection de séries, films, animes, documentaires et autres programmes sur des milliers d\'appareils connectés à Internet. Regardez tout ce que vous voulez, quand vous voulez, à un prix mensuel très attractif. Découvrez de nouveaux films et séries chaque semaine, il y en a pour tous les goûts !'
        },
        {
          question: 'Combien coûte Netflix ?',
          answer: 'Regardez Netflix sur votre smartphone, tablette, Smart TV, ordinateur ou appareil de streaming, le tout pour un tarif mensuel fixe. Les offres vont de 7,99 € à 24,99 € par mois. Pas de contrat ni de frais supplémentaires.'
        },
        {
          question: 'Où puis-je regarder Netflix ?',
          answer: 'Netflix, c\'est où vous voulez, quand vous voulez. Connectez-vous à votre compte pour regarder Netflix en ligne sur netflix.com depuis votre ordinateur ou tout appareil connecté à Internet avec l\'application Netflix, comme les Smart TV, smartphones, tablettes, lecteurs de streaming et consoles de jeu. Vous pouvez aussi télécharger vos séries préférées avec l\'application iOS ou Android.'
        },
        {
          question: 'Comment puis-je annuler mon offre ?',
          answer: 'Netflix offre une grande souplesse. Pas de contrat compliqué. Sans engagement. Deux clics suffisent pour annuler votre compte en ligne. Pas de frais d\'annulation : ouvrez ou fermez votre compte à tout moment.'
        },
        {
          question: 'Que puis-je regarder sur Netflix ?',
          answer: 'Netflix propose un vaste catalogue comprenant notamment des longs-métrages, des documentaires, des séries, des animes et des programmes originaux Netflix primés. Regardez Netflix à volonté, quand vous le voulez.'
        },
        {
          question: 'Est-ce que Netflix est adapté aux enfants ?',
          answer: 'Netflix Jeunesse est inclus dans votre abonnement et offre un meilleur contrôle aux parents, ainsi qu\'un espace dédié aux enfants, avec des films et des séries destinés à toute la famille. Les profils Jeunesse comportent des fonctionnalités de contrôle parental avec code PIN permettant de modifier la catégorie d\'âge des contenus que vos enfants peuvent regarder et de bloquer des titres spécifiques.'
        }
      ]
    };
  },
  computed: {
    userFavorites() {
      return this.$store.getters['auth/user']?.favoris || [];
    }
  },
  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },
     async loadTrendingMovies() {
       try {
         await this.$store.dispatch('movies/fetchMovies');
         // Récupérer les films les plus vus (tendances)
         const allMovies = this.$store.getters['movies/allMovies'];
         this.trendingMovies = allMovies
           .sort((a, b) => (b.nombreVues || 0) - (a.nombreVues || 0))
           .slice(0, 5);
       } catch (error) {
         console.error('Erreur chargement films tendances:', error);
       }
     },
    showMovieDetails(movie) {
      this.selectedMovie = movie;
    },
    closeMovieDetails() {
      this.selectedMovie = null;
    },
    isFavorite(movieId) {
      return this.userFavorites.includes(movieId);
    },
    async toggleFavorite(movieId) {
      try {
        await this.$store.dispatch('movies/toggleFavoris', movieId);
      } catch (error) {
        console.error('Erreur toggle favoris:', error);
      }
    }
  },
  async created() {
    await this.loadTrendingMovies();
  }
};
</script>

<style scoped>
/* Netflix Home Styles - Identique au site officiel */
.netflix-home {
  background-color: #000;
  color: #fff;
  font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* Header */
.netflix-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%);
  padding: 20px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.netflix-logo a {
  color: #e50914;
  font-size: 2rem;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: -1px;
}

.signin-btn {
  background-color: #e50914;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.signin-btn:hover {
  background-color: #f40612;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
              url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80');
  background-size: cover;
  background-position: center;
}

.hero-content {
  max-width: 950px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.email-signup {
  margin-top: 2rem;
}

.email-input-container {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 0;
}

.email-input {
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid #333;
  background-color: rgba(0,0,0,0.75);
  color: white;
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.email-input::placeholder {
  color: #999;
}

.email-input:focus {
  outline: none;
  border-color: #e50914;
}

.get-started-btn {
  background-color: #e50914;
  color: white;
  padding: 16px 24px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 4px 4px 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.get-started-btn:hover {
  background-color: #f40612;
}

/* Netflix Ads Section */
.netflix-ads-section {
  background-color: #000;
  padding: 60px 0;
  border-bottom: 8px solid #222;
}

.ads-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.ads-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.ads-content p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.learn-more-link {
  color: #0071eb;
  text-decoration: none;
  font-size: 1.1rem;
}

.learn-more-link:hover {
  text-decoration: underline;
}

/* Trending Section */
.trending-section {
  background-color: #000;
  padding: 60px 0;
  border-bottom: 8px solid #222;
}

.trending-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.trending-movies-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.trending-movie-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  background-color: #111;
}

.trending-movie-card:hover {
  transform: scale(1.05);
}

.trending-rank {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #e50914;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.movie-poster {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trending-movie-card:hover .poster-image {
  transform: scale(1.1);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trending-movie-card:hover .movie-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 3rem;
  color: white;
}

.movie-info {
  padding: 15px;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #ccc;
}

.movie-year {
  color: #999;
}

.movie-rating {
  color: #e50914;
  font-weight: 600;
}

/* Features Section */
.features-section {
  background-color: #000;
  padding: 60px 0;
  border-bottom: 8px solid #222;
}

.features-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
}

.feature-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  padding: 60px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item.reverse {
  direction: rtl;
}

.feature-item.reverse .feature-content {
  direction: ltr;
}

.feature-content h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.feature-content p {
  font-size: 1.2rem;
  color: #ccc;
  line-height: 1.6;
}

.feature-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tv-icon, .mobile-icon, .devices-icon, .kids-icon {
  font-size: 8rem;
  opacity: 0.8;
}

/* FAQ Section */
.faq-section {
  background-color: #000;
  padding: 60px 0;
  border-bottom: 8px solid #222;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.faq-item {
  margin-bottom: 8px;
}

.faq-question {
  width: 100%;
  background-color: #303030;
  border: none;
  color: white;
  padding: 20px 30px;
  font-size: 1.2rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background-color: #404040;
}

.faq-icon {
  font-size: 2rem;
  font-weight: 300;
}

.faq-answer {
  background-color: #303030;
  padding: 20px 30px;
  font-size: 1.2rem;
  line-height: 1.6;
  border-top: 1px solid #404040;
}

/* Final CTA Section */
.final-cta-section {
  background-color: #000;
  padding: 60px 0;
  border-bottom: 8px solid #222;
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.cta-text {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Footer */
.netflix-footer {
  background-color: #000;
  padding: 60px 0 20px;
  color: #757575;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-text {
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.footer-links a {
  color: #757575;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-links a:hover {
  text-decoration: underline;
}

.language-selector {
  margin-bottom: 20px;
}

.language-select {
  background-color: #000;
  color: #757575;
  border: 1px solid #333;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.footer-copyright {
  font-size: 0.9rem;
  color: #757575;
}

/* Movie Modal */
.movie-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background-color: #111;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-body {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  padding: 30px;
}

.modal-poster {
  position: relative;
}

.modal-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
}

.modal-info {
  color: white;
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
}

.modal-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.modal-year {
  color: #999;
}

.modal-rating {
  color: #e50914;
  font-weight: 600;
}

.modal-duration {
  color: #ccc;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #ccc;
}

.modal-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.genre-tag {
  background-color: #333;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 15px;
}

.watch-btn {
  background-color: #e50914;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.watch-btn:hover {
  background-color: #f40612;
}

.favorite-btn {
  background-color: transparent;
  color: white;
  border: 1px solid #333;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.favorite-btn:hover {
  background-color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .email-input-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .email-input {
    border-radius: 4px;
    border-right: 1px solid #333;
  }
  
  .get-started-btn {
    border-radius: 4px;
  }
  
  .feature-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
  
  .feature-content h3 {
    font-size: 1.8rem;
  }
  
  .feature-content p {
    font-size: 1rem;
  }
  
  .tv-icon, .mobile-icon, .devices-icon, .kids-icon {
    font-size: 4rem;
  }
  
  .trending-title,
  .features-title,
  .faq-title {
    font-size: 2rem;
  }
  
  .footer-links {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .trending-movies-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  .movie-poster {
    height: 200px;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .modal-image {
    height: 300px;
  }
  
  .modal-title {
    font-size: 2rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .netflix-logo a {
    font-size: 1.5rem;
  }
  
  .signin-btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
  
  .trending-movies-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>

