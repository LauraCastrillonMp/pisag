import { getKnowledgeSection, getQuizQuestions } from "@/actions/quiz"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { QuizInterface } from "@/components/quiz-interface"

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const section = await getKnowledgeSection(id)

  if (!section) {
    notFound()
  }

  const questions = await getQuizQuestions(id)

  if (questions.length === 0) {
    redirect(`/conocimiento/${id}`)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <QuizInterface section={section} questions={questions} />
}
