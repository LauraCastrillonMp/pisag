import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Users, Newspaper, MessageSquare, Brain, ImageIcon, TrendingUp, Award, Activity } from "lucide-react"

async function getDetailedStats() {
  const supabase = await createServerClient()

  const [
    { count: totalUsers },
    { count: adminUsers },
    { count: totalNews },
    { count: totalThreads },
    { count: totalPosts },
    { count: totalMultimedia },
    { count: totalQuizAttempts },
    { count: totalSections },
    { data: topUsers },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin"),
    supabase.from("news_articles").select("*", { count: "exact", head: true }),
    supabase.from("forum_threads").select("*", { count: "exact", head: true }),
    supabase.from("forum_posts").select("*", { count: "exact", head: true }),
    supabase.from("multimedia_resources").select("*", { count: "exact", head: true }),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }),
    supabase.from("knowledge_sections").select("*", { count: "exact", head: true }),
    supabase
      .from("quiz_attempts")
      .select("user_id, score, profiles(username)")
      .order("score", { ascending: false })
      .limit(10),
    supabase.from("forum_threads").select("*, profiles(username)").order("created_at", { ascending: false }).limit(5),
  ])

  return {
    totalUsers: totalUsers || 0,
    adminUsers: adminUsers || 0,
    totalNews: totalNews || 0,
    totalThreads: totalThreads || 0,
    totalPosts: totalPosts || 0,
    totalMultimedia: totalMultimedia || 0,
    totalQuizAttempts: totalQuizAttempts || 0,
    totalSections: totalSections || 0,
    topUsers: topUsers || [],
    recentActivity: recentActivity || [],
  }
}

export default async function AdminStatsPage() {
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

  const stats = await getDetailedStats()

  const statCards = [
    {
      label: "Total Usuarios",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/20",
    },
    {
      label: "Administradores",
      value: stats.adminUsers,
      icon: Award,
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-purple-600/20",
    },
    {
      label: "Noticias",
      value: stats.totalNews,
      icon: Newspaper,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-600/20",
    },
    {
      label: "Hilos de Foro",
      value: stats.totalThreads,
      icon: MessageSquare,
      color: "text-cyan-400",
      bgColor: "from-cyan-500/20 to-cyan-600/20",
    },
    {
      label: "Posts Totales",
      value: stats.totalPosts,
      icon: Activity,
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-pink-600/20",
    },
    {
      label: "Recursos Multimedia",
      value: stats.totalMultimedia,
      icon: ImageIcon,
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-orange-600/20",
    },
    {
      label: "Intentos de Quiz",
      value: stats.totalQuizAttempts,
      icon: Brain,
      color: "text-indigo-400",
      bgColor: "from-indigo-500/20 to-indigo-600/20",
    },
    {
      label: "Secciones de Conocimiento",
      value: stats.totalSections,
      icon: TrendingUp,
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-yellow-600/20",
    },
  ]

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
            Estadísticas del Sistema
          </h1>
          <p className="text-muted-foreground mt-2">Métricas y análisis de la plataforma PISAG</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Users */}
          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Top 10 Usuarios (Quiz)
            </h2>
            <div className="space-y-3">
              {stats.topUsers.slice(0, 10).map((attempt, index) => (
                <div
                  key={`${attempt.user_id}-${index}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0
                          ? "bg-yellow-500/20 text-yellow-400"
                          : index === 1
                            ? "bg-gray-400/20 text-gray-400"
                            : index === 2
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-primary/20 text-primary"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="font-medium">{attempt.profiles?.username}</span>
                  </div>
                  <span className="text-primary font-bold">{attempt.score} pts</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Actividad Reciente
            </h2>
            <div className="space-y-3">
              {stats.recentActivity.map((thread) => (
                <div key={thread.id} className="p-3 rounded-lg bg-background/50">
                  <Link
                    href={`/foros/${thread.id}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-1"
                  >
                    {thread.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">Por {thread.profiles?.username}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
