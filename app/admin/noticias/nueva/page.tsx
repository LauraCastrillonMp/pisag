import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import NewNewsForm from "./NewNewsForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function NewNewsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 hover:bg-primary/10">
            <Link href="/admin/noticias">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Noticias
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Nueva Noticia
          </h1>
          <p className="text-muted-foreground mt-2">Crea un nuevo artículo de noticias astronómicas</p>
        </div>
        <NewNewsForm />
      </div>
    </div>
  )
}
