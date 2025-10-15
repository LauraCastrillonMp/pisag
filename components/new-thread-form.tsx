"use client"

import type React from "react"

import { createForumThread } from "@/actions/forum"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export function NewThreadForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const threadId = await createForumThread(formData)
        router.push(`/foros/${threadId}`)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear el tema")
      }
    })
  }

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle>Detalles del Tema</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="¿Cuál es tu pregunta o tema de discusión?"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select name="category" required>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="astrophotography">Astrofotografía</SelectItem>
                <SelectItem value="missions">Misiones</SelectItem>
                <SelectItem value="news">Noticias</SelectItem>
                <SelectItem value="equipment">Equipamiento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Describe tu tema en detalle..."
              required
              rows={8}
              className="bg-background/50 resize-none"
            />
          </div>

          {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Creando..." : "Crear Tema"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
