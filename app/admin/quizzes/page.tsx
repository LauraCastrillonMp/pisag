import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Brain } from "lucide-react"
import { deleteQuizSection } from "@/actions/admin"

async function getQuizSections() {
  const supabase = await createServerClient()

  const { data: sections } = await supabase
    .from("knowledge_sections")
    .select("*, quiz_questions(count)")
    .order("created_at", { ascending: false })

  return sections || []
}

export default async function AdminQuizzesPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const sections = await getQuizSections()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 hover:bg-primary/10">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Panel
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-balance text-foreground">
                Gestión de Quizzes
              </h1>
              <p className="text-muted-foreground mt-2">Administra secciones de conocimiento y preguntas</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/admin/quizzes/nueva-seccion">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Sección
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {section.quiz_questions?.[0]?.count || 0} Preguntas
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        section.difficulty === "facil"
                          ? "border-green-500/50 text-green-400"
                          : section.difficulty === "medio"
                            ? "border-yellow-500/50 text-yellow-400"
                            : "border-red-500/50 text-red-400"
                      }
                    >
                      {section.difficulty === "facil" ? "Fácil" : section.difficulty === "medio" ? "Medio" : "Difícil"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
                    <Link href={`/admin/quizzes/${section.id}/preguntas`}>Ver Preguntas</Link>
                  </Button>
                  <Button asChild variant="secondary" size="sm" className="hover:bg-accent/10 bg-transparent">
                    <Link href={`/admin/quizzes/editar/${section.id}`}>Editar</Link>
                  </Button>
                  <form action={deleteQuizSection.bind(null, section.id)}>
                    <Button type="submit" variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
