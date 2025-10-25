import axios from 'axios';
import { config } from '../../config/production.js';

const API_URL = `${config.API_URL}/api`;

const state = {
  users: [],
  movies: [],
  stats: null,
  loading: false,
  error: null
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },
  SET_STATS(state, stats) {
    state.stats = stats;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${API_URL}/users`);
      commit('SET_USERS', response.data.users);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteUser({ dispatch }, userId) {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      dispatch('fetchUsers');
    } catch (error) {
      throw error;
    }
  },

  async createMovie({ dispatch }, movieData) {
    try {
      await axios.post(`${API_URL}/movies`, movieData);
      dispatch('fetchMovies');
    } catch (error) {
      throw error;
    }
  },

  async updateMovie({ dispatch }, { id, data }) {
    try {
      await axios.put(`${API_URL}/movies/${id}`, data);
      dispatch('fetchMovies');
    } catch (error) {
      throw error;
    }
  },

  async deleteMovie({ dispatch }, movieId) {
    try {
      await axios.delete(`${API_URL}/movies/${movieId}`);
      dispatch('fetchMovies');
    } catch (error) {
      throw error;
    }
  },

  async fetchMovies({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      commit('SET_MOVIES', response.data.movies);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur');
    }
  },

  async fetchStats({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/subscriptions/stats`);
      commit('SET_STATS', response.data.stats);
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur');
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

