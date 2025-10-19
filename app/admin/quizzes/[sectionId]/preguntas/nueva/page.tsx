"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  points: number;
}

export default function NuevaPregunta() {
  const { sectionId } = useParams() as { sectionId: string };
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<QuizQuestion>({
    defaultValues: { options: ["", "", "", ""] },
  });

  const options = watch("options");

  async function onSubmit(values: QuizQuestion) {
    const resp = await fetch("/api/quizzes/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, section_id: sectionId }),
    });
    if (resp.ok) {
      reset();
      router.push(`/admin/quizzes/${sectionId}/preguntas`);
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-10">
      <Card className="p-6">
        <h2 className="font-bold text-2xl mb-4">Nueva Pregunta</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="font-semibold">Pregunta</label>
            <Input {...register("question", { required: true })} />
            {errors.question && <span className="text-xs text-red-500">Obligatoria</span>}
          </div>

          <div>
            <label className="font-semibold">Opciones</label>
            {[0, 1, 2, 3].map((idx) => (
              <Input
                key={idx}
                value={options[idx]}
                onChange={e => {
                  const opts = [...options];
                  opts[idx] = e.target.value;
                  setValue("options", opts);
                }}
                placeholder={`Opción ${idx + 1}`}
                className="mb-1"
                required
              />
            ))}
          </div>

          <div>
            <label className="font-semibold">Respuesta Correcta</label>
            <select {...register("correct_answer", { valueAsNumber: true, validate: v => v >= 0 && v < 4 })} className="w-full border rounded-md p-2">
              {[0,1,2,3].map((idx) => (
                <option key={idx} value={idx}>{`Opción ${idx + 1}`}</option>
              ))}
            </select>
            {errors.correct_answer && <span className="text-xs text-red-500">Debe ser una opción válida</span>}
          </div>

          <div>
            <label className="font-semibold">Puntos</label>
            <Input type="number" min={1} {...register("points", { valueAsNumber: true, required: true })} />
            {errors.points && <span className="text-xs text-red-500">Indica los puntos</span>}
          </div>

          <div>
            <label className="font-semibold">Explicación (opcional)</label>
            <Textarea {...register("explanation")} />
          </div>

          <div className="flex gap-2 mt-6">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar"}</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

