"use client"

import { toggleFavoriteMultimedia } from "@/actions/multimedia"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

interface MultimediaFavoriteButtonProps {
  resourceId: string
  initialFavorited: boolean
}

export function MultimediaFavoriteButton({ resourceId, initialFavorited }: MultimediaFavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const result = await toggleFavoriteMultimedia(resourceId)
        setIsFavorited(result.favorited)
        router.refresh()
      } catch (error) {
        console.error("Error toggling favorite:", error)
        if (error instanceof Error && error.message.includes("no autenticado")) {
          router.push("/auth/login")
        }
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className={isFavorited ? "bg-primary/20 border-primary" : ""}
    >
      <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-primary" : ""}`} />
      {isFavorited ? "Guardado" : "Guardar"}
    </Button>
  )
}
