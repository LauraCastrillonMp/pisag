import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { NewsArticle } from "@/types/database"
import Link from "next/link"
import Image from "next/image"
import { formatDate, getCategoryLabel, getCategoryColor } from "@/utils/format"
import { Calendar, User } from "lucide-react"

interface NewsCardProps {
  article: NewsArticle & { author?: { username: string; avatar_url?: string } }
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/noticias/${article.id}`} className="block h-full">
      <Card className="glass border-primary/20 card-hover overflow-hidden h-full group">
        {article.image_url && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.image_url || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge
              className={`${getCategoryColor(article.category)} transition-all duration-300 group-hover:scale-105`}
            >
              {getCategoryLabel(article.category)}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.published_at)}
            </span>
          </div>
          <CardTitle className="text-xl line-clamp-2 text-balance group-hover:text-primary transition-colors duration-300">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 text-base mb-4">{article.excerpt}</CardDescription>
          {article.author && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6 ring-1 ring-primary/20">
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
                  {article.author.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {article.author.username}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
