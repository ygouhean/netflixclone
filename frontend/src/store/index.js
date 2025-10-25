import { createStore } from 'vuex';
import auth from './modules/auth';
import movies from './modules/movies';
import admin from './modules/admin';
import { config } from '../config/production.js';

export default createStore({
  state: {
    config
  },
  modules: {
    auth,
    movies,
    admin
  }
});

