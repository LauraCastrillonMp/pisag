import Link from "next/link"
import { Telescope, Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 glass mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Telescope className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold gradient-text">PISAG</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma de Información y Servicios Astronómicos Gamificados
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/foros" className="text-muted-foreground hover:text-primary transition-colors">
                  Foros
                </Link>
              </li>
              <li>
                <Link href="/conocimiento" className="text-muted-foreground hover:text-primary transition-colors">
                  Conocimiento
                </Link>
              </li>
              <li>
                <Link href="/multimedia" className="text-muted-foreground hover:text-primary transition-colors">
                  Multimedia
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PISAG. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
