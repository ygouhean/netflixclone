# 🚀 Configuration de Production - Netflix Clone

## 📋 Variables d'environnement requises

Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes :

```env
# Configuration de production
PORT=5000
MONGODB_URI=mongodb+srv://ygouhean_db_user:oxrZ2PAnJe6fNOaW@cluster0.m2jnf73.mongodb.net/?appName=Cluster0
JWT_SECRET=mon_super_secret_jwt_production_2024_changez_moi_svp
JWT_EXPIRE=7d

# Stripe Configuration (Production)
STRIPE_SECRET_KEY=sk_live_votre_cle_secrete_stripe_production
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret_production

# URL de production
CLIENT_URL=https://votre-domaine.com

# Configuration de sécurité
NODE_ENV=production
```

## 🗄️ Base de données MongoDB Atlas

### ✅ Configuration actuelle :
- **Cluster** : `cluster0.m2jnf73.mongodb.net`
- **Utilisateur** : `ygouhean_db_user`
- **Base de données** : `netflix-clone` (sera créée automatiquement)

### 🔧 Étapes de configuration :

1. **Accédez à MongoDB Atlas** : https://cloud.mongodb.com
2. **Connectez-vous** avec vos identifiants
3. **Sélectionnez votre cluster** : `Cluster0`
4. **Configurez l'accès réseau** :
   - Ajoutez `0.0.0.0/0` pour autoriser toutes les IPs
   - Ou ajoutez l'IP de votre serveur de production

5. **Vérifiez l'utilisateur de base de données** :
   - Nom d'utilisateur : `ygouhean_db_user`
   - Mot de passe : `oxrZ2PAnJe6fNOaW`
   - Rôle : `Read and write to any database`

## 🌐 Déploiement

### Option 1 : Heroku
```bash
# Installation de Heroku CLI
npm install -g heroku

# Connexion à Heroku
heroku login

# Création de l'application
heroku create netflix-clone-prod

# Configuration des variables d'environnement
heroku config:set MONGODB_URI="mongodb+srv://ygouhean_db_user:oxrZ2PAnJe6fNOaW@cluster0.m2jnf73.mongodb.net/?appName=Cluster0"
heroku config:set JWT_SECRET="mon_super_secret_jwt_production_2024"
heroku config:set NODE_ENV="production"

# Déploiement
git push heroku main
```

### Option 2 : Vercel
```bash
# Installation de Vercel CLI
npm install -g vercel

# Déploiement
vercel --prod
```

### Option 3 : Netlify
```bash
# Installation de Netlify CLI
npm install -g netlify-cli

# Déploiement
netlify deploy --prod
```

## 🔐 Sécurité de production

### Variables à changer absolument :
1. **JWT_SECRET** : Générez une clé forte et unique
2. **STRIPE_SECRET_KEY** : Utilisez votre clé Stripe Live
3. **STRIPE_WEBHOOK_SECRET** : Configurez le webhook en production

### Génération d'une clé JWT sécurisée :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📊 Monitoring

### Outils recommandés :
- **MongoDB Atlas** : Monitoring de la base de données
- **Stripe Dashboard** : Suivi des paiements
- **Heroku Metrics** : Performance de l'application

## 🚨 Checklist de production

- [ ] MongoDB Atlas configuré et accessible
- [ ] Variables d'environnement définies
- [ ] Clés Stripe Live configurées
- [ ] JWT_SECRET sécurisé
- [ ] URL de production définie
- [ ] Tests de connexion effectués
- [ ] Monitoring configuré

## 🔗 Liens utiles

- **MongoDB Atlas** : https://cloud.mongodb.com
- **Stripe Dashboard** : https://dashboard.stripe.com
- **Heroku Dashboard** : https://dashboard.heroku.com
