# 🔧 Configuration Vercel pour Vue.js - Guide Manuel

## ⚠️ Problème résolu : Framework non reconnu

Le framework `vuejs` n'est pas dans la liste des valeurs autorisées par Vercel. Voici la solution :

## 🚀 Configuration dans le Dashboard Vercel

### 1. Aller dans Settings → General
```
Project Name: netflix-clone-ygouhean
Framework Preset: Vue.js (sélectionner dans la liste déroulante)
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 22.x
```

### 2. Variables d'environnement (Settings → Environment Variables)
```
VUE_APP_API_URL = https://netflixclonebackend-ryt0.onrender.com
VUE_APP_STRIPE_PUBLISHABLE_KEY = pk_test_51SK9qJHwzP8G0qsCIi7TXDZRu9HnNKVSiOFsrHCA07VirjZnC54QzJibdi5RFmzwsFr0raaBvXaIPaeZzwBGF3hb00T0UikeYu
```

### 3. Configuration automatique
Vercel détectera automatiquement Vue.js grâce à :
- `package.json` avec `@vue/cli-service`
- Scripts `build` et `serve`
- Structure de projet Vue.js

## ✅ Frameworks supportés par Vercel

Voici la liste complète des frameworks supportés :
- `blitzjs`
- `nextjs`
- `gatsby`
- `remix`
- `react-router`
- `astro`
- `hexo`
- `eleventy`
- `docusaurus-2`
- `docusaurus`
- `preact`
- `solidstart-1`
- `solidstart`
- `sveltekit-1`
- `sveltekit`
- `vite`
- `vitepress-1`
- `vitepress`
- `vue`
- `nuxtjs`
- `redwoodjs`
- `hydrogen`

## 🎯 Solution pour Vue.js

**Dans le dashboard Vercel :**
1. Sélectionner **"Vue.js"** dans Framework Preset
2. Laisser Vercel détecter automatiquement la configuration
3. Le fichier `vercel.json` sera utilisé pour les headers et routes

## 📋 Vérification

Après configuration, vérifiez que :
- ✅ Framework: Vue.js
- ✅ Build Command: npm run build
- ✅ Output Directory: dist
- ✅ Node.js Version: 22.x
- ✅ Variables d'environnement configurées

## 🚀 Déploiement

1. **Redeployer** le projet
2. **Vérifier** les logs de build
3. **Tester** l'application

Votre application Vue.js devrait maintenant se déployer correctement ! 🎊
