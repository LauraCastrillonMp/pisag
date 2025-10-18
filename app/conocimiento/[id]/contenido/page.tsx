import { getKnowledgeSections } from "@/actions/quiz"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Play } from "lucide-react"

// Content data for each knowledge section
const sectionContent = {
  "Astronomia": {
    title: "AstronomÍa",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La astronomía es la ciencia que estudia el universo, incluyendo los astros como planetas, estrellas, galaxias y otros cuerpos celestes. Se encarga de analizar su origen, evolución, composición y movimientos.",
        image: "https://topratereviews.com/wp-content/uploads/2020/10/telescope-vs-binoculars-difference-740x282.jpg"
      },
      {
        id: "conceptos-fundamentales",
        title: "Conceptos Fundamentales",
        content: "Los conceptos básicos incluyen la observación del cielo nocturno, el reconocimiento de constelaciones, la comprensión de los movimientos planetarios y el estudio de los fenómenos celestes como eclipses y meteoros.",
        image: "/vast-starfield.png"
      },
      {
        id: "herramientas",
        title: "Herramientas de Observación",
        content: "Desde la antigüedad, los humanos han usado herramientas para observar el cielo: desde el ojo desnudo hasta telescopios modernos, satélites y observatorios espaciales que nos permiten explorar el universo.",
        image: "/placeholder.jpg"
      },
      {
        id: "importancia",
        title: "Importancia de la Astronomía",
        content: "La astronomía nos ayuda a entender nuestro lugar en el universo, contribuye al desarrollo de tecnologías, y nos permite predecir fenómenos que afectan la vida en la Tierra.",
        image: "/placeholder.jpg"
      }
    ]
  },
  "sistema-solar": {
    title: "Sistema Solar",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "El Sistema Solar es nuestro hogar en el vasto universo. Desde los rocosos mundos interiores hasta los gigantes gaseosos y los lejanos cuerpos helados, cada rincón de este sistema encierra maravillas y misterios por descubrir.",
        image: "https://media.istockphoto.com/id/482954331/es/foto/sistema-solar.jpg?s=2048x2048&w=is&k=20&c=AiKo9FP76Ky3_lFHLksDCovp2gir1NC9GmQOTf46hTc="
      },
      {
        id: "planetas-interiores",
        title: "Planetas Interiores",
        content: "Los planetas rocosos (Mercurio, Venus, Tierra y Marte) se encuentran más cerca del Sol. Son mundos sólidos con superficies definidas y atmósferas variadas.",
        image: "/placeholder.jpg"
      },
      {
        id: "planetas-exteriores",
        title: "Planetas Exteriores",
        content: "Los gigantes gaseosos (Júpiter, Saturno, Urano y Neptuno) son mundos masivos compuestos principalmente de hidrógeno y helio, con sistemas de lunas fascinantes.",
        image: "/placeholder.jpg"
      },
      {
        id: "cuerpos-menores",
        title: "Cuerpos Menores",
        content: "Asteroides, cometas y objetos del cinturón de Kuiper forman parte de los restos de la formación del Sistema Solar, ofreciendo pistas sobre nuestros orígenes.",
        image: "/placeholder.jpg"
      }
    ]
  },
  "astrofisica": {
    title: "Astrofísica",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La astrofísica es la rama de la astronomía que aplica los principios de la física para estudiar las propiedades físicas de los objetos celestes y los fenómenos que ocurren en el universo.",
        image: "/placeholder.jpg"
      },
      {
        id: "estrellas",
        title: "Física Estelar",
        content: "Estudia el nacimiento, evolución y muerte de las estrellas, incluyendo procesos como la fusión nuclear, supernovas y la formación de agujeros negros.",
        image: "/placeholder.jpg"
      },
      {
        id: "galaxias",
        title: "Estructura Galáctica",
        content: "Analiza la formación y evolución de galaxias, la materia oscura, y los procesos que dan forma a las estructuras más grandes del universo.",
        image: "/placeholder.jpg"
      },
      {
        id: "cosmologia",
        title: "Cosmología Física",
        content: "Investiga el origen, evolución y destino del universo, incluyendo la teoría del Big Bang, la expansión cósmica y la energía oscura.",
        image: "/placeholder.jpg"
      }
    ]
  },
  "exploracion-espacial": {
    title: "Exploración Espacial",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La exploración espacial es el descubrimiento y estudio de estructuras en el espacio exterior mediante el uso de tecnología espacial, incluyendo naves espaciales, satélites y misiones tripuladas.",
        image: "/placeholder.jpg"
      },
      {
        id: "tecnologia",
        title: "Tecnología Espacial",
        content: "Desde cohetes hasta estaciones espaciales, la tecnología espacial ha evolucionado para permitirnos explorar el sistema solar y más allá.",
        image: "/placeholder.jpg"
      },
      {
        id: "misiones-tripuladas",
        title: "Misiones Tripuladas",
        content: "Las misiones con humanos han llevado a la Luna, construido estaciones espaciales y preparado el camino para futuras exploraciones a Marte y otros destinos.",
        image: "/placeholder.jpg"
      },
      {
        id: "futuro",
        title: "El Futuro de la Exploración",
        content: "Próximas misiones planean regresar a la Luna, establecer bases en Marte y explorar las lunas de Júpiter y Saturno en busca de vida.",
        image: "/placeholder.jpg"
      }
    ]
  },
  "misiones-espaciales": {
    title: "Misiones Espaciales",
    sections: [
      {
        id: "que-son",
        title: "¿Qué son?",
        content: "Las misiones espaciales son proyectos científicos y tecnológicos organizados para enviar personas, naves o instrumentos al espacio con el objetivo de explorar, investigar o realizar tareas específicas fuera de la Tierra; su objetivo es explorar planetas, lunas y el universo para entender nuestro lugar en el cosmos.",
        image: "/placeholder.jpg"
      },
      {
        id: "misiones-historicas",
        title: "Misiones Históricas",
        content: "Desde el Sputnik hasta el Apollo 11, las misiones históricas han marcado hitos importantes en nuestra comprensión del espacio y han demostrado las capacidades humanas.",
        image: "/placeholder.jpg"
      },
      {
        id: "misiones-actuales",
        title: "Misiones Actuales",
        content: "Misiones como Perseverance en Marte, James Webb Space Telescope y las misiones a la Luna continúan expandiendo nuestro conocimiento del cosmos.",
        image: "/placeholder.jpg"
      },
      {
        id: "misiones-futuras",
        title: "Misiones Futuras",
        content: "Artemis, misiones a Europa y Encelado, y proyectos de colonización marciana representan el próximo capítulo de la exploración espacial.",
        image: "/placeholder.jpg"
      }
    ]
  },
}

export default async function ContenidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Get all sections to find the one matching our URL
  const sections = await getKnowledgeSections()
  
  // Create a mapping from URL-friendly names to section titles
  const urlToTitleMap: Record<string, string> = {
    'astronomia': 'Astronomia',
    'sistema-solar': 'Sistema Solar',
    'astrofisica': 'Astrofisica',
    'exploracion-espacial': 'Exploracion Espacial',
    'misiones-espaciales': 'Misiones Espaciales'
  }
  
  const sectionTitle = urlToTitleMap[id]
  if (!sectionTitle) {
    notFound()
  }
  
  const section = sections.find(s => s.title === sectionTitle)
  if (!section) {
    notFound()
  }

  const content = sectionContent[id as keyof typeof sectionContent]
  
  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Header with space background */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/vast-starfield.png')] opacity-30" />
        <div className="relative bg-gradient-to-r from-blue-900/80 to-slate-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href={`/conocimiento/${section.id}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">Contenido</h2>
              <nav className="space-y-2">
                {content.sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-white hover:text-blue-300 transition-colors py-2 px-3 rounded hover:bg-white/10"
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-white/20">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={`/conocimiento/${section.id}/quiz`}>
                    <Play className="h-4 w-4 mr-2" />
                    Tomar Test
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={section.id} id={section.id} className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/20 pb-2">
                        {section.title}
                      </h2>
                      <p className="text-white/90 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                    
                    {/* Image */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
