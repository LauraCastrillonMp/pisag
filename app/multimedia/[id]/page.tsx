import { getMultimediaResource, checkIfMultimediaFavorited } from "@/actions/multimedia"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/utils/format"
import { ArrowLeft, Share2, User, Calendar, Play, ImageIcon } from "lucide-react"
import { MultimediaFavoriteButton } from "@/components/multimedia-favorite-button"

const typeIcons = {
  image: ImageIcon,
  video: Play,
  livestream: Play,
}

const typeLabels = {
  image: "Imagen",
  video: "Video",
  livestream: "Transmisión en Vivo",
}

const typeColors = {
  image: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  video: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  livestream: "bg-red-500/20 text-red-400 border-red-500/30",
}

export default async function MultimediaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resource = await getMultimediaResource(id)

  if (!resource) {
    notFound()
  }

  const isFavorited = await checkIfMultimediaFavorited(id)
  const Icon = typeIcons[resource.type]

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/multimedia">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Galería
          </Link>
        </Button>
      </div>

      {/* Resource Detail */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Media Display */}
          <Card className="glass border-primary/20 overflow-hidden mb-8">
            <div className="relative w-full bg-background/50">
              {resource.type === "image" ? (
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={resource.url || "/placeholder.svg"}
                    alt={resource.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : resource.type === "video" ? (
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  <div className="flex items-center justify-center h-full bg-background/50">
                    <div className="text-center space-y-4">
                      <Play className="h-24 w-24 mx-auto text-primary" />
                      <p className="text-muted-foreground">Reproductor de video</p>
                      <Button asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Ver Video
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  <div className="flex items-center justify-center h-full bg-background/50">
                    <div className="text-center space-y-4">
                      <Play className="h-24 w-24 mx-auto text-red-400 animate-pulse" />
                      <p className="text-muted-foreground">Transmisión en vivo</p>
                      <Button asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Ver Transmisión
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Info */}
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4">
              <Badge className={typeColors[resource.type]}>
                <Icon className="h-3 w-3 mr-1" />
                {typeLabels[resource.type]}
              </Badge>
              {resource.category && <Badge variant="outline">{resource.category}</Badge>}
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(resource.created_at)}
              </span>
              {resource.uploader && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary/20">
                      {resource.uploader.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {resource.uploader.username}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-balance">{resource.title}</h1>

            {/* Description */}
            {resource.description && (
              <Card className="glass border-primary/20 p-6">
                <p className="text-lg leading-relaxed text-foreground">{resource.description}</p>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <MultimediaFavoriteButton resourceId={resource.id} initialFavorited={isFavorited} />
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
