# 🎬 Netflix Clone - Projet Complet

Un clone Netflix entièrement fonctionnel avec une page d'accueil identique au site officiel, système de paiement Stripe, et toutes les fonctionnalités modernes d'une plateforme de streaming.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil Authentique
- **Design identique** au site Netflix officiel
- **Section tendances** avec les 5 films les plus populaires
- **Modal de détails** avec description complète des films
- **Interface responsive** parfaite sur tous les appareils
- **Animations fluides** et effets visuels Netflix

### 🎥 Gestion des Films
- **Catalogue complet** avec images, descriptions, notes
- **Système de favoris** persistant
- **Lecture de vidéos** avec support YouTube
- **Historique de visionnage** automatique
- **Compteur de vues** pour les tendances

### 💳 Système de Paiement
- **Intégration Stripe** complète
- **3 plans d'abonnement** : Standard, Premium, Family
- **Webhooks automatiques** pour l'activation
- **Gestion des abonnements** en temps réel
- **Interface de paiement** sécurisée

### 👤 Gestion des Utilisateurs
- **Inscription/Connexion** avec JWT
- **Profils utilisateur** complets
- **Système de rôles** (Admin/User)
- **Gestion des favoris** personnalisée
- **Historique de visionnage**

### 🛠️ Administration
- **Dashboard admin** complet
- **Gestion des films** (CRUD)
- **Gestion des utilisateurs**
- **Statistiques** en temps réel
- **Interface d'administration** intuitive

## 🚀 Technologies Utilisées

### Backend
- **Node.js** avec Express.js
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **Stripe** pour les paiements
- **Webhooks** pour l'automatisation

### Frontend
- **Vue.js 3** avec Composition API
- **Vuex** pour la gestion d'état
- **Vue Router** pour la navigation
- **Axios** pour les requêtes API
- **CSS3** avec design responsive

## 📦 Installation

### Prérequis
- Node.js (v14+)
- MongoDB
- Compte Stripe (pour les paiements)

### Installation Rapide

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/netflix-clone.git
cd netflix-clone
```

2. **Installer les dépendances Backend**
```bash
cd backend
npm install
```

3. **Installer les dépendances Frontend**
```bash
cd ../frontend
npm install
```

4. **Configuration**
```bash
# Backend
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos configurations

# Frontend
# Le fichier vue.config.js est déjà configuré
```

5. **Démarrer l'application**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run serve
```

## 🔧 Configuration

### Variables d'Environnement Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:3000
```

### Configuration Stripe
1. Créez un compte Stripe
2. Récupérez vos clés API
3. Configurez les webhooks
4. Mettez à jour les variables d'environnement

## 📱 Interface Utilisateur

### Page d'Accueil
- **Hero section** avec formulaire d'inscription
- **Section tendances** avec les films populaires
- **Fonctionnalités** détaillées
- **FAQ** interactive
- **Footer** complet

### Navigation
- **Header fixe** avec logo Netflix
- **Menu responsive** pour mobile
- **Navigation fluide** entre les pages
- **Breadcrumbs** pour l'orientation

### Pages Principales
- **Browse** : Catalogue de films
- **My List** : Favoris de l'utilisateur
- **Watch** : Lecteur vidéo
- **Subscribe** : Plans d'abonnement
- **Success** : Confirmation de paiement

## 🎯 Fonctionnalités Avancées

### Système de Tendances
- **Calcul automatique** basé sur les vues
- **Top 5** des films les plus populaires
- **Mise à jour** en temps réel
- **Interface visuelle** attractive

### Modal de Détails
- **Informations complètes** : titre, année, note, durée
- **Description détaillée** du film
- **Genres** avec tags colorés
- **Actions** : Regarder, Ajouter aux favoris
- **Design Netflix** authentique

### Gestion des Favoris
- **Ajout/Suppression** en un clic
- **Synchronisation** frontend-backend
- **Persistance** des données
- **Interface intuitive**

## 🔒 Sécurité

- **Authentification JWT** sécurisée
- **Validation** des données côté serveur
- **Protection** des routes sensibles
- **Gestion d'erreurs** robuste
- **Variables d'environnement** sécurisées

## 📊 Performance

- **Lazy loading** des composants
- **Optimisation** des images
- **Cache** des requêtes API
- **Compression** des assets
- **Responsive design** optimisé

## 🚀 Déploiement

### Backend (Heroku/Railway)
```bash
# Build et déploiement automatique
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
# Build de production
npm run build
# Déploiement automatique
```

## 📈 Roadmap

- [ ] **Tests unitaires** et d'intégration
- [ ] **PWA** (Progressive Web App)
- [ ] **Notifications** push
- [ ] **Chat** en temps réel
- [ ] **Recommandations** IA
- [ ] **Multi-langue** support

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votre-profil)

## 🙏 Remerciements

- **Netflix** pour l'inspiration du design
- **Vue.js** pour le framework frontend
- **Stripe** pour les paiements
- **MongoDB** pour la base de données
- **Communauté open source** pour les packages

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous a aidé !**