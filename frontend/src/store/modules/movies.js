import axios from 'axios';
import { config } from '../../config/production.js';

// Configuration robuste avec fallback
const getAPIUrl = () => {
  try {
    return `${config.API_URL}/api`;
  } catch (error) {
    console.warn('⚠️ Erreur de configuration, utilisation du fallback');
    return 'https://netflixclonebackend-ryt0.onrender.com/api';
  }
};

const API_URL = getAPIUrl();

const state = {
  movies: [],
  currentMovie: null,
  favoris: [],
  historique: [],
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null
};

const getters = {
  allMovies: state => state.movies,
  moviesByGenre: state => genre => state.movies.filter(m => m.genre.includes(genre)),
  trendingMovies: state => state.movies.filter(m => m.tendance),
  newMovies: state => state.movies.filter(m => m.nouveaute),
  favoriteMovies: state => state.favoris,
  watchHistory: state => state.historique,
  searchResults: state => state.searchResults,
  searchQuery: state => state.searchQuery
};

const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },
  SET_CURRENT_MOVIE(state, movie) {
    state.currentMovie = movie;
  },
  SET_FAVORIS(state, favoris) {
    state.favoris = favoris;
  },
  SET_HISTORIQUE(state, historique) {
    state.historique = historique;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  CLEAR_SEARCH(state) {
    state.searchResults = [];
    state.searchQuery = '';
  }
};

const actions = {
  async fetchMovies({ commit }, filters = {}) {
    try {
      commit('SET_LOADING', true);
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_URL}/movies?${params}`);
      commit('SET_MOVIES', response.data.movies);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchMovie({ commit }, id) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${API_URL}/movies/${id}`);
      commit('SET_CURRENT_MOVIE', response.data.movie);
      return response.data.movie;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur lors du chargement');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async toggleFavoris({ commit, state, rootState }, movieId) {
    try {
      const response = await axios.put(`${API_URL}/users/favoris/${movieId}`);
      commit('SET_FAVORIS', response.data.favoris);
      
      // Mettre à jour aussi l'utilisateur dans le store auth
      const user = rootState.auth.user;
      if (user) {
        user.favoris = response.data.favoris;
        commit('auth/SET_USER', user, { root: true });
      }
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur');
      throw error;
    }
  },

  async updateHistorique({ commit }, { filmId, progression }) {
    try {
      const response = await axios.post(`${API_URL}/users/historique`, {
        filmId,
        progression
      });
      commit('SET_HISTORIQUE', response.data.historique);
    } catch (error) {
      console.error('Erreur mise à jour historique:', error);
    }
  },

  async incrementViews({ commit }, movieId) {
    try {
      const response = await axios.post(`${API_URL}/movies/${movieId}/view`);
      // Mettre à jour le film dans la liste si nécessaire
      return response.data;
    } catch (error) {
      console.error('Erreur incrémentation vues:', error);
    }
  },

  async fetchFavoris({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/users/favoris`);
      commit('SET_FAVORIS', response.data.favoris);
      return response.data.favoris;
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
    }
  },

  async searchMovies({ commit }, query) {
    try {
      commit('SET_SEARCH_QUERY', query);
      commit('SET_LOADING', true);
      
      const response = await axios.get(`${API_URL}/movies?search=${encodeURIComponent(query)}`);
      commit('SET_SEARCH_RESULTS', response.data.movies);
      
      return response.data.movies;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la recherche');
      commit('SET_SEARCH_RESULTS', []);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  clearSearch({ commit }) {
    commit('CLEAR_SEARCH');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

