"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createNewsArticle } from "@/actions/admin"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const CATEGORY_LABELS = [
  { label: "Misiones", value: "missions" },
  { label: "Descubrimientos", value: "discoveries" },
  { label: "Eventos Celestes", value: "celestial_events" },
  { label: "Tecnología", value: "technology" },
  { label: "Investigación", value: "research" },
]

export default function NewNewsForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Use the action to create the news article
      await createNewsArticle(new FormData(e.target as HTMLFormElement))

      toast({ title: "Noticia publicada", description: "La noticia se ha publicado correctamente.", variant: "success" })
      router.push("/admin/noticias")

      


      // const res = await fetch("/api/admin/noticias", {
      //   method: "POST",
      //   body: JSON.stringify({ title, category, imageUrl, content }),
      //   headers: { "Content-Type": "application/json" },
      // })
      // if (res.ok) {
      //   toast({ title: "Noticia publicada", description: "La noticia se ha publicado correctamente.", variant: "success" })
      //   router.push("/admin/noticias")
      // } else {
      //   toast({ title: "Error", description: "No se pudo publicar la noticia.", variant: "destructive" })
      // }
    } catch {
      toast({ title: "Error", description: "No se pudo publicar la noticia.", variant: "destructive" })
    }
    setLoading(false)
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" required placeholder="Título de la noticia" className="bg-background/50" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select name="category" required value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_LABELS.map(cat => (
                <SelectItem value={cat.value} key={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL de Imagen</Label>
          <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg" className="bg-background/50" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Contenido</Label>
          <Textarea id="content" name="content" required rows={12} placeholder="Escribe el contenido de la noticia..." className="bg-background/50" value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" disabled={loading}>
          {loading ? "Publicando..." : "Publicar Noticia"}
        </Button>
      </form>
    </Card>
  )
}
