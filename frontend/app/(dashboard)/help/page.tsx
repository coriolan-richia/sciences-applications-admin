import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  BookOpen,
  FileText,
  Users,
  ClipboardCheck,
  CreditCard,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function AidePage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <PageHeader
        title="Centre d'aide"
        description="Trouvez des réponses à vos questions sur l'utilisation du système de
          gestion"
        action={<HelpCircle className="h-8 w-8 text-primary" />}
      />

      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Guide rapide */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Guide de démarrage rapide
              </CardTitle>
              <CardDescription>
                Apprenez les bases pour utiliser efficacement le système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-lg font-semibold">
                    Connexion au système
                  </h3>
                </div>
                <p className="ml-11 text-sm text-muted-foreground">
                  Utilisez vos identifiants fournis par l'administration pour
                  vous connecter. En cas d'oubli de mot de passe, contactez
                  l'administrateur système.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-lg font-semibold">
                    Navigation dans l'interface
                  </h3>
                </div>
                <p className="ml-11 text-sm text-muted-foreground">
                  Utilisez le menu de navigation à gauche pour accéder aux
                  différents modules : Tableau de bord, Préinscriptions,
                  Paiements, Utilisateurs et Présélection. Chaque module dispose
                  de ses propres fonctionnalités.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-lg font-semibold">
                    Gestion de la présélection
                  </h3>
                </div>
                <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                  <p>
                    Le module de présélection est le cœur du système. Voici
                    comment l'utiliser :
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>
                      <strong>Résultats globaux :</strong> Vue d'ensemble de
                      tous les parcours avec statistiques et exports
                    </li>
                    <li>
                      <strong>Visualisation par parcours :</strong> Détails des
                      candidatures avec filtres et recherche
                    </li>
                    <li>
                      <strong>Gestion des conditions :</strong> Configuration
                      des critères de sélection (mention, série, notes)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </div>
                  <h3 className="text-lg font-semibold">
                    Configuration des critères
                  </h3>
                </div>
                <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                  <p>
                    Pour chaque parcours, vous pouvez configurer trois niveaux
                    de critères :
                  </p>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>
                      <strong>Mention au bac :</strong> Définissez une mention
                      minimale requise. Le tri se fait automatiquement par ordre
                      décroissant (Très Bien → Bien → Assez Bien → Passable).
                    </li>
                    <li>
                      <strong>Série au bac :</strong> Ajoutez les séries
                      acceptées et définissez leur ordre de priorité. Vous
                      pouvez mettre plusieurs séries à égalité de priorité.
                    </li>
                    <li>
                      <strong>Notes par matière :</strong> Sélectionnez les
                      matières importantes, définissez leur priorité et
                      optionnellement une note minimale requise.
                    </li>
                  </ol>
                </div>
              </div>

              {/* Step 5 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    5
                  </div>
                  <h3 className="text-lg font-semibold">
                    Filtrage et recherche
                  </h3>
                </div>
                <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                  <p>
                    Utilisez les outils de filtrage pour trouver rapidement les
                    informations :
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Barre de recherche pour trouver un candidat par nom</li>
                    <li>
                      Filtres par statut (sélectionné, liste d'attente, non
                      sélectionné, non traité)
                    </li>
                    <li>Tri par nom, date ou score</li>
                    <li>Basculer entre vue liste et vue cartes</li>
                    <li>Pagination pour naviguer dans les grandes listes</li>
                  </ul>
                </div>
              </div>

              {/* Step 6 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    6
                  </div>
                  <h3 className="text-lg font-semibold">Exports et rapports</h3>
                </div>
                <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                  <p>
                    Générez des rapports PDF pour vos besoins administratifs :
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>
                      Export global de tous les résultats depuis la page
                      principale
                    </li>
                    <li>Export par parcours avec détails des candidatures</li>
                    <li>
                      Les exports incluent les statistiques et la liste complète
                      des candidats
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 7 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    7
                  </div>
                  <h3 className="text-lg font-semibold">
                    Personnalisation de l'interface
                  </h3>
                </div>
                <p className="ml-11 text-sm text-muted-foreground">
                  Changez le thème de l'interface (clair/sombre/système) en
                  utilisant les boutons en bas de la barre de navigation. Vos
                  préférences sont sauvegardées automatiquement.
                </p>
              </div>

              <div className="ml-11 mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  💡 Astuce : Utilisez les accordéons dans la page des résultats
                  globaux pour charger les données uniquement quand vous en avez
                  besoin, ce qui améliore les performances.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modules détaillés */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Modules du système</CardTitle>
              <CardDescription>
                Description détaillée de chaque module
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Préinscriptions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gérez l'ensemble des dossiers de candidature. Consultez les
                    informations des candidats, validez les documents fournis et
                    suivez l'avancement du processus d'inscription.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Présélection</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Module principal pour la gestion des critères de sélection
                    et la visualisation des résultats. Configurez les conditions
                    d'admission par parcours et consultez les statistiques
                    détaillées.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Paiements</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Suivez les paiements des frais de préinscription. Validez
                    les transactions, générez des reçus et consultez
                    l'historique des paiements.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">Utilisateurs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gérez les comptes administrateurs du système. Créez de
                    nouveaux utilisateurs, attribuez des rôles et permissions,
                    et suivez l'activité des administrateurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
              <CardDescription>
                Réponses aux questions les plus courantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Comment configurer les critères de présélection ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Pour configurer les critères de présélection :
                    </p>
                    <ol className="list-decimal space-y-1 pl-5 text-sm">
                      <li>Accédez au module "Présélection"</li>
                      <li>Cliquez sur "Gestion des conditions" dans le menu</li>
                      <li>Sélectionnez le parcours concerné</li>
                      <li>
                        Configurez les critères : mention au bac, série et notes
                        par matière
                      </li>
                      <li>Définissez les priorités et les notes minimales</li>
                      <li>Enregistrez vos modifications</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Comment exporter les résultats en PDF ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Pour exporter les résultats :</p>
                    <ol className="list-decimal space-y-1 pl-5 text-sm">
                      <li>
                        Accédez à la page des résultats globaux ou d'un parcours
                        spécifique
                      </li>
                      <li>Cliquez sur le bouton "Exporter en PDF"</li>
                      <li>
                        Le fichier PDF sera généré et téléchargé automatiquement
                      </li>
                      <li>
                        Vous pouvez également exporter tous les résultats en une
                        fois depuis la page principale
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Comment filtrer les candidatures ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Plusieurs options de filtrage sont disponibles :
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>
                        Utilisez la barre de recherche pour trouver un candidat
                        par nom
                      </li>
                      <li>
                        Filtrez par statut : sélectionné, liste d'attente, non
                        sélectionné, non traité
                      </li>
                      <li>Triez par nom, date d'inscription ou score</li>
                      <li>
                        Basculez entre la vue liste et la vue cartes selon vos
                        préférences
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Que signifient les différents statuts ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Sélectionné :</strong> Le candidat a été accepté
                        dans le parcours
                      </li>
                      <li>
                        <strong>Liste d'attente :</strong> Le candidat est en
                        attente d'une place disponible
                      </li>
                      <li>
                        <strong>Non sélectionné :</strong> Le candidat n'a pas
                        été retenu
                      </li>
                      <li>
                        <strong>Non traité :</strong> La candidature n'a pas
                        encore été évaluée
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Comment fonctionne le système de priorité ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Le système de présélection utilise trois niveaux de
                      critères par ordre de priorité :
                    </p>
                    <ol className="list-decimal space-y-2 pl-5 text-sm">
                      <li>
                        <strong>Mention au bac :</strong> Tri décroissant (Très
                        Bien &gt; Bien &gt; Assez Bien &gt; Passable)
                      </li>
                      <li>
                        <strong>Série au bac :</strong> Priorité configurable
                        entre les séries acceptées
                      </li>
                      <li>
                        <strong>Notes par matière :</strong> Priorité
                        configurable entre les matières avec notes minimales
                        optionnelles
                      </li>
                    </ol>
                    <p className="mt-2 text-sm">
                      Les candidats sont classés selon ces critères dans
                      l'ordre, et les places sont attribuées jusqu'à atteindre
                      la capacité maximale du parcours.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Comment changer le thème de l'interface ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Pour changer le thème :</p>
                    <ol className="list-decimal space-y-1 pl-5 text-sm">
                      <li>
                        Regardez en bas de la barre de navigation à gauche
                      </li>
                      <li>
                        Vous verrez trois boutons : Soleil (clair), Lune
                        (sombre), Écran (système)
                      </li>
                      <li>
                        Cliquez sur le bouton correspondant au thème souhaité
                      </li>
                      <li>Le thème sera appliqué immédiatement</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Besoin d'aide supplémentaire ?</CardTitle>
              <CardDescription>
                Contactez l'équipe de support technique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email :</strong> support@faculte-sciences.edu
                </p>
                <p>
                  <strong>Téléphone :</strong> +261 20 XX XXX XX
                </p>
                <p>
                  <strong>Horaires :</strong> Lundi - Vendredi, 8h00 - 17h00
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
