"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  CreditCard,
  CheckSquare,
  LogOut,
  Shield,
  LayoutDashboard,
  HelpCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Préinscriptions",
    href: "/preregistrations",
    icon: FileText,
  },
  {
    name: "Paiements",
    href: "/payments",
    icon: CreditCard,
  },
  {
    name: "Présélection",
    href: "/preselection",
    icon: CheckSquare,
  },
  {
    name: "Gestion des utilisateurs",
    href: "/admin/users",
    icon: Shield,
    role: "superadmin",
  },
  {
    name: "Aide",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "À propos",
    href: "/about",
    icon: Info,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo/Header */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        {/* <GraduationCap className="h-6 w-6 text-primary" /> */}
        <span className="text-lg font-semibold text-foreground">
          Gestion des Candidatures
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            ((user?.nomRole === "superadmin" && item.role === "superadmin") ||
              item.role === undefined) && (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="space-y-3">
          <div className="flex flex-row gap-2 items-center h-min">
            <div className="h-12 aspect-square">
              <img src="images/fs.jpg" />
            </div>
            <div className="flex-1 text-xs">
              <p className="text-sm font-medium text-foreground">
                {user?.identifiant}
              </p>
              {/* <p className="text-muted-foreground">{user?.email}</p> */}
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {user?.nomRole}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}
