import { searchMultimediaResources } from "@/actions/multimedia"
import { MediaCard } from "@/components/media-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowLeft, ImageIcon } from "lucide-react"

export default async function BuscarMultimediaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const searchTerm = params.q || ""
  const resources = searchTerm ? await searchMultimediaResources(searchTerm) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="cosmic-bg py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/multimedia">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Buscar Multimedia</h1>
            <form action="/multimedia/buscar" method="get">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar imágenes y videos..."
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
          {searchTerm && (
            <p className="text-muted-foreground mb-6">
              {resources.length > 0
                ? `Se encontraron ${resources.length} resultado${resources.length === 1 ? "" : "s"} para "${searchTerm}"`
                : `No se encontraron resultados para "${searchTerm}"`}
            </p>
          )}

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <MediaCard key={resource.id} resource={resource} />
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
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Busca contenido multimedia</h3>
              <p className="text-muted-foreground">Ingresa un término de búsqueda para comenzar</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
