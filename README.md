# 🎬 Netflix Clone - Application Full Stack

Une application de streaming complète inspirée de Netflix, développée avec Vue.js, Node.js, Express et MongoDB. Ce projet comprend une interface utilisateur moderne, un panneau d'administration complet et un système de paiement intégré avec Stripe.

## ✨ Fonctionnalités

### 🎭 Côté Client
- ✅ **Authentification** : Inscription, connexion avec JWT
- 🎥 **Catalogue de films** : Navigation par genre, tendances, nouveautés
- ▶️ **Lecteur vidéo** : Lecture avec sauvegarde de progression
- ❤️ **Ma liste** : Ajout de favoris personnalisés
- 💳 **Abonnements** : 3 formules (Basique, Standard, Premium)
- 🔒 **Contrôle d'accès** : Contenu selon l'abonnement

### 👨‍💼 Côté Administrateur
- 📊 **Dashboard** : Statistiques en temps réel
- 🎬 **Gestion des films** : CRUD complet (Créer, Lire, Modifier, Supprimer)
- 👥 **Gestion des utilisateurs** : Vue d'ensemble et administration
- 📈 **Analytiques** : Vues, abonnements, revenus

### 💰 Paiement
- 💳 **Stripe intégré** : Paiements sécurisés
- 🔄 **Webhooks** : Mise à jour automatique des abonnements
- 📧 **Confirmation** : Page de succès après paiement

## 🏗️ Architecture Technique

### Backend
- **Node.js** + **Express.js**
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **Bcrypt** pour le cryptage des mots de passe
- **Stripe** pour les paiements
- **CORS** configuré

### Frontend
- **Vue.js 3** (Composition API)
- **Vue Router** pour la navigation
- **Vuex** pour la gestion d'état
- **Axios** pour les requêtes HTTP
- **CSS moderne** avec variables CSS

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)
- Compte Stripe (pour les paiements)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd netflix-clone
```

### 2. Installation Backend

```bash
cd backend
npm install
```

Créez un fichier `.env` à la racine du dossier backend :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=votre_secret_jwt_tres_securise_ici_changez_moi
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
CLIENT_URL=http://localhost:8080
```

### 3. Installation Frontend

```bash
cd ../frontend
npm install
```

## 🚀 Démarrage

### Démarrer MongoDB
```bash
# Si MongoDB est installé localement
mongod
```

### Démarrer le Backend
```bash
cd backend
npm run dev
# Le serveur démarre sur http://localhost:5000
```

### Démarrer le Frontend
```bash
cd frontend
npm run serve
# L'application démarre sur http://localhost:8080
```

## 👤 Comptes de test

### Compte Admin
Pour créer un compte admin, vous devez :
1. S'inscrire normalement via l'interface
2. Modifier manuellement le rôle dans MongoDB :
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Compte Utilisateur
- Inscription directe via l'interface `/register`
- Les nouveaux utilisateurs n'ont pas d'abonnement par défaut

## 🔑 Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Obtenez vos clés API (mode test) :
   - Clé secrète : `sk_test_...`
   - Clé publique : `pk_test_...`
3. Ajoutez la clé secrète dans `backend/.env`
4. Ajoutez la clé publique dans `frontend/src/views/client/Subscribe.vue`

### Configurer les Webhooks (optionnel pour le développement)
```bash
# Installer Stripe CLI
stripe listen --forward-to localhost:5000/api/payment/webhook
```

## 📁 Structure du Projet

```
netflix-clone/
├── backend/
│   ├── models/           # Modèles Mongoose
│   │   ├── User.js
│   │   └── Movie.js
│   ├── routes/           # Routes API
│   │   ├── auth.js
│   │   ├── movies.js
│   │   ├── users.js
│   │   ├── payment.js
│   │   └── subscriptions.js
│   ├── middleware/       # Middlewares
│   │   └── auth.js
│   ├── server.js         # Point d'entrée
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/       # CSS et ressources
│   │   ├── components/   # Composants réutilisables
│   │   │   ├── Navbar.vue
│   │   │   ├── AdminNav.vue
│   │   │   └── MovieCard.vue
│   │   ├── views/        # Pages
│   │   │   ├── Home.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── client/   # Pages client
│   │   │   │   ├── Browse.vue
│   │   │   │   ├── Watch.vue
│   │   │   │   ├── MyList.vue
│   │   │   │   ├── Subscribe.vue
│   │   │   │   └── Success.vue
│   │   │   └── admin/    # Pages admin
│   │   │       ├── Dashboard.vue
│   │   │       ├── Movies.vue
│   │   │       └── Users.vue
│   │   ├── router/       # Configuration Vue Router
│   │   ├── store/        # Vuex Store
│   │   │   ├── index.js
│   │   │   └── modules/
│   │   │       ├── auth.js
│   │   │       ├── movies.js
│   │   │       └── admin.js
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
│
└── README.md
```

## 🎨 Fonctionnalités Détaillées

### Interface Utilisateur
- **Page d'accueil** : Présentation de l'application avec FAQ
- **Authentification** : Formulaires modernes et sécurisés
- **Catalogue** : Grilles de films avec filtres par genre
- **Lecteur** : Player vidéo HTML5 avec contrôles
- **Abonnements** : Interface de choix de plan élégante

### Interface Admin
- **Dashboard** : Vue d'ensemble avec statistiques
- **Gestion films** : Formulaire complet avec validation
- **Gestion users** : Table filtrable avec détails
- **Statistiques** : Graphiques de distribution

## 🔒 Sécurité

- ✅ Mots de passe cryptés avec bcrypt
- ✅ Authentification JWT avec expiration
- ✅ Routes protégées côté backend
- ✅ Guards de navigation côté frontend
- ✅ Validation des données
- ✅ CORS configuré
- ✅ Variables d'environnement pour les secrets

## 🛠️ Technologies Utilisées

### Backend
- Express.js 4.18
- MongoDB 7.0
- Mongoose 7.0
- JWT 9.0
- Bcrypt 2.4
- Stripe 12.0

### Frontend
- Vue.js 3.3
- Vue Router 4.2
- Vuex 4.1
- Axios 1.4
- Stripe.js 1.54

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Films
- `GET /api/movies` - Liste des films
- `GET /api/movies/:id` - Détails d'un film
- `POST /api/movies` - Créer un film (admin)
- `PUT /api/movies/:id` - Modifier un film (admin)
- `DELETE /api/movies/:id` - Supprimer un film (admin)

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (admin)
- `PUT /api/users/favoris/:movieId` - Ajouter/retirer favori
- `POST /api/users/historique` - Mettre à jour l'historique

### Paiements
- `GET /api/payment/plans` - Plans d'abonnement
- `POST /api/payment/create-checkout-session` - Créer session paiement
- `POST /api/payment/webhook` - Webhook Stripe
- `POST /api/payment/cancel-subscription` - Annuler abonnement

## 🎯 Fonctionnalités Futures

- [ ] Système de recommandations
- [ ] Support multi-langues
- [ ] Profils utilisateurs multiples
- [ ] Téléchargement hors ligne
- [ ] Notifications push
- [ ] Chat en direct pour le support
- [ ] Intégration réseaux sociaux
- [ ] Application mobile (React Native)

## 🐛 Résolution de Problèmes

### Le backend ne démarre pas
- Vérifiez que MongoDB est lancé
- Vérifiez les variables d'environnement dans `.env`
- Vérifiez que le port 5000 est libre

### Le frontend ne se connecte pas au backend
- Vérifiez l'URL du backend dans les stores Vuex
- Vérifiez la configuration CORS
- Vérifiez les outils de développement du navigateur

### Les paiements ne fonctionnent pas
- Vérifiez les clés Stripe (mode test)
- Vérifiez que les webhooks sont configurés
- Consultez le dashboard Stripe pour les logs

## 📄 Licence

Ce projet est un projet de démonstration éducatif. Il n'est pas affilié à Netflix, Inc.

## 👨‍💻 Auteur

Projet développé dans le cadre d'une formation en développement web.

## 🙏 Remerciements

- Design inspiré par Netflix
- Icônes et émojis de Unicode
- Documentation Stripe pour l'intégration paiement

---

**Note** : Cette application est un projet de démonstration à des fins éducatives uniquement. Elle n'est pas destinée à être utilisée en production sans modifications de sécurité et de performance appropriées.

