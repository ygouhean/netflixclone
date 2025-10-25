#!/bin/bash

# 🚀 Script de migration vers Vercel
echo "🚀 Migration vers Vercel - Netflix Clone"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Se connecter à Vercel
echo "🔐 Connexion à Vercel..."
vercel login

# Aller dans le dossier frontend
cd frontend

# Déployer sur Vercel
echo "🚀 Déploiement sur Vercel..."
vercel

# Configurer les variables d'environnement
echo "⚙️ Configuration des variables d'environnement..."
vercel env add VUE_APP_API_URL
vercel env add VUE_APP_STRIPE_PUBLISHABLE_KEY

echo "✅ Migration terminée !"
echo "🌐 Votre site sera disponible sur : https://votre-projet.vercel.app"
echo "🔒 Plus d'avertissements de sécurité Google !"
