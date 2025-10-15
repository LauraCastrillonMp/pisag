"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Regex for RFC 5322 Official Standard (simple version, rejects most invalids)
  function isValidEmail(email: string): boolean {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  // Recuperar la ruta de redirección, si existe, de la query string
  function getRedirectPath() {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('redirect') || '/';
    }
    return '/';
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    const cleanedEmail = email.trim().toLowerCase().replace(/\s+/g, "");
    if (!isValidEmail(cleanedEmail)) {
      setError("El correo electrónico no es válido");
      setIsLoading(false);
      return;
    }

    console.log("[v0] Login attempt for:", email)

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: cleanedEmail,
        password,
      })

      console.log("[v0] Login response:", { error, user: data?.user?.id })

      if (error) throw error

      console.log("[v0] Login successful, redirecting to home")
      router.push("/")
      router.refresh()
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-30" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">PISAG</h1>
          <p className="text-slate-300">Plataforma de Información y Servicios Astronómicos</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Iniciar Sesión</CardTitle>
            <CardDescription className="text-slate-600">Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-slate-300"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-slate-700">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-slate-300"
                  />
                </div>
                {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                <Button
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                  onClick={async () => {
                    const supabase = createClient();
                    const redirectTo = window.location.origin + getRedirectPath();
                    await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: {
                        redirectTo
                      }
                    });
                  }}
                >
                  Iniciar sesión con Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-slate-600">
                ¿No tienes cuenta?{" "}
                <Link href="/auth/sign-up" className="text-blue-600 hover:underline underline-offset-4 font-medium">
                  Regístrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
