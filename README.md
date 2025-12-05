# 🌱 Démarche NIRD - Application Web Ludique

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5-black?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Application web ludique pour accompagner les établissements scolaires dans leur transformation vers un **numérique indépendant, responsable et durable**.

## 🎯 À propos de NIRD

La **Démarche NIRD** aide les écoles, collèges et lycées à :

| Pilier             | Description                                      | Emoji |
| ------------------ | ------------------------------------------------ | ----- |
| **Indépendance**   | Se libérer des Big Tech et reprendre le contrôle | 🔓    |
| **Responsabilité** | Protéger les données et l'éthique numérique      | ⚖️    |
| **Durabilité**     | Réduire l'empreinte carbone du numérique         | 🌍    |
| **Apprentissage**  | Développer les compétences et connaissances      | 📚    |

## ✨ Fonctionnalités principales

✅ **Formulaire interactif** - 4 piliers NIRD adaptés aux besoins des établissements  
✅ **API REST complète** - Gestion des demandes d'adhésion et suivi  
✅ **Persistance MongoDB** - Base de données scalable avec Mongoose  
✅ **Validation robuste** - Côté client (React) et serveur (Express)  
✅ **Interface ludique** - Design responsif avec Tailwind CSS et emojis  
✅ **Outils d'administration** - CLI pour exporter et gérer les données  
✅ **Tests intégrés** - Collection Postman avec scénarios complets  
✅ **CI/CD pipelines** - GitHub Actions pour tests et déploiement automatisés

## ✨ Fonctionnalités principales

✅ **Formulaire dynamique** - 4 types d'engagement adaptés aux besoins  
✅ **API REST complète** - 6 endpoints CRUD pour gérer les soumissions  
✅ **Persistance MongoDB** - Base de données scalable avec Mongoose  
✅ **Validation robuste** - Côté client (React) et serveur (Express)  
✅ **Interface moderne** - Design responsive avec Tailwind CSS  
✅ **Outils d'administration** - CLI pour exporter, lister et nettoyer les données  
✅ **Tests intégrés** - Collection Postman avec 8+ scénarios de test  
✅ **CI/CD pipelines** - GitHub Actions pour tests et déploiement automatisés

- **Interface moderne** avec Tailwind CSS

## 🛠️ Stack technologique

### Frontend

- **React 18.3** - Bibliothèque UI moderne
- **TypeScript 5.5+** - Typage statique robuste
- **Vite 5.4** - Build tool ultra-rapide
- **Tailwind CSS 3.4** - Styling utilitaire
- **Lucide React 0.344** - Icônes SVG

### Backend

- **Node.js 20.14+** - Runtime JavaScript côté serveur
- **Express 5.2** - Framework web minimaliste
- **TypeScript 5.5+** - Typage statique
- **MongoDB 7** - Base de données NoSQL
- **Mongoose 9.0** - ODM avec validation
- **CORS 2.8** - Middleware cross-origin

### DevOps & Testing

- **Docker & Docker Compose** - Containerisation
- **Postman** - Tests API
- **GitHub Actions** - CI/CD automatisé
- **npm** - Gestion des dépendancesct

**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, CORS

## 📦 Installation & Démarrage

### Prérequis

- Node.js 20+
- MongoDB (voir [MONGODB_SETUP.md](./MONGODB_SETUP.md))

### Installation rapide avec Docker

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer MongoDB avec Docker
docker-compose up -d

```

├── src/ # Frontend React
├── server/ # Backend Express
│ ├── db/ # Configuration MongoDB
│ ├── models/ # Modèles Mongoose
│ └── routes/ # Routes API
├── postman/ # Collection Postman
└── public/ # Fichiers statiques

```
| Méthode | URL                    | Description                  |
| ------- | ---------------------- | ---------------------------- |
| GET     | `/api/health`          | Health check                 |
| GET     | `/api/submissions`     | Liste toutes les soumissions |
| POST    | `/api/submissions`     | Crée une nouvelle soumission |
| GET     | `/api/submissions/:id` | Récupère une soumission      |
| PUT     | `/api/submissions/:id` | Met à jour une soumission    |
| DELETE  | `/api/submissions/:id` | Supprime une soumission      |

📖 **Documentation complète:** [server/README.md](./server/README.md)

## 🧪 Tester l'API avec Postman

1. Importez les fichiers de la collection Postman (dossier `postman/`)
2. Sélectionnez l'environnement "Local"
3. Testez les différents endpoints

📖 **Guide Postman:** [postman/README.md](./postman/README.md)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Guide de démarrage rapide ⚡ |
| [GITHUB_README.md](./GITHUB_README.md) | Description GitHub complète 📖 |
| [MONGODB_SETUP.md](./MONGODB_SETUP.md) | Configuration MongoDB 🗄️ |
| [server/README.md](./server/README.md) | Documentation backend 🔧 |
| [postman/README.md](./postman/README.md) | Guide Postman 🧪 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Déploiement production 🚀 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guide de contribution 🤝 |
| [SECURITY.md](./SECURITY.md) | Politique de sécurité 🔒 |

**Accès:**
- Frontend : **http://localhost:5175**
- Backend API : **http://localhost:3000**
- Mongo Express (si Docker) : **http://localhost:8081**
Le frontend sera accessible sur **http://localhost:5175** et l'API backend sur **http://localhost:3000**

## 📁 Structure

```

├── src/ # Frontend React
├── server/ # Backend Express
├── data/ # Base de données SQLite
└── public/ # Fichiers statiques

````

## 🔌 API Endpoints

| Méthode | URL                    | Description                  |
| ------- | ---------------------- | ---------------------------- |
| GET     | `/api/health`          | Health check                 |
| GET     | `/api/submissions`     | Liste toutes les soumissions |
| POST    | `/api/submissions`     | Crée une nouvelle soumission |
| GET     | `/api/submissions/:id` | Récupère une soumission      |
| DELETE  | `/api/submissions/:id` | Supprime une soumission      |

📖 **Documentation complète:** [server/README.md](./server/README.md)

---

## 📝 Configuration Vite/React (template original)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
