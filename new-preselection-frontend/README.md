# Système de Gestion de Préinscription Universitaire

Application Next.js pour la gestion des préinscriptions et de la présélection des étudiants dans une faculté universitaire.

## Fonctionnalités

### Modules principaux
- **Préinscriptions** : Gestion des candidatures
- **Paiements** : Suivi des paiements
- **Utilisateurs** : Gestion des administrateurs
- **Présélection** : Module de sélection des candidats

### Module de Présélection

#### 1. Résultats globaux
- Vue synthétique de tous les parcours
- Statistiques générales (candidatures, sélectionnés, taux)
- Export PDF global et par parcours

#### 2. Visualisation par parcours
- Liste détaillée des candidatures
- Filtres avancés (statut, recherche, tri)
- Vue liste et vue cartes
- Statistiques détaillées
- Export PDF des résultats

#### 3. Gestion des conditions
- **Mention au bac** : Tri décroissant avec mention minimale optionnelle
- **Série au bac** : Priorité et égalité entre séries
- **Notes par matière** : Priorité, égalité et notes minimales

#### 4. Administration
- Vue d'ensemble de toutes les configurations
- Réinitialisation globale ou par parcours
- Visualisation récapitulative

## Structure du projet

\`\`\`
app/
├── page.tsx                          # Tableau de bord
├── preselection/
│   ├── page.tsx                      # Résultats globaux
│   ├── parcours/[id]/page.tsx        # Détails par parcours
│   ├── conditions/[id]/page.tsx      # Configuration des conditions
│   └── admin/page.tsx                # Administration
components/
├── app-sidebar.tsx                   # Navigation principale
├── preselection/
│   ├── candidatures-list.tsx         # Liste des candidatures
│   ├── candidatures-cards.tsx        # Vue cartes
│   ├── candidatures-filters.tsx      # Filtres
│   ├── candidatures-stats.tsx        # Statistiques
│   ├── view-toggle.tsx               # Toggle liste/cartes
│   └── conditions/
│       ├── mention-criteria.tsx      # Critère mention
│       ├── serie-criteria.tsx        # Critère série
│       └── matiere-criteria.tsx      # Critère matières
lib/
├── types.ts                          # Types TypeScript
├── data/mock-data.ts                 # Données de test
└── utils/preselection.ts             # Logique de présélection
\`\`\`

## Technologies

- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS v4** pour le styling
- **shadcn/ui** pour les composants
- **Radix UI** pour les primitives accessibles

## Démarrage

\`\`\`bash
npm install
npm run dev
\`\`\`

L'application sera accessible sur `http://localhost:3000`

## Navigation

- `/` : Tableau de bord
- `/preselection` : Résultats globaux
- `/preselection/parcours/[id]` : Détails d'un parcours
- `/preselection/conditions/[id]` : Configuration des conditions
- `/preselection/admin` : Administration

## Fonctionnalités à venir

- Intégration base de données
- Authentification et autorisation
- Export PDF réel
- Notifications email
- Historique des modifications
- Validation des données
