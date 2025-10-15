"use client"

import type React from "react"

import { createForumPost } from "@/actions/forum"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

interface ReplyFormProps {
  threadId: string
}

export function ReplyForm({ threadId }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        await createForumPost(threadId, content)
        setContent("")
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al publicar la respuesta")
      }
    })
  }

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle>Responder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Escribe tu respuesta..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="bg-background/50 resize-none"
            required
          />
          {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>}
          <Button type="submit" disabled={isPending || !content.trim()}>
            {isPending ? "Publicando..." : "Publicar Respuesta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
