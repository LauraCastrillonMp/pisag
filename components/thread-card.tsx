import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ForumThread } from "@/types/database"
import Link from "next/link"
import { formatDate } from "@/utils/format"
import { MessageSquare, Pin, Lock, User } from "lucide-react"

interface ThreadCardProps {
  thread: ForumThread & {
    author?: { username: string; avatar_url?: string }
    posts: { count: number }[]
  }
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const postCount = thread.posts[0]?.count || 0

  return (
    <Link href={`/foros/${thread.id}`}>
      <Card className="glass border-primary/20 card-hover">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
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
              <CardTitle className="text-xl hover:text-primary transition-colors">{thread.title}</CardTitle>
            </div>
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm font-medium">{postCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {thread.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/20">
                    {thread.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {thread.author.username}
                </span>
              </div>
            )}
            <span>{formatDate(thread.updated_at)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
