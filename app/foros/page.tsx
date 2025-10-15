import { getForumThreads } from "@/actions/forum"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MessageSquare, Plus, Pin, Lock, MessageCircle, Eye, Clock, UserIcon, Star, Tag } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export default async function ForosPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  const threads = await getForumThreads(params.category)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userProfile = null
  if (user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    userProfile = data
  }

  const categories = [
    { value: "all", label: "Todos", icon: "🌌" },
    { value: "general", label: "General", icon: "💬" },
    { value: "astrophotography", label: "Astrofotografía", icon: "📸" },
    { value: "missions", label: "Misiones", icon: "🚀" },
    { value: "news", label: "Noticias", icon: "📰" },
    { value: "equipment", label: "Equipamiento", icon: "🔭" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Foros de Discusión</h1>
            <p className="text-lg text-slate-300">
              Conecta con otros entusiastas y comparte tu pasión por la astronomía
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white border border-slate-200 shadow-lg sticky top-20">
              {user && userProfile ? (
                <CardContent className="p-6 space-y-6">
                  <div className="text-center pb-4 border-b border-slate-200">
                    <Avatar className="h-16 w-16 mx-auto mb-3 ring-4 ring-slate-100">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                        {userProfile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-slate-900">{userProfile.username}</h3>
                    <p className="text-sm text-slate-500">{userProfile.xp || 0} XP</p>
                  </div>

                  <nav className="space-y-1">
                    <Link
                      href="/foros"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">Todas las publicaciones</span>
                    </Link>
                    <Link
                      href="/foros?filter=my-posts"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Mis publicaciones</span>
                    </Link>
                    <Link
                      href="/foros?filter=favorites"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">Favoritas</span>
                    </Link>
                    <Link
                      href="/foros?filter=people"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Personas</span>
                    </Link>
                  </nav>

                  {userProfile.role === "admin" && (
                    <>
                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                          Herramientas de moderación
                        </h4>
                        <nav className="space-y-1">
                          <Link
                            href="/admin/foros"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                          >
                            <span className="text-sm">Por validar</span>
                          </Link>
                          <Link
                            href="/admin/foros?filter=reported"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                          >
                            <span className="text-sm">Reportada</span>
                          </Link>
                        </nav>
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Etiquetas</h4>
                    <div className="space-y-2">
                      {categories.slice(1).map((cat) => (
                        <Link
                          key={cat.value}
                          href={`/foros?category=${cat.value}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <Tag className="h-3 w-3" />
                          <span className="text-sm">{cat.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href="/foros/nuevo">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva publicación
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-slate-600 mb-4">Inicia sesión para participar</p>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/auth/login">Iniciar Sesión</Link>
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Category filter and search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
              <Tabs defaultValue={params.category || "all"} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-slate-100">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value} asChild>
                      <Link
                        href={cat.value === "all" ? "/foros" : `/foros?category=${cat.value}`}
                        className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-xs"
                      >
                        {cat.label}
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <form action="/foros/buscar" method="get" className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    name="q"
                    placeholder="Buscar..."
                    className="pl-10 w-full md:w-64 bg-white border-slate-300"
                  />
                </div>
              </form>
            </div>

            {/* Thread list */}
            <div className="space-y-3">
              {threads.length > 0 ? (
                threads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/foros/${thread.id}`}
                    className="block bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-slate-100">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {thread.author?.username?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {thread.is_pinned && <Pin className="h-4 w-4 text-blue-600" />}
                            {thread.is_locked && <Lock className="h-4 w-4 text-slate-400" />}
                            <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                              {thread.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <UserIcon className="h-3 w-3" />
                              {thread.author?.username || "Usuario"}
                            </span>
                            <Badge variant="outline" className="text-xs bg-slate-50">
                              {thread.category === "general"
                                ? "General"
                                : thread.category === "astrophotography"
                                  ? "Astrofotografía"
                                  : thread.category === "missions"
                                    ? "Misiones"
                                    : thread.category === "news"
                                      ? "Noticias"
                                      : "Equipamiento"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 text-sm text-slate-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {thread.reply_count || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {thread.view_count || 0}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true, locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                  <MessageSquare className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No hay temas disponibles</h3>
                  <p className="text-slate-600 mb-4">Sé el primero en iniciar una discusión</p>
                  {user && (
                    <Button asChild>
                      <Link href="/foros/nuevo">
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Tema
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
