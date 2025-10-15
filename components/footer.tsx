import Link from "next/link"
import { Telescope, Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 glass mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://api.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  NASA API
                </a>
              </li>
              <li>
                <a
                  href="https://www.esa.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ESA
                </a>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PISAG. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
