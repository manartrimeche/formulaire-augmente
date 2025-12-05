# Backend API Documentation

## Structure du Backend

Le backend est construit avec :

- **Express.js** - Framework web Node.js
- **TypeScript** - Pour le typage statique
- **SQL.js** - Base de données SQLite en mémoire avec persistance sur disque
- **CORS** - Pour permettre les requêtes cross-origin

## Démarrage

### Développement

```bash
npm run dev
```

Cette commande lance simultanément :

- Le serveur frontend Vite sur http://localhost:5173
- Le serveur backend Express sur http://localhost:3000

### Lancer uniquement le backend

```bash
npm run dev:server
```

### Lancer uniquement le frontend

```bash
npm run dev:client
```

## Endpoints API

Base URL: `http://localhost:3000/api`

### Health Check

```
GET /api/health
```

Vérifie que le serveur fonctionne.

**Réponse:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Soumissions de Formulaire

#### Créer une soumission

```
POST /api/submissions
```

**Body:**

```json
{
  "mission_type": "contact",
  "first_name": "Jean",
  "last_name": "Dupont",
  "email": "jean.dupont@example.com",
  "message": "Message optionnel",
  "donation_amount": 50,
  "donation_frequency": "monthly",
  "skills": "Développement web",
  "preferences": "Préférences diverses"
}
```

**Réponse:**

```json
{
  "message": "Submission created successfully",
  "id": 1
}
```

#### Récupérer toutes les soumissions

```
GET /api/submissions
```

**Réponse:**

```json
[
  {
    "id": 1,
    "mission_type": "contact",
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "message": "Message",
    "donation_amount": null,
    "donation_frequency": null,
    "skills": null,
    "preferences": null,
    "created_at": "2025-12-05 00:00:00"
  }
]
```

#### Récupérer une soumission par ID

```
GET /api/submissions/:id
```

**Réponse:**

```json
{
  "id": 1,
  "mission_type": "contact",
  "first_name": "Jean",
  "last_name": "Dupont",
  "email": "jean.dupont@example.com",
  "created_at": "2025-12-05 00:00:00"
}
```

#### Supprimer une soumission

```
DELETE /api/submissions/:id
```

**Réponse:**

```json
{
  "message": "Submission deleted successfully"
}
```

## Base de Données

La base de données SQLite est stockée dans `data/submissions.db`.

### Schéma de la table `form_submissions`

| Colonne            | Type     | Description                                                 |
| ------------------ | -------- | ----------------------------------------------------------- |
| id                 | INTEGER  | Clé primaire auto-incrémentée                               |
| mission_type       | TEXT     | Type de mission (contact, donation, volunteer, information) |
| first_name         | TEXT     | Prénom                                                      |
| last_name          | TEXT     | Nom de famille                                              |
| email              | TEXT     | Adresse email                                               |
| message            | TEXT     | Message optionnel                                           |
| donation_amount    | REAL     | Montant du don (optionnel)                                  |
| donation_frequency | TEXT     | Fréquence du don (optionnel)                                |
| skills             | TEXT     | Compétences (optionnel)                                     |
| preferences        | TEXT     | Préférences (optionnel)                                     |
| created_at         | DATETIME | Date de création                                            |

## Configuration

### Variables d'environnement

**Frontend (.env.local):**

```env
VITE_API_URL=http://localhost:3000/api
```

**Backend (server/.env):**

```env
PORT=3000
```

## Structure des fichiers

```bash
server/
├── index.ts              # Point d'entrée du serveur
├── db/
│   └── database.ts       # Configuration et gestion de la base de données
└── routes/
    └── submissions.ts    # Routes pour les soumissions
```

## Notes

- La base de données est automatiquement créée au premier lancement
- Les données sont persistées sur disque dans le dossier `data/`
- Le serveur redémarre automatiquement en mode développement lors de modifications
