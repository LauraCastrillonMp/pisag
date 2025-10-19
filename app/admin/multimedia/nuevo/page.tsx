"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function NuevoMultimedia() {
  const router = useRouter();
  const [resource, setResource] = useState({
    title: "",
    description: "",
    type: "image",
    url: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setResource(r => ({ ...r, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    const resp = await fetch("/api/multimedia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    });
    setLoading(false);
    if (resp.ok) {
      toast({ title: "Recurso añadido", description: "El recurso multimedia se creó correctamente.", variant: "success" });
      router.push("/admin/multimedia");
    } else {
      const data = await resp.json();
      setError(data.error || "Error al crear.");
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-10">
      <Card className="p-6">
        <h2 className="font-bold text-2xl mb-4">Agregar Nuevo Multimedia</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">Título</label>
            <Input name="title" value={resource.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="font-semibold">Descripción</label>
            <Textarea name="description" value={resource.description} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Tipo</label>
            <select name="type" value={resource.type} onChange={handleChange} required className="w-full border rounded-md p-2">
              <option value="image">Imagen</option>
              <option value="video">Video</option>
              <option value="livestream">En Vivo</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">URL</label>
            <Input name="url" value={resource.url} onChange={handleChange} required type="url" />
          </div>
          <div>
            <label className="font-semibold">Categoría</label>
            <Input name="category" value={resource.category} onChange={handleChange} />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-2 mt-6">
            <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Agregar"}</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
