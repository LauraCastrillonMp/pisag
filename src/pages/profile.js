import { useSession } from "../lib/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Profile() {
  const { session, loading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!session || !session.user)) {
      router.push("/auth/login")
    }
  }, [session, loading, router])

  if (loading) return <div>Cargando...</div>
  if (!session || !session.user) return null

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h1>Perfil de Usuario</h1>
      <p><strong>Nombre:</strong> {session.user.name}</p>
      <p><strong>Email:</strong> {session.user.email}</p>
      <p><strong>Rol:</strong> {session.user.role}</p>
    </div>
  )
} 