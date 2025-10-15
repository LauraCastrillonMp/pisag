import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { KnowledgeSection } from "@/types/database"
import Link from "next/link"
import { BookOpen, Trophy } from "lucide-react"

interface SectionCardProps {
  section: KnowledgeSection & { questions: { count: number }[] }
}

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

export function SectionCard({ section }: SectionCardProps) {
  const questionCount = section.questions[0]?.count || 0

  return (
    <Link href={`/conocimiento/${section.id}`}>
      <Card className="glass border-primary/20 card-hover h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="text-4xl">{section.icon || "📚"}</div>
            {section.difficulty && (
              <Badge className={difficultyColors[section.difficulty]}>{difficultyLabels[section.difficulty]}</Badge>
            )}
          </div>
          <CardTitle className="text-xl">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-4">{section.description}</CardDescription>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {questionCount} {questionCount === 1 ? "pregunta" : "preguntas"}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              {questionCount * 10} puntos
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
