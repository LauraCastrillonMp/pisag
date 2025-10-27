import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Newspaper, MessageSquare, ImageIcon, Brain, TrendingUp, AlertTriangle, Activity } from "lucide-react"

async function getAdminStats() {
  const supabase = await createServerClient()

  const [
    { count: usersCount },
    { count: newsCount },
    { count: threadsCount },
    { count: postsCount },
    { count: multimediaCount },
    { count: quizAttemptsCount },
    { count: reportsCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("news_articles").select("*", { count: "exact", head: true }),
    supabase.from("forum_threads").select("*", { count: "exact", head: true }),
    supabase.from("forum_posts").select("*", { count: "exact", head: true }),
    supabase.from("multimedia_resources").select("*", { count: "exact", head: true }),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }),
    supabase.from("forum_posts").select("*", { count: "exact", head: true }).eq("is_reported", true),
  ])

  return {
    usersCount: usersCount || 0,
    newsCount: newsCount || 0,
    threadsCount: threadsCount || 0,
    postsCount: postsCount || 0,
    multimediaCount: multimediaCount || 0,
    quizAttemptsCount: quizAttemptsCount || 0,
    reportsCount: reportsCount || 0,
  }
}

export default async function AdminPage() {
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

  const stats = await getAdminStats()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground mt-1">Gestiona todos los aspectos de la plataforma PISAG</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stats.usersCount}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Usuarios Totales</h3>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Newspaper className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stats.newsCount}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Noticias Publicadas</h3>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <MessageSquare className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stats.threadsCount}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Hilos de Foro</h3>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stats.reportsCount}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Reportes Pendientes</h3>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Usuarios</h3>
                <p className="text-sm text-muted-foreground mb-4">Administra usuarios, roles y permisos</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Link href="/admin/usuarios">Ver Usuarios</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <Newspaper className="h-10 w-10 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Noticias</h3>
                <p className="text-sm text-muted-foreground mb-4">Crea, edita y elimina artículos de noticias</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <Link href="/admin/noticias">Gestionar Noticias</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                <MessageSquare className="h-10 w-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Moderación de Foros</h3>
                <p className="text-sm text-muted-foreground mb-4">Modera hilos, posts y reportes</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <Link href="/admin/foros">Moderar Foros</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all duration-300">
                <ImageIcon className="h-10 w-10 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestión Multimedia</h3>
                <p className="text-sm text-muted-foreground mb-4">Administra imágenes, videos y recursos</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
              >
                <Link href="/admin/multimedia">Gestionar Multimedia</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 group-hover:from-pink-500/30 group-hover:to-pink-600/30 transition-all duration-300">
                <Brain className="h-10 w-10 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Quizzes</h3>
                <p className="text-sm text-muted-foreground mb-4">Crea y edita preguntas y secciones</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800"
              >
                <Link href="/admin/quizzes">Gestionar Quizzes</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-all duration-300">
                <TrendingUp className="h-10 w-10 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
                <p className="text-sm text-muted-foreground mb-4">Visualiza métricas y reportes del sistema</p>
              </div>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
              >
                <Link href="/admin/estadisticas">Ver Estadísticas</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
