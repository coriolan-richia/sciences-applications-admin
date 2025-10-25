import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info, Users, Code, Mail, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export default function AProposPage() {
  const developers = [
    {
      name: "Jean Rakoto",
      role: "Lead Developer",
      email: "jean.rakoto@faculte.edu",
      github: "jeanrakoto",
      linkedin: "jeanrakoto",
      avatar: "/images/developer-1.jpg",
    },
    {
      name: "Marie Rasoamalala",
      role: "Frontend Developer",
      email: "marie.rasoamalala@faculte.edu",
      github: "marierasoa",
      linkedin: "marierasoamalala",
      avatar: "/images/developer-2.jpg",
    },
    {
      name: "Paul Andriamihaja",
      role: "Backend Developer",
      email: "paul.andriamihaja@faculte.edu",
      github: "paulandria",
      linkedin: "paulandriamihaja",
      avatar: "/images/developer-3.jpg",
    },
  ];

  const technologies = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Radix UI",
    "Supabase",
    "Vercel",
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <PageHeader
        title="À propos"
        description="Informations sur le système et l'équipe de développement"
        action={<Info className="h-8 w-8 text-primary" />}
      />

      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* À propos du projet */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/fs.jpg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div>
                  <CardTitle>Système de Gestion Administrative</CardTitle>
                  <CardDescription>
                    Faculté des Sciences - Université
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ce système a été développé dans le cadre d'un projet
                  universitaire pour moderniser et automatiser la gestion des
                  dossiers de préinscription et le processus de présélection des
                  candidats à la Faculté des Sciences.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  L'application permet aux administrateurs de gérer efficacement
                  les candidatures, de configurer des critères de présélection
                  personnalisés par parcours, et de visualiser les résultats de
                  manière claire et intuitive.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Version 1.0.0</Badge>
                  <Badge variant="outline">2025</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technologies utilisées
              </CardTitle>
              <CardDescription>
                Stack technique moderne et performante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Équipe de développement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Équipe de développement
              </CardTitle>
              <CardDescription>
                Les développeurs derrière ce projet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {developers.map((dev) => (
                  <div
                    key={dev.name}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full">
                        <Image
                          src={dev.avatar || "/placeholder.svg"}
                          alt={dev.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground">
                        {dev.name}
                      </h3>
                      <p className="text-sm text-primary">{dev.role}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <a
                        href={`mailto:${dev.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{dev.email}</span>
                      </a>
                      <a
                        href={`https://github.com/${dev.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                        <span>@{dev.github}</span>
                      </a>
                      <a
                        href={`https://linkedin.com/in/${dev.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>@{dev.linkedin}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Faculté des Sciences. Tous droits réservés.</p>
            <p className="mt-1">Développé avec ❤️ pour l'éducation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
