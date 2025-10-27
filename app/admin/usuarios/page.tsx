import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Shield, User } from "lucide-react"
import { updateUserRole } from "@/actions/admin"

async function getUsers() {
  const supabase = await createServerClient()

  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return users || []
}

export default async function AdminUsersPage() {
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

  const users = await getUsers()

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
          <h1 className="text-4xl font-bold text-balance text-foreground">
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground mt-2">Administra roles y permisos de usuarios</p>
        </div>

        <div className="grid gap-4">
          {users.map((userProfile) => (
            <Card
              key={userProfile.id}
              className="p-6 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                    {userProfile.role === "admin" ? (
                      <Shield className="h-6 w-6 text-primary" />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userProfile.username}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={userProfile.role === "admin" ? "default" : "secondary"}
                    className={userProfile.role === "admin" ? "bg-gradient-to-r from-primary to-accent" : ""}
                  >
                    {userProfile.role === "admin" ? "Administrador" : "Usuario"}
                  </Badge>
                  <form action={updateUserRole}>
                    <input type="hidden" name="userId" value={userProfile.id} />
                    <input type="hidden" name="newRole" value={userProfile.role === "admin" ? "user" : "admin"} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/10 bg-transparent"
                      disabled={userProfile.id === user.id}
                    >
                      {userProfile.role === "admin" ? "Quitar Admin" : "Hacer Admin"}
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
