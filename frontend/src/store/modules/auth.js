import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const getters = {
  isAuthenticated: state => !!state.token,
  isAdmin: state => state.user?.role === 'admin',
  hasActiveSubscription: state => state.user?.abonnement?.statut === 'actif',
  currentUser: state => state.user
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

const actions = {
  async register({ commit }, userData) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      commit('SET_TOKEN', response.data.token);
      commit('SET_USER', response.data.user);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de l\'inscription');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async login({ commit }, credentials) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      commit('SET_TOKEN', response.data.token);
      commit('SET_USER', response.data.user);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Erreur lors de la connexion');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async checkAuth({ commit, state }) {
    try {
      if (state.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        const response = await axios.get(`${API_URL}/auth/me`);
        commit('SET_USER', response.data.user);
      }
    } catch (error) {
      commit('LOGOUT');
    }
  },

  logout({ commit }) {
    commit('LOGOUT');
  },

  async forceActivateSubscription({ commit, state }, { plan = 'standard' } = {}) {
    try {
      const response = await axios.post(`${API_URL}/auth/force-activate-subscription`, { plan });
      return response.data;
    } catch (error) {
      console.error('Erreur forceActivateSubscription:', error);
      throw error;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

