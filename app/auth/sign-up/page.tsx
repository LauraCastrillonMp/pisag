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

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Regex for RFC 5322 Official Standard (simple version, rejects most invalids)
  function isValidEmail(email: string): boolean {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  const handleSignUp = async (e: React.FormEvent) => {
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

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    console.log("[v0] Sign up attempt for:", email, "username:", username)

    try {
      const { error, data } = await supabase.auth.signUp({
        email: cleanedEmail,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
          data: {
            username: username,
            role: "user",
          },
        },
      })

      console.log("[v0] Sign up response:", { error, user: data?.user?.id })

      if (error) throw error

      console.log("[v0] Sign up successful, redirecting to success page")
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      console.error("[v0] Sign up error:", error)
      setError(error instanceof Error ? error.message : "Error al crear la cuenta")
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
          <p className="text-slate-300">Únete a la comunidad astronómica</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Crear Cuenta</CardTitle>
            <CardDescription className="text-slate-600">Regístrate para acceder a todo el contenido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-slate-700">
                    Nombre de Usuario
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="astronauta123"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white border-slate-300"
                  />
                </div>
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
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password" className="text-slate-700">
                    Repetir Contraseña
                  </Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="bg-white border-slate-300"
                  />
                </div>
                {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Registrarse"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-slate-600">
                ¿Ya tienes cuenta?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline underline-offset-4 font-medium">
                  Inicia sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
