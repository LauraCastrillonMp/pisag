import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Pin, Lock, Trash2, AlertTriangle } from "lucide-react"
import { formatDate } from "@/utils/format"
import { deleteThread, toggleThreadPin, toggleThreadLock } from "@/actions/admin"

async function getThreadsAndReports() {
  const supabase = await createServerClient()

  const [{ data: threads }, { data: reportedPosts }] = await Promise.all([
    supabase
      .from("forum_threads")
      .select("*, profiles(username), forum_posts(count)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("forum_posts")
      .select("*, forum_threads(title), profiles(username)")
      .eq("is_reported", true)
      .order("created_at", { ascending: false }),
  ])

  return { threads: threads || [], reportedPosts: reportedPosts || [] }
}

export default async function AdminForumsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const { threads, reportedPosts } = await getThreadsAndReports()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 hover:bg-primary/10">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Panel
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Moderación de Foros
          </h1>
          <p className="text-muted-foreground mt-2">Gestiona hilos, posts reportados y moderación</p>
        </div>

        {/* Reported Posts Section */}
        {reportedPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold">Posts Reportados ({reportedPosts.length})</h2>
            </div>
            <div className="grid gap-4">
              {reportedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="p-6 bg-gradient-to-br from-red-500/10 to-card/30 backdrop-blur-sm border-red-500/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/foros/${post.thread_id}`} className="text-sm text-primary hover:underline">
                          {post.forum_threads?.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Por {post.profiles?.username} • {formatDate(post.created_at)}
                        </p>
                        <p className="mt-3">{post.content}</p>
                      </div>
                      <form action={deleteThread.bind(null, post.id)}>
                        <Button type="submit" variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Threads Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Todos los Hilos</h2>
          <div className="grid gap-4">
            {threads.map((thread) => (
              <Card
                key={thread.id}
                className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        href={`/foros/${thread.id}`}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {thread.title}
                      </Link>
                      {thread.is_pinned && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          <Pin className="h-3 w-3 mr-1" />
                          Fijado
                        </Badge>
                      )}
                      {thread.is_locked && (
                        <Badge variant="secondary" className="bg-red-500/20">
                          <Lock className="h-3 w-3 mr-1" />
                          Cerrado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Por {thread.profiles?.username}</span>
                      <span>•</span>
                      <span>{formatDate(thread.created_at)}</span>
                      <span>•</span>
                      <span className="capitalize">{thread.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleThreadPin.bind(null, thread.id)}>
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className={thread.is_pinned ? "bg-primary/20 border-primary/40" : ""}
                      >
                        <Pin className="h-4 w-4" />
                      </Button>
                    </form>
                    <form action={toggleThreadLock.bind(null, thread.id)}>
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className={thread.is_locked ? "bg-red-500/20 border-red-500/40" : ""}
                      >
                        <Lock className="h-4 w-4" />
                      </Button>
                    </form>
                    <form action={deleteThread.bind(null, thread.id)}>
                      <Button type="submit" variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
