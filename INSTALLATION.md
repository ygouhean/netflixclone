# 📖 Guide d'Installation Complet - Netflix Clone

Ce guide vous accompagne pas à pas pour installer et démarrer l'application Netflix Clone sur votre machine.

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### 1. Node.js et npm
```bash
# Vérifier l'installation
node --version  # doit être v14 ou supérieur
npm --version
```
👉 Si non installé : [Télécharger Node.js](https://nodejs.org/)

### 2. MongoDB

**Option A : Installation locale**
```bash
# Vérifier l'installation
mongod --version
```
👉 Si non installé : [Télécharger MongoDB](https://www.mongodb.com/try/download/community)

**Option B : MongoDB Atlas (Cloud)**
1. Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Obtenez votre URI de connexion

### 3. Git (optionnel)
```bash
git --version
```

## 📥 Téléchargement du Projet

### Option 1 : Avec Git
```bash
git clone <url-du-repo>
cd netflix-clone
```

### Option 2 : Téléchargement ZIP
1. Téléchargez le fichier ZIP
2. Extrayez-le dans un dossier
3. Ouvrez un terminal dans ce dossier

## 🔐 Configuration du Backend

### Étape 1 : Accéder au dossier backend
```bash
cd backend
```

### Étape 2 : Installer les dépendances
```bash
npm install
```
⏱️ Cette opération peut prendre 2-3 minutes

### Étape 3 : Créer le fichier .env
Créez un fichier nommé `.env` dans le dossier `backend` avec le contenu suivant :

```env
# Port du serveur
PORT=5000

# Connexion MongoDB
# Option A : MongoDB local
MONGODB_URI=mongodb://localhost:27017/netflix-clone

# Option B : MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone

# Sécurité JWT
JWT_SECRET=mon_super_secret_jwt_2024_changez_moi_svp
JWT_EXPIRE=7d

# Stripe (mode test)
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# URL du client
CLIENT_URL=http://localhost:8080
```

### Étape 4 : Configurer Stripe

1. **Créer un compte Stripe**
   - Allez sur [https://stripe.com](https://stripe.com)
   - Cliquez sur "Sign up"
   - Remplissez le formulaire

2. **Obtenir les clés API**
   - Connectez-vous à votre dashboard Stripe
   - Allez dans "Developers" > "API keys"
   - Activez le "Test mode" (en haut à droite)
   - Copiez la "Secret key" (commence par `sk_test_...`)
   - Collez-la dans votre `.env` pour `STRIPE_SECRET_KEY`

3. **Note sur la clé publique**
   - Copiez aussi la "Publishable key" (commence par `pk_test_...`)
   - Vous en aurez besoin pour le frontend

### Étape 5 : Démarrer MongoDB

**Si vous utilisez MongoDB local :**
```bash
# Dans un nouveau terminal
mongod
```
Laissez ce terminal ouvert.

**Si vous utilisez MongoDB Atlas :**
Rien à faire, c'est dans le cloud ! ☁️

### Étape 6 : Tester le backend
```bash
# Dans le dossier backend
npm run dev
```

Vous devriez voir :
```
✅ Connecté à MongoDB
🚀 Serveur démarré sur le port 5000
```

## 🎨 Configuration du Frontend

### Étape 1 : Accéder au dossier frontend
```bash
# Ouvrez un NOUVEAU terminal
cd frontend
```

### Étape 2 : Installer les dépendances
```bash
npm install
```
⏱️ Cette opération peut prendre 2-3 minutes

### Étape 3 : Configurer la clé Stripe
Ouvrez le fichier `frontend/src/views/client/Subscribe.vue` et remplacez :

```javascript
// Ligne ~
const stripe = await loadStripe('pk_test_votre_cle_publique_stripe');
```

Par votre vraie clé publique Stripe.

### Étape 4 : Démarrer le frontend
```bash
npm run serve
```

Vous devriez voir :
```
App running at:
- Local:   http://localhost:3000/
```

## 🎉 Premier Lancement

### 1. Ouvrir l'application
Ouvrez votre navigateur et allez sur : [http://localhost:3000](http://localhost:3000)

### 2. Créer un compte utilisateur
1. Cliquez sur "Commencer" ou "Se connecter"
2. Cliquez sur "Inscrivez-vous maintenant"
3. Remplissez le formulaire :
   - Prénom : yannick
   - Nom : Gouhean
   - Email : user@example.com
   - Mot de passe : 123456
4. Cliquez sur "S'inscrire"

### 3. Créer un compte admin

**Option A : Via MongoDB Compass (Interface graphique)**
1. Téléchargez [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connectez-vous à `mongodb://localhost:27017`
3. Sélectionnez la base `netflix-clone`
4. Sélectionnez la collection `users`
5. Trouvez votre utilisateur et modifiez le champ `role` de `"user"` à `"admin"`

**Option B : Via Terminal MongoDB**
```bash
# Ouvrez un nouveau terminal
mongo

# Dans le shell MongoDB
use netflix-clone
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 4. Ajouter des films (en tant qu'admin)
1. Connectez-vous avec votre compte admin
2. Allez sur `/admin`
3. Cliquez sur "Films & Séries"
4. Cliquez sur "+ Ajouter un contenu"
5. Remplissez le formulaire (exemple ci-dessous)

**Exemple de film à ajouter :**
```
Titre: Inception
Année: 2010
Description: Un voleur qui infiltre les rêves des gens...
Durée: 148
Note: 8.8
Genres: Action, Science-Fiction, Thriller
Catégorie: Film
Image URL: https://image.tmdb.org/t/p/w500/example.jpg
Vidéo URL: https://example.com/video.mp4
```

## 🧪 Tester l'Application

### Test 1 : Navigation Client
1. Allez sur `/browse`
2. Vérifiez que vous voyez le catalogue
3. Essayez de cliquer sur un film

### Test 2 : Abonnement
1. Allez sur `/subscribe`
2. Sélectionnez un plan
3. Cliquez sur "Continuer vers le paiement"
4. Utilisez la carte de test Stripe : `4242 4242 4242 4242`
5. Date d'expiration : n'importe quelle date future
6. CVC : n'importe quel code à 3 chiffres

### Test 3 : Administration
1. Connectez-vous en tant qu'admin
2. Allez sur `/admin`
3. Vérifiez le dashboard
4. Testez la création d'un film

## ❓ Problèmes Courants

### ❌ "Cannot connect to MongoDB"
**Solution :**
```bash
# Vérifiez que MongoDB est démarré
mongod

# Ou vérifiez votre URI MongoDB Atlas
```

### ❌ "Port 5000 already in use"
**Solution :**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <numero> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### ❌ "Module not found"
**Solution :**
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
```

### ❌ "CORS error"
**Solution :**
Vérifiez que :
1. Le backend est bien démarré sur le port 5000
2. Le frontend est bien démarré sur le port 8080
3. L'URL dans les stores Vuex est correcte

### ❌ "Stripe error"
**Solution :**
1. Vérifiez que vous êtes en mode "Test"
2. Vérifiez que les clés commencent par `sk_test_` et `pk_test_`
3. Utilisez la carte de test : `4242 4242 4242 4242`

## 📱 Accès à l'Application

- **Frontend** : [http://localhost:8080](http://localhost:8080)
- **Backend API** : [http://localhost:5000/api](http://localhost:5000/api)
- **MongoDB** : `mongodb://localhost:27017` (si local)

## 🛑 Arrêter l'Application

### Backend et Frontend
Appuyez sur `Ctrl + C` dans les terminaux correspondants.

### MongoDB (si local)
```bash
# Dans le terminal MongoDB
Ctrl + C
```

## 🔄 Redémarrage Rapide

Une fois tout configuré, pour redémarrer :

**Terminal 1 (MongoDB - si local) :**
```bash
mongod
```

**Terminal 2 (Backend) :**
```bash
cd backend
npm run dev
```

**Terminal 3 (Frontend) :**
```bash
cd frontend
npm run serve
```

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la section "Problèmes Courants" ci-dessus
2. Consultez les logs dans les terminaux
3. Vérifiez les outils de développement du navigateur (F12)

## ✅ Checklist d'Installation

- [ ] Node.js installé (v14+)
- [ ] MongoDB installé ou Atlas configuré
- [ ] Backend : `npm install` effectué
- [ ] Backend : fichier `.env` créé
- [ ] Backend : clés Stripe configurées
- [ ] Backend : serveur démarre sans erreur
- [ ] Frontend : `npm install` effectué
- [ ] Frontend : clé publique Stripe configurée
- [ ] Frontend : application accessible sur localhost:8080
- [ ] Compte utilisateur créé
- [ ] Compte admin créé
- [ ] Premier film ajouté

Bonne utilisation ! 🎬🍿

