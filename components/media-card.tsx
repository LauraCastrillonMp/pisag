import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MultimediaResource } from "@/types/database"
import Link from "next/link"
import Image from "next/image"
import { Play, ImageIcon } from "lucide-react"

interface MediaCardProps {
  resource: MultimediaResource
}

const typeIcons = {
  image: ImageIcon,
  video: Play,
  livestream: Play,
}

const typeLabels = {
  image: "Imagen",
  video: "Video",
  livestream: "En Vivo",
}

const typeColors = {
  image: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  video: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  livestream: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function MediaCard({ resource }: MediaCardProps) {
  const Icon = typeIcons[resource.type]

  return (
    <Link href={`/multimedia/${resource.id}`}>
      <Card className="glass border-primary/20 card-hover overflow-hidden group">
        <div className="relative aspect-video w-full overflow-hidden bg-background/50">
          {resource.thumbnail_url ? (
            <Image
              src={resource.thumbnail_url || "/placeholder.svg"}
              alt={resource.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Icon className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className={typeColors[resource.type]}>
              <Icon className="h-3 w-3 mr-1" />
              {typeLabels[resource.type]}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          {resource.description && <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}
