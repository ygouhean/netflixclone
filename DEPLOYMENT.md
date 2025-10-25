# 🚀 Guide de Déploiement en Production - Netflix Clone

## 📋 Prérequis

- ✅ Compte Render.com
- ✅ MongoDB Atlas configuré
- ✅ Repository GitHub
- ✅ Clés Stripe (test/production)

## 🗄️ Configuration MongoDB Atlas

### 1. Base de données configurée
```
URI: mongodb+srv://ygouhean_db_user:oxrZ2PAnJe6fNOaW@cluster0.m2jnf73.mongodb.net/?appName=Cluster0
```

### 2. Collections nécessaires
- `users` - Utilisateurs et abonnements
- `movies` - Catalogue de films
- `subscriptions` - Gestion des abonnements

## 🌐 Déploiement sur Render

### Étape 1: Déploiement du Backend

1. **Connecter le repository GitHub**
   - Aller sur [render.com](https://render.com)
   - Cliquer sur "New +" → "Web Service"
   - Connecter votre repository GitHub

2. **Configuration du Backend**
   ```
   Name: netflix-clone-backend
   Environment: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Variables d'environnement Backend**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://ygouhean_db_user:oxrZ2PAnJe6fNOaW@cluster0.m2jnf73.mongodb.net/?appName=Cluster0
   JWT_SECRET=mon_super_secret_jwt_2024_changez_moi_svp_production
   JWT_EXPIRE=7d
   STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe
   STRIPE_WEBHOOK_SECRET=whsec_4504ed47d5ac7505389336c4d468706450745f7dce1eaff18a47b8161384c1d7
   CLIENT_URL=https://votre-app-frontend.onrender.com
   ```

### Étape 2: Déploiement du Frontend

1. **Nouveau service Frontend**
   - "New +" → "Static Site"
   - Connecter le même repository

2. **Configuration du Frontend**
   ```
   Name: netflix-clone-frontend
   Environment: Static Site
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/dist
   ```

3. **Variables d'environnement Frontend**
   ```
   VUE_APP_API_URL=https://netflix-clone-backend.onrender.com
   VUE_APP_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_stripe
   ```

## 🔧 Configuration Post-Déploiement

### 1. Mise à jour des URLs
Après déploiement, mettre à jour :
- `CLIENT_URL` dans le backend avec l'URL du frontend
- `VUE_APP_API_URL` dans le frontend avec l'URL du backend

### 2. Configuration Stripe Webhooks
1. Aller dans le dashboard Stripe
2. Webhooks → Add endpoint
3. URL: `https://netflix-clone-backend.onrender.com/api/payment/webhook`
4. Événements: `checkout.session.completed`, `customer.subscription.deleted`

### 3. Test de l'application
1. Visiter l'URL du frontend
2. Tester l'inscription/connexion
3. Tester le processus de paiement
4. Vérifier les webhooks Stripe

## 📊 Monitoring et Maintenance

### Logs Render
- Backend: Dashboard → Logs
- Frontend: Dashboard → Logs

### Base de données
- MongoDB Atlas → Monitoring
- Vérifier les connexions actives

### Performance
- Render Free Plan: 750h/mois
- MongoDB Atlas M0: 512MB storage

## 🚨 Dépannage

### Erreurs communes
1. **CORS errors**: Vérifier CLIENT_URL
2. **Database connection**: Vérifier MONGODB_URI
3. **Stripe webhooks**: Vérifier l'URL et les événements

### Logs utiles
```bash
# Backend logs
render logs netflix-clone-backend

# Frontend logs  
render logs netflix-clone-frontend
```

## 🔐 Sécurité Production

### Variables sensibles
- ✅ JWT_SECRET fort
- ✅ MONGODB_URI sécurisé
- ✅ Stripe keys en production

### Recommandations
- Utiliser des clés Stripe production
- Configurer HTTPS
- Mettre à jour les secrets régulièrement

## 📈 Évolutivité

### Upgrade Render
- Free → Starter ($7/mois)
- Plus de ressources
- Support prioritaire

### MongoDB Atlas
- M0 → M2/M5
- Plus de storage
- Performance améliorée

---

## 🎯 URLs Finales

- **Frontend**: `https://netflixclone-i8in.onrender.com`
- **Backend**: `https://netflixclonebackend-ryt0.onrender.com`
- **API**: `https://netflixclonebackend-ryt0.onrender.com/api`

Votre Netflix Clone sera accessible 24/7 ! 🎊

