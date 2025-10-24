# 📚 Documentation API - Netflix Clone

Documentation complète de l'API REST du backend Netflix Clone.

## 🌐 URL de Base

```
http://localhost:5000/api
```

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Incluez le token dans l'en-tête de vos requêtes :

```
Authorization: Bearer <votre_token_jwt>
```

---

## 📋 Table des Matières

1. [Authentification](#authentification)
2. [Films](#films)
3. [Utilisateurs](#utilisateurs)
4. [Paiements](#paiements)
5. [Abonnements](#abonnements)
6. [Codes d'Erreur](#codes-derreur)

---

## 🔑 Authentification

### Inscription

Créer un nouveau compte utilisateur.

**Endpoint:** `POST /api/auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "nom": "Doe",
  "prenom": "John"
}
```

**Réponse (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6123456789abcdef12345678",
    "email": "user@example.com",
    "nom": "Doe",
    "prenom": "John",
    "role": "user",
    "abonnement": {
      "type": "none",
      "statut": "inactif"
    }
  }
}
```

---

### Connexion

Authentifier un utilisateur existant.

**Endpoint:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Réponse (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6123456789abcdef12345678",
    "email": "user@example.com",
    "nom": "Doe",
    "prenom": "John",
    "role": "user",
    "abonnement": {
      "type": "standard",
      "statut": "actif"
    }
  }
}
```

---

### Profil Utilisateur

Obtenir les informations de l'utilisateur connecté.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse (200):**
```json
{
  "success": true,
  "user": {
    "id": "6123456789abcdef12345678",
    "email": "user@example.com",
    "nom": "Doe",
    "prenom": "John",
    "role": "user",
    "abonnement": {
      "type": "standard",
      "statut": "actif",
      "dateDebut": "2024-01-15T10:30:00.000Z",
      "dateFin": null
    },
    "favoris": [...],
    "historique": [...]
  }
}
```

---

## 🎬 Films

### Lister tous les films

Obtenir la liste de tous les films avec filtres optionnels.

**Endpoint:** `GET /api/movies`

**Query Parameters:**
- `genre` (string): Filtrer par genre
- `categorie` (string): "film" ou "serie"
- `tendance` (boolean): Films en tendance
- `nouveaute` (boolean): Nouveautés
- `search` (string): Recherche textuelle

**Exemples:**
```
GET /api/movies?genre=Action
GET /api/movies?tendance=true
GET /api/movies?search=inception
```

**Réponse (200):**
```json
{
  "success": true,
  "count": 42,
  "movies": [
    {
      "_id": "6123456789abcdef12345678",
      "titre": "Inception",
      "description": "Un voleur qui infiltre les rêves...",
      "duree": 148,
      "anneeSortie": 2010,
      "genre": ["Action", "Science-Fiction", "Thriller"],
      "categorie": "film",
      "imageUrl": "https://example.com/inception.jpg",
      "banniereUrl": "https://example.com/inception-banner.jpg",
      "videoUrl": "https://example.com/inception.mp4",
      "trailerUrl": "https://example.com/inception-trailer.mp4",
      "note": 8.8,
      "ageMinimum": 13,
      "realisateur": "Christopher Nolan",
      "casting": [
        { "nom": "Leonardo DiCaprio", "role": "Cobb" }
      ],
      "langue": "Anglais",
      "sousTitres": ["Français", "Espagnol"],
      "nombreVues": 15420,
      "tendance": true,
      "nouveaute": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Obtenir un film

Récupérer les détails d'un film spécifique.

**Endpoint:** `GET /api/movies/:id`

**Réponse (200):**
```json
{
  "success": true,
  "movie": {
    "_id": "6123456789abcdef12345678",
    "titre": "Inception",
    ...
  }
}
```

---

### Créer un film (Admin)

Ajouter un nouveau film au catalogue.

**Endpoint:** `POST /api/movies`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Body:**
```json
{
  "titre": "The Matrix",
  "description": "Un hacker découvre la vraie nature de la réalité...",
  "duree": 136,
  "anneeSortie": 1999,
  "genre": ["Action", "Science-Fiction"],
  "categorie": "film",
  "imageUrl": "https://example.com/matrix.jpg",
  "videoUrl": "https://example.com/matrix.mp4",
  "note": 8.7,
  "realisateur": "The Wachowskis",
  "langue": "Anglais"
}
```

**Réponse (201):**
```json
{
  "success": true,
  "movie": {
    "_id": "6123456789abcdef12345679",
    "titre": "The Matrix",
    ...
  }
}
```

---

### Modifier un film (Admin)

Mettre à jour les informations d'un film.

**Endpoint:** `PUT /api/movies/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Body:** (champs à modifier)
```json
{
  "note": 9.0,
  "tendance": true
}
```

**Réponse (200):**
```json
{
  "success": true,
  "movie": {
    ...mise à jour
  }
}
```

---

### Supprimer un film (Admin)

Retirer un film du catalogue.

**Endpoint:** `DELETE /api/movies/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Réponse (200):**
```json
{
  "success": true,
  "message": "Film supprimé"
}
```

---

### Incrémenter les vues

Enregistrer qu'un film a été visionné.

**Endpoint:** `POST /api/movies/:id/view`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse (200):**
```json
{
  "success": true,
  "movie": {
    ...
    "nombreVues": 15421
  }
}
```

---

## 👥 Utilisateurs

### Lister les utilisateurs (Admin)

Obtenir tous les utilisateurs.

**Endpoint:** `GET /api/users`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Réponse (200):**
```json
{
  "success": true,
  "count": 127,
  "users": [
    {
      "_id": "6123456789abcdef12345678",
      "email": "user@example.com",
      "nom": "Doe",
      "prenom": "John",
      "role": "user",
      "abonnement": {
        "type": "standard",
        "statut": "actif"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Gérer les favoris

Ajouter ou retirer un film des favoris.

**Endpoint:** `PUT /api/users/favoris/:movieId`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse (200):**
```json
{
  "success": true,
  "favoris": [
    "6123456789abcdef12345678",
    "6123456789abcdef12345679"
  ]
}
```

---

### Mettre à jour l'historique

Enregistrer la progression de visionnage.

**Endpoint:** `POST /api/users/historique`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "filmId": "6123456789abcdef12345678",
  "progression": 45.5
}
```

**Réponse (200):**
```json
{
  "success": true,
  "historique": [...]
}
```

---

### Supprimer un utilisateur (Admin)

Supprimer un compte utilisateur.

**Endpoint:** `DELETE /api/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Réponse (200):**
```json
{
  "success": true,
  "message": "Utilisateur supprimé"
}
```

---

## 💳 Paiements

### Obtenir les plans

Lister les plans d'abonnement disponibles.

**Endpoint:** `GET /api/payment/plans`

**Réponse (200):**
```json
{
  "success": true,
  "plans": {
    "basique": {
      "name": "Basique",
      "price": 799,
      "currency": "eur",
      "interval": "month",
      "features": ["Qualité SD", "1 écran"]
    },
    "standard": {
      "name": "Standard",
      "price": 1199,
      "currency": "eur",
      "interval": "month",
      "features": ["Qualité HD", "2 écrans"]
    },
    "premium": {
      "name": "Premium",
      "price": 1599,
      "currency": "eur",
      "interval": "month",
      "features": ["Qualité 4K+HDR", "4 écrans"]
    }
  }
}
```

---

### Créer une session de paiement

Initialiser un paiement Stripe.

**Endpoint:** `POST /api/payment/create-checkout-session`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "plan": "standard"
}
```

**Réponse (200):**
```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

---

### Webhook Stripe

Recevoir les événements Stripe.

**Endpoint:** `POST /api/payment/webhook`

**Headers:**
```
stripe-signature: t=...
```

**Note:** Géré automatiquement par Stripe. Ne pas appeler manuellement.

---

### Annuler l'abonnement

Annuler l'abonnement actif.

**Endpoint:** `POST /api/payment/cancel-subscription`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse (200):**
```json
{
  "success": true,
  "message": "Abonnement annulé"
}
```

---

## 📊 Abonnements

### Statistiques (Admin)

Obtenir les statistiques des abonnements.

**Endpoint:** `GET /api/subscriptions/stats`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Réponse (200):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 127,
    "activeSubscriptions": 89,
    "byPlan": [
      { "_id": "basique", "count": 25 },
      { "_id": "standard", "count": 42 },
      { "_id": "premium", "count": 22 },
      { "_id": "none", "count": 38 }
    ]
  }
}
```

---

## ⚠️ Codes d'Erreur

### 400 - Bad Request
```json
{
  "message": "Email et mot de passe requis"
}
```

### 401 - Unauthorized
```json
{
  "message": "Non autorisé, token manquant"
}
```

### 403 - Forbidden
```json
{
  "message": "Accès refusé - Droits admin requis"
}
```

### 404 - Not Found
```json
{
  "message": "Film non trouvé"
}
```

### 500 - Internal Server Error
```json
{
  "message": "Erreur serveur",
  "error": "..."
}
```

---

## 🧪 Exemples avec cURL

### S'inscrire
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "nom": "Test",
    "prenom": "User"
  }'
```

### Se connecter
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Obtenir les films
```bash
curl -X GET http://localhost:5000/api/movies \
  -H "Authorization: Bearer <votre_token>"
```

### Créer un film (Admin)
```bash
curl -X POST http://localhost:5000/api/movies \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Test Movie",
    "description": "Description du film...",
    "duree": 120,
    "anneeSortie": 2024,
    "genre": ["Action"],
    "categorie": "film",
    "imageUrl": "https://example.com/image.jpg",
    "videoUrl": "https://example.com/video.mp4"
  }'
```

---

## 📝 Notes

- Tous les prix dans Stripe sont en centimes (799 = 7.99 €)
- Les tokens JWT expirent après 7 jours par défaut
- Les mots de passe doivent faire minimum 6 caractères
- Les images et vidéos doivent être hébergées sur un CDN

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2025

