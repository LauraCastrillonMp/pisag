import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="cosmic-bg py-32 md:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6 fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
              Desde la Tierra hasta el infinito, expande tu mente con conocimiento cósmico
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Información espacial al alcance de tus manos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/telescope-silhouette-against-milky-way-night-sky.jpg"
                alt="Telescopio observando el cielo estrellado"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Astronomía</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Es la ciencia que estudia el universo, incluyendo los astros como planetas, estrellas, galaxias y otros
                cuerpos celestes. Se encarga de analizar su origen, evolución, composición y movimientos.
              </p>
              <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-white/90 font-semibold">
                <Link href="/conocimiento/astronomia/contenido">
                  Conoce más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Sistema Solar</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                El Sistema Solar es nuestro hogar en el vasto universo. Desde los rocosos mundos interiores hasta los gigantes gaseosos y los lejanos cuerpos helados, cada rincón de este sistema encierra maravillas y misterios por descubrir.
              </p>
              <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-white/90 font-semibold">
                <Link href="/conocimiento/sistema-solar/contenido">
                  Conoce más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Sistema Solar"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Astrofísica"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-gray-900 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Astrofísica</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                La astrofísica es la rama de la astronomía que aplica los principios de la física para estudiar las propiedades físicas de los objetos celestes y los fenómenos que ocurren en el universo.
              </p>
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Link href="/conocimiento/astrofisica/contenido">
                  Conoce más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Exploración Espacial</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                La exploración espacial es el descubrimiento y estudio de estructuras en el espacio exterior mediante el uso de tecnología espacial, incluyendo naves espaciales, satélites y misiones tripuladas.
              </p>
              <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-white/90 font-semibold">
                <Link href="/conocimiento/exploracion-espacial/contenido">
                  Conoce más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Exploración Espacial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Misiones Espaciales"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-gray-900 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Misiones Espaciales</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Las misiones espaciales son proyectos científicos y tecnológicos organizados para enviar personas, naves o instrumentos al espacio con el objetivo de explorar, investigar o realizar tareas específicas fuera de la Tierra.
              </p>
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Link href="/conocimiento/misiones-espaciales/contenido">
                  Conoce más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">¿Listo para explorar el universo?</h2>
            <p className="text-lg text-gray-600">Únete a nuestra comunidad y comienza tu viaje por el cosmos</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/auth/sign-up">Comenzar Ahora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/noticias">Explorar Noticias</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
