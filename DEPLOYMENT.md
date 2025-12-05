# 🚀 Portail d'Intention NIRD - Guide de Déploiement

## Configuration Vercel

Le projet est entièrement configuré pour Vercel avec :

- **Frontend React** compilé vers `dist/`
- **API Serverless** dans `api/submissions.ts`
- **Détection automatique** de l'environnement (dev/prod)

### Déploiement

1. **Connecter le repository à Vercel :**

   ```bash
   vercel link
   ```

2. **Déployer :**

   ```bash
   vercel deploy --prod
   ```

3. **Ou utiliser GitHub Actions** (recommandé) :
   - Push vers main/master
   - Vercel déploie automatiquement

### Points clés

✅ **Build** : `npm run build` → génère `dist/`  
✅ **Output Directory** : `dist/` (configuré dans vercel.json)  
✅ **API Routes** : `/api/submissions` (serverless)  
✅ **CORS** : Activé pour toutes les origines  
✅ **Erreurs** : Messages clairs et informatifs

### Structure finale

```
formulaire-augmente/
├── dist/                 # Frontend compilé ✓
├── api/
│   └── submissions.ts    # API serverless ✓
├── src/
│   ├── components/
│   │   ├── IntentionForm.tsx     # Formulaire avec IA
│   │   └── ConfirmationPage.tsx  # Page de confirmation
│   ├── lib/
│   │   └── api.ts                # Client API intelligent
│   └── ...
├── vercel.json          # Configuration Vercel
├── vite.config.ts       # Build Vite
└── package.json
```

### Environnements

- **Développement** : `http://localhost:5173` → API `http://localhost:3000/api`
- **Production** : `https://your-domain.vercel.app` → API `/api`

---

**État** : ✅ Prêt pour déploiement
**Année** : 2025
**Initiative** : NIRD (Numérique Indépendant, Responsable et Durable)
