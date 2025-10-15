import { searchForumThreads } from "@/actions/forum"
import { ThreadCard } from "@/components/thread-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowLeft } from "lucide-react"

export default async function BuscarForosPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const searchTerm = params.q || ""
  const threads = searchTerm ? await searchForumThreads(searchTerm) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="cosmic-bg py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/foros">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Buscar Temas</h1>
            <form action="/foros/buscar" method="get">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar temas..."
                  className="pl-12 h-14 text-lg bg-background/50"
                  defaultValue={searchTerm}
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {searchTerm && (
              <p className="text-muted-foreground mb-6">
                {threads.length > 0
                  ? `Se encontraron ${threads.length} resultado${threads.length === 1 ? "" : "s"} para "${searchTerm}"`
                  : `No se encontraron resultados para "${searchTerm}"`}
              </p>
            )}

            {threads.length > 0 ? (
              <div className="space-y-4">
                {threads.map((thread) => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Busca temas de discusión</h3>
                <p className="text-muted-foreground">Ingresa un término de búsqueda para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
