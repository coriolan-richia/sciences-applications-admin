"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportButtonProps {
  parcoursNom?: string
  type?: "global" | "parcours"
}

export function ExportButton({ parcoursNom, type = "parcours" }: ExportButtonProps) {
  const { toast } = useToast()

  const handleExport = () => {
    // Simulation de l'export
    toast({
      title: "Export en cours",
      description:
        type === "global"
          ? "L'export de tous les résultats est en cours de génération..."
          : `L'export des résultats pour ${parcoursNom} est en cours...`,
    })

    // Simulation d'un délai
    setTimeout(() => {
      toast({
        title: "Export réussi",
        description: "Le fichier PDF a été généré avec succès.",
      })
    }, 2000)
  }

  return (
    <Button onClick={handleExport} size="sm" className="gap-2">
      <Download className="h-4 w-4" />
      Exporter PDF
    </Button>
  )
}
