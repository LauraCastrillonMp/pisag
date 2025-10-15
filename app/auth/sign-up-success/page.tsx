import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-30" />

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">¡Registro Exitoso!</CardTitle>
            <CardDescription className="text-slate-600">Verifica tu correo electrónico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-700">
              Te hemos enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada y haz clic en el
              enlace para activar tu cuenta.
            </p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/auth/login">Ir a Iniciar Sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
