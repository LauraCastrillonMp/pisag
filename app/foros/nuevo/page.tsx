import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { NewThreadForm } from "@/components/new-thread-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NuevoForoPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/foros">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Foros
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Crear Nuevo Tema</h1>
            <p className="text-muted-foreground">Inicia una nueva discusión en la comunidad</p>
          </div>

          <NewThreadForm />
        </div>
      </div>
    </div>
  )
}
