# 🎥 Intégration des vidéos YouTube - Netflix Clone

## ✅ Problème résolu : CSP mis à jour

La Content Security Policy a été mise à jour pour autoriser :
- `https://www.youtube.com` - Pour les vidéos YouTube
- `https://player.vimeo.com` - Pour les vidéos Vimeo

## 🚀 Comment intégrer des vidéos YouTube

### 1. Format d'URL YouTube recommandé
```
https://www.youtube.com/embed/VIDEO_ID
```

### 2. Exemple d'intégration dans Vue.js
```vue
<template>
  <div class="video-player">
    <iframe
      :src="videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${this.videoId}`;
    }
  }
}
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
```

### 3. Utilisation dans votre composant MovieCard
```vue
<template>
  <div class="movie-card">
    <img :src="movie.poster" :alt="movie.title" />
    <div class="movie-overlay">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.description }}</p>
      <button @click="playTrailer">▶️ Bande-annonce</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    playTrailer() {
      // Ouvrir la vidéo YouTube dans une modal ou nouvelle page
      const videoUrl = `https://www.youtube.com/embed/${this.movie.trailerId}`;
      // Implémenter l'ouverture de la modal
    }
  }
}
</script>
```

## 🎯 Structure de données recommandée

```javascript
const movie = {
  title: "Titre du film",
  description: "Description du film",
  poster: "https://example.com/poster.jpg",
  trailerId: "dQw4w9WgXcQ", // ID YouTube de la bande-annonce
  videoId: "dQw4w9WgXcQ", // ID YouTube du film complet
  year: 2024,
  genre: ["Action", "Aventure"],
  duration: 120
}
```

## 🔧 Configuration CSP mise à jour

La CSP autorise maintenant :
- **frame-src** : `https://www.youtube.com` et `https://player.vimeo.com`
- **script-src** : Scripts Stripe et YouTube
- **style-src** : Polices Google et styles inline

## 📋 Prochaines étapes

1. **Redéployer** l'application (les changements CSP sont déjà commités)
2. **Tester** l'intégration YouTube
3. **Ajouter** des vidéos à votre base de données
4. **Implémenter** le lecteur vidéo dans votre interface

## ⚠️ Notes importantes

- Utilisez toujours l'URL `embed` pour YouTube
- Ajoutez les attributs `allow` pour les permissions
- Testez sur mobile et desktop
- Respectez les droits d'auteur des vidéos

Vos vidéos YouTube devraient maintenant s'afficher correctement ! 🎊

