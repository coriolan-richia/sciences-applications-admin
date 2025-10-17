"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { List, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

export function ViewToggle() {
  const [view, setView] = useState<"list" | "grid">("list")

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setView("list")}
        className={cn("h-8 px-3", view === "list" && "bg-accent text-accent-foreground")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setView("grid")}
        className={cn("h-8 px-3", view === "grid" && "bg-accent text-accent-foreground")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  )
}
