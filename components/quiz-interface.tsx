"use client"

import { submitQuizAttempt } from "@/actions/quiz"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { KnowledgeSection, QuizQuestion } from "@/types/database"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Trophy, ArrowRight, ArrowLeft } from "lucide-react"

interface QuizInterfaceProps {
  section: KnowledgeSection
  questions: QuizQuestion[]
}

export function QuizInterface({ section, questions }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let totalScore = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        totalScore += question.points
      }
    })
    setScore(totalScore)
    setShowResults(true)

    // Submit to database
    startTransition(async () => {
      try {
        await submitQuizAttempt(section.id, totalScore, questions.length)
      } catch (error) {
        console.error("Error submitting quiz attempt:", error)
      }
    })
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((score / maxScore) * 100)

    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="glass border-primary/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Trophy className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-2">Test Completado</CardTitle>
                <p className="text-muted-foreground">{section.title}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">
                    {score} / {maxScore}
                  </div>
                  <p className="text-xl text-muted-foreground">{percentage}% de respuestas correctas</p>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const isCorrect = selectedAnswers[index] === question.correct_answer
                    return (
                      <Card key={question.id} className="bg-background/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium mb-2">{question.question}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Tu respuesta: {question.options[selectedAnswers[index] ?? 0]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-green-400 mb-2">
                                  Respuesta correcta: {question.options[question.correct_answer]}
                                </p>
                              )}
                              {question.explanation && (
                                <p className="text-sm text-muted-foreground italic">{question.explanation}</p>
                              )}
                            </div>
                            <Badge variant="secondary" className={isCorrect ? "bg-green-500/20" : "bg-red-500/20"}>
                              {isCorrect ? `+${question.points}` : "0"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleRetry} variant="outline" className="flex-1 bg-transparent">
                    Intentar de Nuevo
                  </Button>
                  <Button onClick={() => router.push("/conocimiento")} className="flex-1">
                    Ver Ranking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="glass border-primary/20 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{section.title}</Badge>
                <Badge variant="outline">{currentQuestion.points} puntos</Badge>
              </div>
              <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? "border-blue-600 bg-blue-600"
                            : "border-slate-300"
                        }`}
                      >
                        {selectedAnswers[currentQuestionIndex] === index && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswers.some((a) => a === null) || isPending}
                className="flex-1"
              >
                {isPending ? "Enviando..." : "Finalizar Test"}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === null} className="flex-1">
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
