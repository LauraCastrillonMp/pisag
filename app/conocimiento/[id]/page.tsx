import { getKnowledgeSection, getQuizQuestions, getUserQuizAttempts } from "@/actions/quiz"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, Trophy, Play } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/utils/format"

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
}

const difficultyLabels = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
}

export default async function SeccionConocimientoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const section = await getKnowledgeSection(id)

  if (!section) {
    notFound()
  }

  const questions = await getQuizQuestions(id)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const attempts = await getUserQuizAttempts(id)

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/conocimiento">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Conocimiento
          </Link>
        </Button>
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl">{section.icon || "📚"}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {section.difficulty && (
                  <Badge className={difficultyColors[section.difficulty]}>{difficultyLabels[section.difficulty]}</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{section.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {questions.reduce((sum, q) => sum + q.points, 0)} puntos máximos
                </span>
              </div>

              <div className="flex gap-4">
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/conocimiento/${id}/contenido`}>
                    <BookOpen className="h-5 w-5 mr-2" />
                    Ver Contenido
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href={`/conocimiento/${id}/quiz`}>
                    <Play className="h-5 w-5 mr-2" />
                    Comenzar Test
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Previous Attempts */}
          {attempts.length > 0 && (
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle>Tus Intentos Anteriores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attempts.slice(0, 5).map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div>
                        <p className="font-medium">
                          {attempt.score} / {attempt.total_questions * 10} puntos
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDate(attempt.completed_at)}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          (attempt.score / (attempt.total_questions * 10)) * 100 >= 70
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {Math.round((attempt.score / (attempt.total_questions * 10)) * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
