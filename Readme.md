
# 🎬 CinéTrack 2

## 📌 Présentation

CinéTrack est une application web permettant de consulter et de gérer un catalogue de films et de séries.

Cette deuxième version améliore la première en intégrant la gestion dynamique des contenus à travers une API MockAPI et JavaScript.

## ✨ Fonctionnalités

### Partie utilisateur
- Affichage dynamique des films et séries.
- Recherche par titre.
- Filtrage par type : Films et Séries.
- Pagination des contenus.
- Gestion des favoris avec LocalStorage.
- Affichage des détails des contenus avec une fenêtre modale.

### Partie administration
- Affichage des contenus depuis MockAPI (GET).
- Ajout de nouveaux contenus (POST).
- Modification des contenus (PUT).
- Suppression des contenus (DELETE).
- Gestion des formulaires.
- Validation des champs obligatoires.

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6+)
- Fetch API
- MockAPI
- LocalStorage

## 📁 Structure du projet

```text
CinéTrack/
│
├── index.html
├── admin.html
│
└── src/
    ├── img/
    │
    └── js/
        ├── main.js
        ├── admin.js
        ├── store.js
        ├── render.js
        └── modale.js
```

## 🚀 Installation et lancement

1. Cloner le repository :

```bash
git clone URL_DU_REPOSITORY
```

2. Accéder au dossier du projet :

```bash
cd CinéTrack
```

3. Ouvrir le projet avec Visual Studio Code.

4. Lancer `index.html` avec l'extension Live Server.

## 🔗 API

L'application utilise MockAPI pour récupérer et gérer les données des films et des séries.

Les opérations CRUD sont réalisées avec Fetch API et les méthodes HTTP :

- GET : récupérer les contenus.
- POST : ajouter un contenu.
- PUT : modifier un contenu.
- DELETE : supprimer un contenu.

## 👨‍💻 Auteur

**Salaheddine Mesbahi**

Projet réalisé dans le cadre de la formation YouCode.

---

© 2026 CinéTrack. Tous droits réservés.
