import { createStore } from 'vuex';
import auth from './modules/auth';
import movies from './modules/movies';
import admin from './modules/admin';

export default createStore({
  modules: {
    auth,
    movies,
    admin
  }
});

