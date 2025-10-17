"use client"

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SaveConditionsButton() {
  const { toast } = useToast()

  const handleSave = () => {
    // Simulation de la sauvegarde
    toast({
      title: "Sauvegarde en cours",
      description: "Les conditions de présélection sont en cours d'enregistrement...",
    })

    setTimeout(() => {
      toast({
        title: "Conditions enregistrées",
        description: "Les conditions de présélection ont été mises à jour avec succès.",
      })
    }, 1500)
  }

  return (
    <Button onClick={handleSave} size="sm" className="gap-2">
      <Save className="h-4 w-4" />
      Enregistrer
    </Button>
  )
}
