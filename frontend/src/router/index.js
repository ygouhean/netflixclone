import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

// Pages publiques
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// Pages client
import Browse from '../views/client/Browse.vue';
import Watch from '../views/client/Watch.vue';
import MyList from '../views/client/MyList.vue';
import Subscribe from '../views/client/Subscribe.vue';
import Success from '../views/client/Success.vue';
import SearchResults from '../views/client/SearchResults.vue';

// Pages admin
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminMovies from '../views/admin/Movies.vue';
import AdminUsers from '../views/admin/Users.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse,
    meta: { requiresAuth: true }
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: Watch,
    meta: { requiresAuth: true, requiresSubscription: true }
  },
  {
    path: '/my-list',
    name: 'MyList',
    component: MyList,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    meta: { requiresAuth: true }
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe,
    meta: { requiresAuth: true }
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/movies',
    name: 'AdminMovies',
    component: AdminMovies,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const user = store.state.auth.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    next('/browse');
  } else if (to.meta.requiresSubscription && user?.abonnement?.statut !== 'actif') {
    next('/subscribe');
  } else {
    next();
  }
});

export default router;

