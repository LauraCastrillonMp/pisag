import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "../../lib/auth"

export default function AdminDashboard() {
  const { session, loading } = useSession()
  const [user, setUser] = useState({
    name: "",
    email: "",
  })
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!session || !session.user || session.user.role !== "admin") {
        router.push("/auth/login")
      } else {
        setUser(session.user)
      }
    }
  }, [session, loading, router])

  if (loading) return <div>Cargando...</div>
  if (!session || session.user.role !== "admin") return null

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/admin/noticias">Gestionar Noticias</a>
      <a href="/admin/foro">Gestionar Foros</a>
    </div>
  )
}