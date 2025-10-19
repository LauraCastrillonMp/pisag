"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface MultimediaResource {
  id: string;
  title: string;
  description?: string;
  type: string;
  url: string;
  category?: string;
}

export default function EditarMultimedia() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<Partial<MultimediaResource>>({});
  const [error, setError] = useState<string|undefined>(undefined);

  useEffect(() => {
    fetch(`/api/multimedia/${id}`)
      .then(r => r.json())
      .then(data => setResource(data.data))
      .catch(() => setError("No se pudo cargar el recurso."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setResource(r => ({ ...r, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const resp = await fetch(`/api/multimedia/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    });
    setLoading(false);
    if (resp.ok) router.push("/admin/multimedia");
    else setError("Error al guardar.");
  };

  if (loading) return <div className="p-10">Cargando...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto max-w-xl py-10">
      <Card className="p-6">
        <h2 className="font-bold text-2xl mb-4">Editar Multimedia</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">Título</label>
            <Input name="title" value={resource.title || ''} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-semibold">Descripción</label>
            <Textarea name="description" value={resource.description || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Tipo</label>
            <Input name="type" value={resource.type || ''} onChange={handleChange} disabled />
          </div>
          <div>
            <label className="font-semibold">URL</label>
            <Input name="url" value={resource.url || ''} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-semibold">Categoría</label>
            <Input name="category" value={resource.category || ''} onChange={handleChange} />
          </div>

          <div className="flex gap-2 mt-6">
            <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
