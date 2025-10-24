#!/bin/bash

# 🚀 Script de déploiement Netflix Clone
echo "🎬 Déploiement Netflix Clone en production..."

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installation des dépendances backend
echo "📦 Installation des dépendances backend..."
cd backend
npm install --production

# Installation des dépendances frontend
echo "📦 Installation des dépendances frontend..."
cd ../frontend
npm install --production

# Build du frontend
echo "🔨 Build du frontend..."
npm run build

cd ..

echo "✅ Build terminé avec succès"

# Instructions pour le déploiement
echo ""
echo "🎯 Prochaines étapes :"
echo "1. Configurez votre fichier .env avec MongoDB Atlas"
echo "2. Déployez sur votre plateforme choisie (Heroku, Vercel, Netlify)"
echo "3. Configurez les variables d'environnement en production"
echo "4. Testez votre application"

echo ""
echo "📚 Consultez PRODUCTION_CONFIG.md pour plus de détails"
