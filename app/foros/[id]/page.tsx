import { getForumThread, getForumPosts } from "@/actions/forum"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { notFound } from "next/navigation"
import Link from "next/link"
import { formatDate } from "@/utils/format"
import { ArrowLeft, Pin, Lock, MessageSquare } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ReplyForm } from "@/components/reply-form"
import { PostActions } from "@/components/post-actions"

export default async function ForoThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const thread = await getForumThread(id)

  if (!thread) {
    notFound()
  }

  const posts = await getForumPosts(id)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/foros">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Foros
          </Link>
        </Button>
      </div>

      {/* Thread Header */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {thread.is_pinned && (
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Pin className="h-3 w-3 mr-1" />
                Fijado
              </Badge>
            )}
            {thread.is_locked && (
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                <Lock className="h-3 w-3 mr-1" />
                Cerrado
              </Badge>
            )}
            <Badge variant="outline">{thread.category}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{thread.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {thread.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/20">
                    {thread.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>Creado por {thread.author.username}</span>
              </div>
            )}
            <span>{formatDate(thread.created_at)}</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {posts.length} {posts.length === 1 ? "respuesta" : "respuestas"}
            </span>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {posts.map((post, index) => (
            <Card key={post.id} className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Author Info */}
                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20">
                        {post.author?.username.charAt(0).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="text-sm font-medium">{post.author?.username || "Usuario"}</p>
                      {post.author?.role === "admin" && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary mt-1">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                      <div className="text-xs text-muted-foreground">
                        {formatDate(post.created_at)}
                        {post.is_edited && <span className="ml-2">(editado)</span>}
                      </div>
                      {user && (user.id === post.author_id || post.author?.role === "admin") && (
                        <PostActions postId={post.id} />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Reply Form */}
          {user && !thread.is_locked ? (
            <ReplyForm threadId={thread.id} />
          ) : !user ? (
            <Card className="glass border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">Debes iniciar sesión para responder</p>
                <Button asChild>
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-primary/20">
              <CardContent className="p-6 text-center">
                <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Este tema está cerrado y no acepta nuevas respuestas</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
