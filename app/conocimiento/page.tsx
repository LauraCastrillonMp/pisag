import { getKnowledgeSections, getLeaderboard, getUserQuizAttempts } from "@/actions/quiz"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, CheckCircle2 } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"

export default async function ConocimientoPage() {
  const sections = await getKnowledgeSections()
  const leaderboard = await getLeaderboard(10)
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userAttempts: Awaited<ReturnType<typeof getUserQuizAttempts>> = []
  let userProfile = null
  if (user) {
    userAttempts = await getUserQuizAttempts()
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    userProfile = data
  }

  const userTotalScore = userAttempts.reduce((sum, attempt) => sum + attempt.score, 0)
  const userRank = leaderboard.findIndex((entry) => entry.username === userProfile?.username) + 1

  const FEATURED_SLUGS = [
    "astronomia",
    "sistema-solar",
    "astrofisica",
    "exploracion-espacial",
    "misiones-espaciales",
  ]

  function toSlug(input: string) {
    return input
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  const filteredSections = FEATURED_SLUGS.map((slug) => {
    const byId = sections.find((s) => s.id === slug)
    if (byId) return byId
    return sections.find((s) => toSlug(s.title) === slug)
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Ponte a prueba</h1>
            <p className="text-lg text-slate-300">Evalúa tus habilidades con nuestros tests</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Mis cursos</h2>
              <Link href="#" className="text-blue-600 hover:underline text-sm font-medium">
                Ver todo
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSections.map((section) => {
                const questionCount = section.questions?.[0]?.count || 0
                const userAttempt = userAttempts.find((a) => a.section_id === section.id)
                const isCompleted = !!userAttempt

                return (
                  <Link key={section.id} href={`/conocimiento/${section.id}/contenido`} className="block group">
                    <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      <div className="relative h-40 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
                        <Image
                          src={`/.jpg?height=160&width=320&query=${encodeURIComponent(section.title)}`}
                          alt={section.title}
                          fill
                          className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        />
                        {isCompleted && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{section.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                            {section.difficulty === "beginner"
                              ? "Básico"
                              : section.difficulty === "intermediate"
                                ? "Intermedio"
                                : "Avanzado"}
                          </Badge>
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-700 border-green-300">✓ Completado</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Cursos más populares</h2>
                <Link href="#" className="text-blue-600 hover:underline text-sm font-medium">
                  Ver todo
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSections.slice(0, 2).map((section) => (
                  <Link key={`popular-${section.id}`} href={`/conocimiento/${section.id}/contenido`} className="block group">
                    <Card className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative h-40 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
                        <Image
                          src={`/.jpg?height=160&width=320&query=${encodeURIComponent(section.title)}`}
                          alt={section.title}
                          fill
                          className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm line-clamp-2">{section.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {user && userProfile && (
              <Card className="bg-white border border-slate-200 shadow-lg">
                <CardHeader className="text-center pb-2">
                  <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-slate-100">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                      {userProfile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl text-slate-900">{userProfile.username}</CardTitle>
                  <p className="text-sm text-slate-500">{userProfile.xp || 0} XP</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl mb-3">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white">{userRank || "?"}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-slate-900">
                        {userRank === 1
                          ? "Doctor"
                          : userRank === 2
                            ? "Maestro"
                            : userRank === 3
                              ? "Experto"
                              : "Aprendiz"}
                      </p>
                      <p className="text-sm text-slate-600">
                        Consiga <span className="font-semibold">{Math.max(0, 1000 - userTotalScore)} pts</span> para
                        subir de nivel.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Rango actual:</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        {userRank ? `#${userRank}` : "Sin ranking"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Siguiente rango:</span>
                      <span className="font-semibold text-slate-900">
                        {userRank === 1 ? "Máximo" : userRank === 2 ? "Doctor" : "Maestro"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-600 mb-3">
                      ¡Alcance el siguiente rango para convertirse en un usuario poderoso!
                    </p>
                    <div className="flex gap-2 justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Leaderboard remains similar but with updated styling */}
            <Card className="bg-white border border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Ranking Global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-700"
                            : index === 1
                              ? "bg-slate-200 text-slate-700"
                              : index === 2
                                ? "bg-orange-100 text-orange-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10 ring-2 ring-slate-100">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {entry.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{entry.username}</p>
                        <p className="text-xs text-slate-500">{entry.attempts} tests</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 font-semibold">
                        {entry.totalScore}
                      </Badge>
                    </div>
                  ))}
                  {leaderboard.length === 0 && (
                    <p className="text-center text-slate-500 py-8 text-sm">Sé el primero en completar un test</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
