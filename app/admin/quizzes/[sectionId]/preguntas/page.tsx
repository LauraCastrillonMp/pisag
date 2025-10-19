"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, Plus, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  points: number;
}

export default function PreguntasPage() {
  const { sectionId } = useParams() as { sectionId: string };
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string|null>(null);

  // Fetch all questions for this section
  useEffect(() => {
    setLoading(true);
    fetch(`/api/quizzes/questions?section_id=${sectionId}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.data || []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [sectionId]);

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/quizzes/questions/${deleteId}`, { method: "DELETE" });
    setQuestions((qs) => qs.filter((q) => q.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Preguntas del Quiz</h1>
        <Button asChild>
          <Link href={`/admin/quizzes/${sectionId}/preguntas/nueva`}>
            <Plus className="h-4 w-4 mr-2" /> Añadir Pregunta
          </Link>
        </Button>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="space-y-4">
          {questions.length === 0 && <div>No hay preguntas aún.</div>}
          {questions.map((q) => (
            <Card key={q.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">{q.question}</div>
                  <div className="text-muted-foreground text-sm mt-1 mb-2">
                    <span>Puntos: {q.points}</span>
                  </div>
                  <ul className="list-disc ml-5 mb-2">
                    {q.options.map((opt, i) => (
                      <li key={i} className={i === q.correct_answer ? "font-bold text-primary" : ""}>
                        {opt}
                        {i === q.correct_answer && " (Correcta)"}
                      </li>
                    ))}
                  </ul>
                  {q.explanation && (
                    <div className="text-xs text-muted-foreground">Explicación: {q.explanation}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/quizzes/${sectionId}/preguntas/editar/${q.id}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(q.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>¿Eliminar esta pregunta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará definitivamente la pregunta del quiz.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleteId !== q.id}
                          >
                            Eliminar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
