import { getNewsArticles } from "@/actions/news"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, Newspaper, Calendar, User } from "lucide-react"
import type { NewsCategory } from "@/types/database"
import { formatDate } from "@/utils/format"
import Image from "next/image"

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: NewsCategory; q?: string }>
}) {
  const params = await searchParams
  const articles = await getNewsArticles(params.category)

  const categories = [
    { value: "all", label: "Todas" },
    { value: "missions", label: "Misiones" },
    { value: "discoveries", label: "Descubrimientos" },
    { value: "celestial_events", label: "Eventos Celestes" },
  ]

  const categoryLabels: Record<string, string> = {
    missions: "Misiones",
    discoveries: "Descubrimientos",
    celestial_events: "Eventos Celestes",
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="h-8 w-8 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">Noticias más reciente</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Tabs defaultValue={params.category || "all"} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value} asChild>
                    <Link
                      href={cat.value === "all" ? "/noticias" : `/noticias?category=${cat.value}`}
                      className="data-[state=active]:bg-white data-[state=active]:text-slate-900"
                    >
                      {cat.label}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <form action="/noticias/buscar" method="get" className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar noticias..."
                  className="pl-10 w-full md:w-64 bg-white border-slate-300"
                  defaultValue={params.q}
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/noticias/${article.id}`}
                  className="flex flex-col md:flex-row gap-6 bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="md:w-80 h-48 md:h-auto relative flex-shrink-0 bg-slate-100">
                    <Image
                      src={
                        article.image_url ||
                        `/placeholder.svg?height=200&width=320&query=${encodeURIComponent(article.title)}`
                      }
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-slate-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      {article.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      )}
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        En Noticias
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No hay noticias disponibles</h3>
              <p className="text-slate-600">Vuelve pronto para ver las últimas actualizaciones</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
