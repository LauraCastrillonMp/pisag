"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function EditarSeccionQuiz() {
  const { sectionId } = useParams() as { sectionId: string };
  const router = useRouter();
  const [section, setSection] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|undefined>(undefined);

  useEffect(() => {
    fetch(`/api/quizzes/sections/${sectionId}`)
      .then((r) => r.json())
      .then((data) => setSection(data.data))
      .catch(() => setError("No se pudo cargar la sección."))
      .finally(() => setLoading(false));
  }, [sectionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setSection((r: any) => ({ ...r, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    const resp = await fetch(`/api/quizzes/sections/${sectionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    });
    setLoading(false);
    if (resp.ok) {
      toast({ title: "Sección actualizada", description: "Los cambios han sido guardados.", variant: "success" });
      router.push("/admin/quizzes");
    } else {
      const data = await resp.json();
      setError(data.error || "Error al guardar.");
    }
  };

  if (loading) return <div className="p-10">Cargando...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto max-w-xl py-10">
      <Card className="p-6">
        <h2 className="font-bold text-2xl mb-4">Editar Sección de Quiz</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">Título</label>
            <Input name="title" value={section.title || ''} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-semibold">Descripción</label>
            <Textarea name="description" value={section.description || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Dificultad</label>
            <select name="difficulty" value={section.difficulty || 'facil'} onChange={handleChange} required className="w-full border rounded-md p-2">
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-2 mt-6">
            <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

