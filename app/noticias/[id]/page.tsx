import { getNewsArticle, checkIfFavorited } from "@/actions/news"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatDate, getCategoryLabel, getCategoryColor } from "@/utils/format"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getNewsArticle(id)

  if (!article) {
    notFound()
  }

  const isFavorited = await checkIfFavorited(id)

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/noticias">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Noticias
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {article.image_url && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className={getCategoryColor(article.category)}>{getCategoryLabel(article.category)}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(article.published_at)}
            </span>
            {article.author && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/20">
                    {article.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author.username}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{article.title}</h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">{article.excerpt}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2 mb-8">
            <FavoriteButton newsId={article.id} initialFavorited={isFavorited} />
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>

          {/* Content */}
          <Card className="glass border-primary/20 p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </article>
    </div>
  )
}
