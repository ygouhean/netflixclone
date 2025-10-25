# 🌐 Configuration d'un domaine personnalisé pour résoudre les problèmes de sécurité

## 🎯 Objectif
Résoudre définitivement les avertissements de sécurité en utilisant un domaine personnalisé au lieu du sous-domaine Render.

## 🛠️ Solutions recommandées

### Option 1 : Nom de domaine gratuit
1. **Freenom** (domaines gratuits) : .tk, .ml, .ga, .cf
2. **No-IP** : Sous-domaines gratuits
3. **DuckDNS** : Sous-domaines gratuits

### Option 2 : Nom de domaine payant (recommandé)
1. **Namecheap** : ~10€/an
2. **GoDaddy** : ~12€/an
3. **OVH** : ~8€/an

## 📋 Étapes de configuration

### 1. Achat du domaine
- Choisir un nom : `netflix-clone-votre-nom.com`
- Acheter le domaine
- Noter les serveurs DNS

### 2. Configuration sur Render
1. Aller dans votre dashboard Render
2. Sélectionner votre service frontend
3. Settings → Custom Domains
4. Ajouter votre domaine personnalisé
5. Configurer les enregistrements DNS

### 3. Configuration DNS
```
Type: CNAME
Name: www
Value: netflixclone-i8in.onrender.com

Type: A
Name: @
Value: [IP de Render]
```

### 4. Mise à jour de la configuration
- Modifier `CLIENT_URL` dans render.yaml
- Mettre à jour les URLs Stripe
- Redéployer l'application

## ✅ Avantages
- ✅ Plus d'avertissements de sécurité
- ✅ URL professionnelle
- ✅ Meilleure réputation
- ✅ Contrôle total du domaine

## 💰 Coût
- Domaine : 8-15€/an
- Configuration : Gratuite
- Maintenance : Minimale
