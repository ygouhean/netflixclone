<template>
  <div class="admin-users">
    <AdminNav />
    
    <div class="users-content container">
      <h1>Gestion des utilisateurs</h1>
      
      <div class="filters">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un utilisateur..."
          class="search-input"
        />
        <select v-model="filterStatus" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="annule">Annulé</option>
        </select>
        <select v-model="filterPlan" class="filter-select">
          <option value="">Tous les plans</option>
          <option value="basique">Basique</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="none">Sans abonnement</option>
        </select>
      </div>
      
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Abonnement</th>
              <th>Statut</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user._id">
              <td>{{ user.prenom }} {{ user.nom }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge" :class="user.role">{{ user.role }}</span>
              </td>
              <td>{{ getPlanName(user.abonnement.type) }}</td>
              <td>
                <span class="status-badge" :class="user.abonnement.statut">
                  {{ user.abonnement.statut }}
                </span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <button @click="viewUser(user)" class="btn-icon">👁️</button>
                <button @click="deleteUser(user._id)" class="btn-icon">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Modal détails utilisateur -->
    <div v-if="selectedUser" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Détails de l'utilisateur</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <div class="user-details">
            <div class="detail-row">
              <span class="label">Nom complet:</span>
              <span>{{ selectedUser.prenom }} {{ selectedUser.nom }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span>{{ selectedUser.email }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Rôle:</span>
              <span class="badge" :class="selectedUser.role">{{ selectedUser.role }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Type d'abonnement:</span>
              <span>{{ getPlanName(selectedUser.abonnement.type) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Statut:</span>
              <span class="status-badge" :class="selectedUser.abonnement.statut">
                {{ selectedUser.abonnement.statut }}
              </span>
            </div>
            <div class="detail-row" v-if="selectedUser.abonnement.dateDebut">
              <span class="label">Date de début:</span>
              <span>{{ formatDate(selectedUser.abonnement.dateDebut) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Nombre de favoris:</span>
              <span>{{ selectedUser.favoris?.length || 0 }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Historique:</span>
              <span>{{ selectedUser.historique?.length || 0 }} films vus</span>
            </div>
            <div class="detail-row">
              <span class="label">Membre depuis:</span>
              <span>{{ formatDate(selectedUser.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  name: 'AdminUsers',
  components: {
    AdminNav
  },
  data() {
    return {
      searchQuery: '',
      filterStatus: '',
      filterPlan: '',
      selectedUser: null
    };
  },
  computed: {
    users() {
      return this.$store.state.admin.users;
    },
    filteredUsers() {
      let filtered = this.users;
      
      if (this.searchQuery) {
        filtered = filtered.filter(u =>
          u.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      if (this.filterStatus) {
        filtered = filtered.filter(u => u.abonnement.statut === this.filterStatus);
      }
      
      if (this.filterPlan) {
        filtered = filtered.filter(u => u.abonnement.type === this.filterPlan);
      }
      
      return filtered;
    }
  },
  methods: {
    getPlanName(key) {
      const names = {
        basique: 'Basique',
        standard: 'Standard',
        premium: 'Premium',
        none: 'Sans abonnement'
      };
      return names[key] || key;
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR');
    },
    
    viewUser(user) {
      this.selectedUser = user;
    },
    
    closeModal() {
      this.selectedUser = null;
    },
    
    async deleteUser(userId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
          await this.$store.dispatch('admin/deleteUser', userId);
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }
    }
  },
  created() {
    this.$store.dispatch('admin/fetchUsers');
  }
};
</script>

<style scoped>
.admin-users {
  min-height: 100vh;
  padding-top: 80px;
}

.users-content {
  padding: 2rem 0;
}

.users-content h1 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
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
  min-width: 180px;
}

.users-table {
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

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge.admin {
  background-color: var(--netflix-red);
  color: white;
}

.badge.user {
  background-color: #46d369;
  color: #000;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.actif {
  background-color: #46d369;
  color: #000;
}

.status-badge.inactif {
  background-color: #888;
  color: white;
}

.status-badge.annule {
  background-color: #e50914;
  color: white;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  margin: 0 0.25rem;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.2);
}

.user-details {
  display: grid;
  gap: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #1f1f1f;
  border-radius: 4px;
}

.label {
  font-weight: 600;
  color: #ccc;
}

.btn-close {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
</style>

