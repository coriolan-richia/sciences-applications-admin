"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, CreditCard, Users, ClipboardCheck, LayoutDashboard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Préinscriptions",
    href: "/preinscriptions",
    icon: FileText,
  },
  {
    name: "Paiements",
    href: "/paiements",
    icon: CreditCard,
  },
  {
    name: "Utilisateurs",
    href: "/utilisateurs",
    icon: Users,
  },
  {
    name: "Présélection",
    href: "/preselection",
    icon: ClipboardCheck,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Settings className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Gestion Faculté</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
              AD
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium text-sidebar-foreground">Admin</p>
              <p className="text-xs text-sidebar-foreground/60">admin@faculte.edu</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
