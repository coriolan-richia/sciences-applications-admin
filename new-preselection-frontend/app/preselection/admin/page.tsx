import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { parcours, conditionsPreselection } from "@/lib/data/mock-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminConditionsPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Administration des conditions</h1>
              <p className="mt-2 text-muted-foreground">Vue d'ensemble des conditions de présélection par parcours</p>
            </div>
          </div>

          {/* Alert de danger */}
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Zone d'administration</AlertTitle>
            <AlertDescription>
              Les actions de réinitialisation sont irréversibles. Assurez-vous de bien comprendre les conséquences avant
              de procéder.
            </AlertDescription>
          </Alert>

          {/* Actions globales */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Actions globales</CardTitle>
              <CardDescription>
                Réinitialisation des paramètres pour tous les parcours ou un parcours spécifique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                <div>
                  <h3 className="font-medium text-foreground">Réinitialiser tous les parcours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Supprime toutes les conditions configurées pour tous les parcours
                  </p>
                </div>
                <Button variant="destructive">Réinitialiser tout</Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des parcours avec overview */}
          <div className="space-y-4">
            {parcours.map((p) => {
              const conditions = conditionsPreselection[p.id]
              const hasConditions = !!conditions

              return (
                <Card key={p.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <CardTitle>{p.nom}</CardTitle>
                          <Badge variant="outline">{p.code}</Badge>
                          {hasConditions ? (
                            <Badge className="bg-chart-3 text-white">Configuré</Badge>
                          ) : (
                            <Badge variant="secondary">Non configuré</Badge>
                          )}
                        </div>
                        <CardDescription className="mt-2">{p.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/preselection/conditions/${p.id}`}>
                            <Settings className="mr-2 h-4 w-4" />
                            Configurer
                          </Link>
                        </Button>
                        {hasConditions && (
                          <Button variant="outline" size="sm">
                            Réinitialiser
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {hasConditions && (
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        {/* Mention */}
                        <div className="rounded-lg border border-border bg-muted/30 p-3">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">MENTION AU BAC</p>
                          {conditions.mentionMinimale ? (
                            <Badge variant="outline">{conditions.mentionMinimale}</Badge>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucune mention minimale</p>
                          )}
                        </div>

                        {/* Séries */}
                        <div className="rounded-lg border border-border bg-muted/30 p-3">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">SÉRIES ACCEPTÉES</p>
                          {conditions.series.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {conditions.series.map((s) => (
                                <Badge key={s.id} variant="outline" className="text-xs">
                                  {s.serie}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Toutes les séries</p>
                          )}
                        </div>

                        {/* Matières */}
                        <div className="rounded-lg border border-border bg-muted/30 p-3">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">MATIÈRES CONSIDÉRÉES</p>
                          {conditions.matieres.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {conditions.matieres.slice(0, 3).map((m) => (
                                <Badge key={m.id} variant="outline" className="text-xs">
                                  {m.matiere}
                                </Badge>
                              ))}
                              {conditions.matieres.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{conditions.matieres.length - 3}
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucune matière</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
