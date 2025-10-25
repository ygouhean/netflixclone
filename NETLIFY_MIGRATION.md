# 🌐 Migration vers Netlify - Alternative

## 🎯 Pourquoi Netlify ?
- ✅ Excellente réputation de domaine
- ✅ Certificats SSL automatiques
- ✅ Pas d'avertissements de sécurité
- ✅ Déploiement gratuit
- ✅ Formulaires intégrés

## 📋 Étapes de migration

### 1. Créer un compte Netlify
- Aller sur [netlify.com](https://netlify.com)
- Se connecter avec GitHub

### 2. Connecter le repository
- "New site from Git"
- Sélectionner votre repository GitHub
- Configuration :
  - Build command: `cd frontend && npm install && npm run build`
  - Publish directory: `frontend/dist`

### 3. Variables d'environnement
Dans Site settings → Environment variables :
```
VUE_APP_API_URL=https://netflixclonebackend-ryt0.onrender.com
VUE_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Configuration _redirects
Créer `frontend/public/_redirects` :
```
/*    /index.html   200
```

## ✅ Avantages
- 🚀 Plus d'avertissements de sécurité
- 🎯 URL professionnelle
- ⚡ Performance optimale
- 🔒 Sécurité renforcée
- 📱 PWA automatique

## 💰 Coût
- **Gratuit** pour les projets personnels
- **Pro** : 19$/mois pour les équipes
