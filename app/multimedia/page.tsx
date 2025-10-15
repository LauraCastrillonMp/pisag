import { getMultimediaResources } from "@/actions/multimedia"
import { MediaCard } from "@/components/media-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Search, ImageIcon, Play, Radio } from "lucide-react"
import type { MultimediaType } from "@/types/database"

export default async function MultimediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: MultimediaType; category?: string }>
}) {
  const params = await searchParams
  const resources = await getMultimediaResources(params.type, params.category)

  const types = [
    { value: "all", label: "Todo", icon: ImageIcon },
    { value: "image", label: "Imágenes", icon: ImageIcon },
    { value: "video", label: "Videos", icon: Play },
    { value: "livestream", label: "En Vivo", icon: Radio },
  ]

  const categories = [
    { value: "all", label: "Todas" },
    { value: "galaxies", label: "Galaxias" },
    { value: "nebulae", label: "Nebulosas" },
    { value: "planets", label: "Planetas" },
    { value: "events", label: "Eventos" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="cosmic-bg py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ImageIcon className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Galería Multimedia</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Explora impresionantes imágenes y videos del cosmos capturados por telescopios y sondas espaciales
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-primary/20 glass sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Type Filter */}
            <Tabs defaultValue={params.type || "all"} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-background/50">
                {types.map((type) => (
                  <TabsTrigger key={type.value} value={type.value} asChild>
                    <Link
                      href={type.value === "all" ? "/multimedia" : `/multimedia?type=${type.value}`}
                      className="data-[state=active]:bg-primary/20"
                    >
                      <type.icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Category & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Tabs defaultValue={params.category || "all"} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-5 bg-background/50">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value} asChild>
                      <Link
                        href={
                          cat.value === "all"
                            ? params.type
                              ? `/multimedia?type=${params.type}`
                              : "/multimedia"
                            : params.type
                              ? `/multimedia?type=${params.type}&category=${cat.value}`
                              : `/multimedia?category=${cat.value}`
                        }
                        className="data-[state=active]:bg-primary/20"
                      >
                        {cat.label}
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <form action="/multimedia/buscar" method="get" className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="q"
                    placeholder="Buscar multimedia..."
                    className="pl-10 w-full md:w-64 bg-background/50"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <MediaCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hay recursos disponibles</h3>
              <p className="text-muted-foreground">Vuelve pronto para ver nuevas imágenes y videos</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
