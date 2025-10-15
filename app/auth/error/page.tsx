import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 cosmic-bg">
      <div className="w-full max-w-md">
        <Card className="glass border-destructive/20">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Error de Autenticación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {params?.error ? (
              <p className="text-sm text-muted-foreground">Código de error: {params.error}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Ha ocurrido un error inesperado.</p>
            )}
            <Button asChild className="w-full">
              <Link href="/auth/login">Volver a Iniciar Sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
