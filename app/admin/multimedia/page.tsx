import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, ImageIcon, Video } from "lucide-react"
import { formatDate } from "@/utils/format"
import { deleteMultimedia } from "@/actions/admin"
import { MultimediaImage } from "@/components/multimedia-image"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

async function getMultimediaResources() {
  const supabase = await createServerClient()

  const { data: resources } = await supabase
    .from("multimedia_resources")
    .select("*")
    .order("created_at", { ascending: false })

  return resources || []
}

export default async function AdminMultimediaPage() {
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

  const resources = await getMultimediaResources()

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Gestión Multimedia
              </h1>
              <p className="text-muted-foreground mt-2">Administra imágenes, videos y recursos multimedia</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/admin/multimedia/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Recurso
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-48 w-full bg-muted">
                {resource.type === "image" ? (
                  <MultimediaImage 
                    src={resource.url || "/placeholder.svg"} 
                    alt={resource.title || "Multimedia resource"} 
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Video className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={resource.type === "image" ? "bg-blue-500/20" : "bg-purple-500/20"}
                  >
                    {resource.type === "image" ? (
                      <ImageIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <Video className="h-3 w-3 mr-1" />
                    )}
                    {resource.type}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {resource.category}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1 line-clamp-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{formatDate(resource.created_at)}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/multimedia/editar/${resource.id}`}>Editar</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>¿Eliminar recurso multimedia?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará definitivamente este recurso multimedia.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <form action={deleteMultimedia.bind(null, resource.id)}>
                            <AlertDialogAction asChild>
                              <Button type="submit" variant="destructive">Eliminar</Button>
                            </AlertDialogAction>
                          </form>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
