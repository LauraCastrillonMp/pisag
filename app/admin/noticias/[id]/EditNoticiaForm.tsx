"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateNewsArticle } from "@/actions/news";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"

export default function EditNoticiaForm({
  noticia,
}: {
  noticia: {
    id: string;
    title: string;
    content: string;
    category: string;
    image_url?: string;
  };
}) {
  const [title, setTitle] = useState(noticia.title || "");
  const [content, setContent] = useState(noticia.content || "");
  const [category, setCategory] = useState(noticia.category || "");
  const [imageUrl, setImageUrl] = useState(noticia.image_url || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Helper to map Spanish category labels to backend keys
  const CATEGORY_MAP = {
    misiones: "missions",
    descubrimientos: "discoveries",
    eventos: "celestial_events",
    tecnologia: "technology",
    investigacion: "research",
  }
  const CATEGORY_LABELS = [
    { label: "Misiones", value: "missions" },
    { label: "Descubrimientos", value: "discoveries" },
    { label: "Eventos Celestes", value: "celestial_events" },
    { label: "Tecnología", value: "technology" },
    { label: "Investigación", value: "research" },
  ]

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updated = await updateNewsArticle(noticia.id, {
      title, content, category, image_url: imageUrl
    });
    setLoading(false);
    if (updated) {
      toast({ title: "Noticia actualizada", description: "La noticia se guardó correctamente.", variant: "success" });
      router.push("/admin/noticias");
    } else {
      toast({ title: "Error", description: "Error al actualizar la noticia.", variant: "destructive" });
    }
  };

  return (
    <form
      className="container mx-auto px-4 py-6"
      onSubmit={handleUpdate}
    >
      <h1 className="text-2xl font-bold mb-4">Editar Noticia</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select
            name="category"
            value={category}
            onValueChange={value => setCategory(value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_LABELS.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="imageUrl">URL de Imagen</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            type="url"
          />
        </div>
        <div>
          <Label htmlFor="content">Contenido</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenido"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</Button>
      </div>
    </form>
  );
}