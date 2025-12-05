# Collection Postman - Formulaire Augmenté API

Cette collection Postman contient tous les endpoints de l'API du formulaire augmenté.

## Installation

### Importer dans Postman

1. Ouvrez Postman
2. Cliquez sur **Import** dans le coin supérieur gauche
3. Sélectionnez les fichiers :
   - `Formulaire-Augmente-API.postman_collection.json` (collection)
   - `Local.postman_environment.json` (environnement)
4. Sélectionnez l'environnement "Formulaire Augmenté - Local" dans le menu déroulant en haut à droite

## Structure de la Collection

### 1. Health Check

- **GET** `/health` - Vérifie que le serveur est en ligne

### 2. Submissions

- **GET** `/submissions` - Récupère toutes les soumissions
- **GET** `/submissions/:id` - Récupère une soumission par ID
- **POST** `/submissions` - Crée une nouvelle soumission
- **PUT** `/submissions/:id` - Met à jour une soumission
- **DELETE** `/submissions/:id` - Supprime une soumission

### 3. Examples par Type de Mission

#### Contact

```json
{
  "mission_type": "contact",
  "first_name": "Jean",
  "last_name": "Dupont",
  "email": "jean.dupont@example.com",
  "message": "Je souhaite obtenir plus d'informations."
}
```

#### Donation

```json
{
  "mission_type": "donation",
  "first_name": "Marie",
  "last_name": "Martin",
  "email": "marie.martin@example.com",
  "donation_amount": 50,
  "donation_frequency": "monthly"
}
```

#### Volunteer

```json
{
  "mission_type": "volunteer",
  "first_name": "Pierre",
  "last_name": "Bernard",
  "email": "pierre.bernard@example.com",
  "skills": "Développement web, Design UI/UX",
  "preferences": "Disponible les week-ends"
}
```

#### Information

```json
{
  "mission_type": "information",
  "first_name": "Sophie",
  "last_name": "Dubois",
  "email": "sophie.dubois@example.com",
  "message": "J'aimerais recevoir plus d'informations."
}
```

## Variables d'Environnement

L'environnement "Local" contient :

- `base_url` : `http://localhost:3000/api`
- `submission_id` : Automatiquement défini après la création d'une soumission

## Scénarios de Test

La collection inclut des scénarios de test pour :

- Validation des champs requis
- Gestion des erreurs 404
- Gestion des erreurs 400

## Scripts de Test

Certaines requêtes incluent des scripts de test automatiques :

- Sauvegarde automatique de `submission_id` après création
- Vérification des codes de statut HTTP
- Validation des réponses JSON

## Utilisation

1. Lancez le serveur backend : `npm run dev:server`
2. Assurez-vous que MongoDB est en cours d'exécution
3. Dans Postman, exécutez les requêtes dans l'ordre suivant :
   - Health Check pour vérifier la connexion
   - Create Submission pour créer une entrée
   - Get All Submissions pour voir toutes les entrées
   - Get Submission by ID pour récupérer une entrée spécifique
   - Update Submission pour modifier une entrée
   - Delete Submission pour supprimer une entrée

## MongoDB

Assurez-vous que MongoDB est installé et en cours d'exécution :

### Installation MongoDB (Windows)

1. Téléchargez MongoDB Community Server depuis https://www.mongodb.com/try/download/community
2. Installez MongoDB
3. Lancez MongoDB : `mongod`

### MongoDB Atlas (Cloud)

Si vous utilisez MongoDB Atlas, mettez à jour `MONGODB_URI` dans `server/.env` :

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/formulaire-augmente
```

## Dépannage

### Erreur de connexion MongoDB

Si vous obtenez une erreur de connexion :

- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez la variable `MONGODB_URI` dans `server/.env`
- Pour MongoDB local : `mongodb://localhost:27017/formulaire-augmente`

### Port déjà utilisé

Si le port 3000 est déjà utilisé, modifiez `PORT` dans `server/.env`
