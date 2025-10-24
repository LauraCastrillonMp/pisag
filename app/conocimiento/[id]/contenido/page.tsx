import { getKnowledgeSections } from "@/actions/quiz"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Play } from "lucide-react"

// Content data for each knowledge section
const sectionContent = {
  "astronomia": {
    title: "AstronomÍa",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La astronomía es una de las ciencias más antiguas y fascinantes.\n\n" +
          "Su nombre viene del griego:\n" +
          "astro significa estrella,\n" +
          "nomos significa ley.\n" +
          "Por eso, literalmente, astronomía significa 'las leyes de los astros'.\n\n" +
          "es la ciencia que estudia el universo y todos los cuerpos celestes que lo forman, como las estrellas, los planetas, los satélites, los cometas, los asteroides, las galaxias y las nebulosas. También analiza los fenómenos naturales que ocurren en el espacio, como los eclipses, los meteoros y el movimiento de los planetas.\n" +
          "A través de la astronomía, el ser humano busca entender cómo es el universo, cómo se formó, cómo funciona y cuál es nuestro lugar dentro de él.\n" +
          "Es una ciencia que combina la observación del cielo, la experimentación, las matemáticas y la física para explicar lo que ocurre más allá de nuestro planeta.\n\n" +
          "Una ciencia antigua y moderna a la vez\n\n" +
          "La astronomía es una de las ciencias más antiguas del mundo.\n" +
          "Desde hace miles de años, las civilizaciones antiguas —como los mayas, los egipcios, los griegos o los chinos— miraban el cielo con atención y Usaban las estrellas para orientarse, crear calendarios agrícolas y predecir fenómenos naturales.\n" +
          "Gracias a la observación del cielo nocturno, aprendieron a identificar constelaciones, reconocer los movimientos del Sol y la Luna, y anticipar las estaciones del año.\n\n" +
          "Con el paso del tiempo, la astronomía fue evolucionando.\n" +
          "Lo que antes se hacía a simple vista, ahora se realiza con instrumentos avanzados como telescopios, radiotelescopios, satélites y sondas espaciales.\n" +
          "Esto ha permitido descubrir nuevos planetas, galaxias lejanas y obtener imágenes reales del universo que antes solo se podían imaginar.\n\n" +
          "Una ciencia que observa y explica:\n" +
          "La astronomía no solo observa el cielo, sino que también explica los fenómenos que ocurren en él.\n" +
          " Por ejemplo:\n" +
          "Por qué la Luna cambia de fase?\n" +
          "Por qué los planetas giran alrededor del Sol ?\n" +
          "O cómo se formó el universo después del Big Bang ?\n\n" +
          "Estas explicaciones ayudan a entender mejor la Tierra, porque nuestro planeta también forma parte del universo y obedece las mismas leyes físicas que los demás cuerpos celestes.\n\n" +
          "Una ciencia que nos conecta con el universo:\n\n" +
          "Aunque la astronomía estudia lo que está fuera de la Tierra, también nos enseña mucho sobre nosotros mismos.\n" +
          "Nos recuerda que nuestro planeta es solo una pequeña parte de un sistema solar, que a su vez está dentro de una galaxia llamada Vía Láctea, y que esta es solo una entre miles de millones en el universo.\n\n" +
          "Estudiar astronomía nos permite comprender el lugar que ocupamos en el cosmos, valorar la importancia de cuidar la Tierra, y maravillarnos con la grandeza del espacio que nos rodea.",
        images: [
          "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2013/05/11615-galaxia-m13.jpg?tf=3840x",
          "https://wallpapers.com/images/hd/astronomy-pictures-2048-x-1685-updc1897syvhxdba.jpg",
          "https://colombia.unir.net/wp-content/uploads/sites/4/2022/01/observatorio_id1166629174.jpg",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9uZG8lMjBkZSUyMHBhbnRhbGxhJTIwZGUlMjBhc3Ryb25vbWlhfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
          "https://www.minciencia.gob.cl/uploads/filer_public/6f/8e/6f8e43da-193b-46dd-b1f1-90cf29bf60e2/dia_de_la_astronomia.jpg"
        ]
      },
      {
        id: "conceptos-fundamentales",
        title: "Conceptos Fundamentales",
        content: "La astronomía es la ciencia que estudia los cuerpos celestes (como planetas, estrellas y galaxias) y los fenómenos que ocurren en el universo. Sus bases comienzan con algo tan simple como observar el cielo nocturno, una práctica que ha acompañado al ser humano desde tiempos antiguos.\n\n" +
          "A continuación, los conceptos básicos más importantes:\n\n" +
          "Observación del cielo nocturno:\n" +
          "Es el punto de partida de la astronomía. Consiste en mirar el cielo para identificar los objetos visibles, como la Luna, los planetas brillantes, las estrellas y los satélites artificiales.A simple vista se pueden reconocer patrones y movimientos que cambian con las estaciones.\n\n" +
          "Constelaciones:\n" +
          "Son grupos de estrellas que forman figuras imaginarias. Sirven como guía para orientarse y localizar otros objetos en el cielo. Ejemplos conocidos son Orión, la Osa Mayor y Escorpio.\n\n" +
          "Movimientos planetarios:\n" +
          "Los planetas del Sistema Solar giran alrededor del Sol (traslación) y también sobre su propio eje (rotación). Estos movimientos explican fenómenos como el día y la noche o las estaciones del año.\n\n" +
          "Fenómenos celestes:\n" +
          "Son eventos naturales que ocurren en el espacio y que a veces se pueden observar desde la Tierra\n\n" +
          "Eclipses: cuando la luz del Sol o de la Luna se bloquea parcial o totalmente.\n" +
          "Meteoros o estrellas fugaces: partículas que entran en la atmósfera y se queman.\n" +
          "Cometas: cuerpos de hielo y polvo que dejan una “cola” brillante al acercarse al Sol.\n\n" +
          "Sistema Solar:\n" +
          "Es el conjunto formado por el Sol (nuestra estrella) y los ocho planetas que giran a su alrededor, junto con sus lunas, asteroides y cometas.\n\n" +
          "Estrellas y galaxias:\n" +
          "Las estrellas son esferas de gas que emiten luz y calor. Miles de ellas forman las galaxias, y nosotros vivimos en una llamada Vía Láctea.\n\n" +
          "El universo:\n" +
          "Es todo lo que existe: la materia, la energía, el espacio y el tiempo. Aún se investiga cómo comenzó (por ejemplo, con el Big Bang) y cómo evoluciona.",
        images: [
          "https://www.galileo.edu/iicta/files/2023/10/001-1.jpg",
          "https://media.gettyimages.com/id/533942898/es/v%C3%ADdeo/4-k-eclipse-solar-animaci%C3%B3n.jpg?s=640x640&k=20&c=JSFilQOQNsGYfBRAqx9Fu3zzyuFbZwUHFRnwuWMbwfA=",
          "https://tm.ibxk.com.br/2025/07/02/02124135576104.jpg?ims=317x317/filters:quality(70)"

        ]
      },
      {
        id: "herramientas",
        title: "Herramientas de Observación",
        content: "Desde la antigüedad, los humanos han usado herramientas para observar el cielo: desde el ojo desnudo hasta telescopios modernos, satélites y observatorios espaciales que nos permiten explorar el universo.\n\n" +
          " A simple vista:\n" +
          "Observar el cielo sin instrumentos es el primer paso. Puedes ver la Luna, algunos planetas (como Venus o Júpiter) y muchas estrellas, Ideal para aprender a reconocer constelaciones.\n" +
          " Binoculares:\n" +
          "Aumentan la visión y permiten ver detalles de la Luna, cúmulos de estrellas y algunos planetas brillantes. Son livianos y fáciles de usar.\n\n" +
          " Telescopio:\n" +
          "Es la herramienta más usada. Hay de varios tipos:\n" +
          "• Refractores: usan lentes.\n" +
          "• Reflectores: usan espejos.\n" +
          "• Catadióptricos: \n" +
          "combinan ambos sistemas. Con ellos se pueden ver cráteres lunares, anillos de Saturno, lunas de Júpiter y galaxias lejanas.\n\n" +
          " Radiotelescopios:\n" +
          "Captan ondas de radio emitidas por objetos del espacio, lo que permite estudiar cosas que no se ven con luz visible, como púlsares y nubes de gas.\n\n" +
          " Satélites y sondas espaciales:\n" +
          "Son instrumentos que viajan fuera de la Tierra para tomar fotos, medir temperaturas, analizar atmósferas o incluso aterrizar en otros planetas.\n\n" +
          " Computadoras y software astronómico:\n" +
          "Hoy en día, la astronomía usa programas de simulación y análisis de datos que permiten estudiar millones de estrellas y galaxias.\n" +
          "(Ejemplos: Stellarium, Celestia, NASA Eyes).",
        images: [
          "https://skyandaluz.com/wp-content/uploads/2021/10/astronomia-de-posicion.jpg",
          "https://josevicentediaz.com/wp-content/uploads/2016/09/14446520_1296490970361691_1200707649_o.jpg",
          "https://media.istockphoto.com/id/182062885/es/foto/estaci%C3%B3n-espacial-en-%C3%B3rbita-de-la-tierra.jpg?s=612x612&w=0&k=20&c=2b786NR_LsNJwvNu42stJ0KjsuMNBNnpTA4jUunLrlQ="
        ]
      },
      {
        id: "importancia",
        title: "Importancia de la Astronomía",
        content: "La astronomía nos ayuda a entender nuestro lugar en el universo, contribuye al desarrollo de tecnologías, y nos permite predecir fenómenos que afectan la vida en la Tierra.\n\n" +
          "Nos ayuda a entender nuestro origen:\n" +
          "Estudia cómo se formó el universo, las estrellas y los planetas, y con eso aprendemos de dónde venimos y cómo se formó la Tierra.\n\n" +
          "Impulsa la tecnología:\n" +
          "Muchos inventos nacieron gracias a la astronomía: cámaras digitales, GPS, paneles solares, satélites meteorológicos, entre otros.\n\n" +
          "Permite predecir fenómenos naturales:\n" +
          "Como los eclipses, mareas, estaciones del año y otros movimientos que afectan la vida diaria.\n\n" +
          "Fomenta la curiosidad y el pensamiento científico:\n" +
          "Mirar el cielo despierta preguntas profundas: ¿hay vida en otros planetas?, ¿cómo comenzó todo? Esto impulsa la investigación, la imaginación y la educación científica.\n\n" +
          "Une a la humanidad:\n" +
          "No importa de dónde seamos, todos compartimos el mismo cielo. La astronomía nos recuerda que somos parte de algo mucho más grande.",
        images: [
          "https://unamglobal.unam.mx/wp-content/uploads/2024/08/importancia-de-la-astronomia001-1024x605.jpg",
          "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXN0cm9ub20lQzMlQURhfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
          "https://www.iac.es/sites/default/files/styles/color/public/images/news/GTC.jpg?itok=KVPQrm3f"
        ]
      }
    ]
  },
  "sistema-solar": {
    title: "Sistema Solar",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "El Sistema Solar es el conjunto formado por el Sol y todos los cuerpos celestes que giran a su alrededor debido a la fuerza de gravedad.\n" +
          "Está dentro de una de las ramas de nuestra galaxia, la Vía Láctea, y se encuentra a unos 26.000 años luz del centro galáctico.\n\n" +
          "El Sol es una estrella de tipo medio, compuesta principalmente de hidrógeno y helio, que genera su energía a través de reacciones nucleares en su interior.\n" +
          "Esa energía se libera en forma de luz y calor, permitiendo que haya vida en la Tierra y regulando el clima y los movimientos de los planetas.\n\n" +
          "El Sistema Solar se formó hace aproximadamente 4.600 millones de años, a partir de una gran nube de gas y polvo que se contrajo por la gravedad.\n" +
          "Con el tiempo, el material se fue agrupando: en el centro nació el Sol, y a su alrededor se formaron los planetas y demás cuerpos.\n\n" +
          "El Sistema Solar incluye:\n\n" +
          "🌞 El Sol Es el centro y el corazón del sistema.\n" +
          "🌍 Planetas – Ocho cuerpos principales que giran alrededor del Sol.\n" +
          "🌕 Satélites naturales – Cuerpos que giran alrededor de los planetas (como la Luna en la Tierra).\n" +
          "☄️ Cuerpos menores – Asteroides, cometas, meteoros y planetas enanos.\n" +
          "🌌 Polvo y gas interplanetario – Pequeñas partículas que flotan en el espacio entre los planetas.",
        images: [
          "https://media.gettyimages.com/id/1673970797/es/v%C3%ADdeo/sol-y-planetas-de-la-animaci%C3%B3n-del-sistema-solar.jpg?s=640x640&k=20&c=_44jpew8d62xZiZOMIEsSFJPAVg8wbVjs6sovmf8Cm0=",
          "https://s1.significados.com/foto/sistema-solar-og.jpg"
        ]
      },
      {
        id: "planetas-interiores",
        title: "Planetas Interiores",
        content: "Son los más cercanos al Sol y tienen una superficie sólida formada por roca y metal.\n" +
          "También se llaman planetas rocosos o telúricos.\n\n" +
          "Estos planetas son más pequeños y más densos que los exteriores, y tienen pocas o ninguna luna.\n\n" +
          "Son cuatro:\n\n" +
          "Mercurio:\n" +
          "Es el más cercano al Sol y el más pequeño del Sistema Solar.\n" +
          "No tiene atmósfera, por lo que sus temperaturas varían mucho: muy calientes de día y muy frías de noche.\n" +
          "Su superficie está llena de cráteres, parecida a la de la Luna.\n\n" +
          "Venus:\n" +
          "Es el segundo planeta desde el Sol.\n" +
          "Tiene un tamaño parecido al de la Tierra, pero su atmósfera está compuesta por dióxido de carbono y nubes de ácido sulfúrico, lo que provoca un efecto invernadero extremo.\n" +
          "Su superficie es muy caliente y volcánica.\n" +
          "Gira en sentido contrario a la mayoría de los planetas.\n\n" +
          "Tierra:\n" +
          "Es el tercer planeta desde el Sol y el único conocido que alberga vida.\n" +
          "Tiene una atmósfera rica en oxígeno y agua en estado líquido, lo que permite la existencia de una gran diversidad de seres vivos.\n\n" +
          "Posee un satélite natural, la Luna, que influye en las mareas y estabiliza el eje de rotación del planeta.\n\n" +
          "Marte:\n" +
          "Es el cuarto planeta y se le llama “el planeta rojo” por el color del hierro oxidado en su superficie.\n" +
          "Tiene montañas y volcanes gigantes, como el Monte Olimpo, el más alto del Sistema Solar.\n" +
          "Posee dos lunas pequeñas (Fobos y Deimos).\n" +
          "Se estudia porque podría haber tenido agua y vida microscópica en el pasado.",
        images: [
          "https://e1.pxfuel.com/desktop-wallpaper/270/318/desktop-wallpaper-inner-planets-planet.jpg",
          "https://media.istockphoto.com/id/2107995410/es/foto/mercurio-venus-tierra-y-marte.jpg?s=612x612&w=0&k=20&c=EB_jUCc28nTXNDxRCRMvCQPi2YR3EHRswft8CGHQHn4=",
          "https://i.pinimg.com/736x/b3/6c/5d/b36c5d879ac6e1549cf0ff6c0d2536ff.jpg"
        ]
      },
      {
        id: "planetas-exteriores",
        title: "Planetas Exteriores",
        content: "Están más lejos del Sol y son mucho más grandes.\n" +
          "Están compuestos principalmente de gases ligeros como hidrógeno y helio, o mezclas de gases congelados y no tienen una superficie sólida definida.\n\n" +
          "Se dividen a veces en dos grupos:\n" +
          "Gigantes gaseosos: Júpiter y Saturno.\n" +
          "Gigantes helados: Urano y Neptuno.\n\n" +
          "Júpiter:\n" +
          "Es el planeta más grande del Sistema Solar.\n" +
          "Podría albergar más de 1.300 Tierras en su interior.\n" +
          "Tiene una gran tormenta permanente llamada la Gran Mancha Roja.\n" +
          "Posee más de 80 lunas, siendo las más grandes Ío, Europa, Ganímedes y Calisto.\n\n" +
          "Saturno:\n" +
          "Es el segundo planeta más grande y el más llamativo por sus anillos brillantes, formados por hielo, polvo y rocas.\n" +
          "Su densidad es tan baja que podría flotar en agua.\n" +
          "Tiene más de 80 lunas, siendo Titán la más grande y una de las más interesantes por su atmósfera espesa.\n\n" +
          "Urano:\n" +
          "Tiene un color azul verdoso por el gas metano en su atmósfera.\n" +
          "Su eje de rotación está tan inclinado que parece girar acostado.\n" +
          "Tiene anillos débiles y al menos 27 lunas conocidas.\n\n" +
          "Neptuno:\n" +
          "Es el planeta más lejano del Sol.\n" +
          "Presenta vientos más rápidos que cualquier otro planeta, que pueden superar los 2.000 km/h.\n" +
          "Su color azul intenso también se debe al metano.\n" +
          "Tiene una gran tormenta conocida como la Gran Mancha Oscura.",
        images: [
          "https://planetariodebogota.gov.co/sites/default/files/Planetas%20gaseosos.jpg",
          "https://i.ytimg.com/vi/cxBfJ4OS0Xc/hqdefault.jpg",
          "https://cdn0.geoenciclopedia.com/es/posts/3/2/9/que_son_los_planetas_gaseosos_923_0_600.jpg"
        ]
      },
      {
        id: "cuerpos-menores",
        title: "Cuerpos Menores",
        content: "Además de los ocho planetas, existen miles de objetos más pequeños que también forman parte del sistema.\n" +
          "Aunque no son tan grandes ni tan conocidos, cumplen un papel muy importante.\n\n" +
          "Asteroides:\n" +
          "Son rocas metálicas o rocosas que orbitan alrededor del Sol.\n" +
          "La mayoría se encuentra en el Cinturón de Asteroides, entre Marte y Júpiter.\n" +
          "Algunos son restos de la formación del Sistema Solar.\n\n" +
          "Cometas:\n" +
          "Están formados por hielo, polvo y roca.\n" +
          "Cuando se acercan al Sol, el calor hace que el hielo se evapore y forme una cola brillante.\n" +
          "Sus órbitas suelen ser muy alargadas.\n" +
          "Ejemplo famoso: el Cometa Halley, que se puede ver desde la Tierra cada 76 años.\n\n" +
          "Meteoroides, Meteoros y Meteoritos:\n" +
          "Los meteoroides son pequeños fragmentos de roca o metal que viajan por el espacio.\n" +
          "Cuando entran en la atmósfera de la Tierra y se queman, producen una estrella fugaz (meteoro).\n" +
          "Si logran llegar al suelo, se llaman meteoritos.\n\n" +
          "Planetas enanos:\n" +
          "Son cuerpos más pequeños que los planetas pero más grandes que los asteroides.\n" +
          "Giran alrededor del Sol y tienen forma casi esférica, pero no han limpiado su órbita de otros objetos.\n" +
          "Ejemplos: Plutón, Ceres, Eris, Makemake y Haumea.\n" +
          "Plutón fue considerado el noveno planeta hasta 2006, cuando fue reclasificado como planeta enano.",
        images: [
          "https://wallpapers.com/images/hd/asteroid-2560-x-1600-wallpaper-xj66jq6v866oak48.jpg",
          "https://media.istockphoto.com/id/153984222/es/foto/cometa.jpg?s=612x612&w=0&k=20&c=xY5fXYADcaOZ9Yd7wdjnPcKG4iO2MHYfhRxh40SjMx4=",
          "https://services.meteored.com/img/article/planetas-enanos-cuantos-hay-y-cuales-son-sus-caracteristicas-1704234265740_1280.jpg"
        ]
      }
    ]
  },
  "astrofisica": {
    title: "Astrofísica",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La astrofísica es una de las ramas más importantes de la astronomía moderna.\n" +
          "Se encarga de estudiar los cuerpos celestes y los fenómenos del universo aplicando las leyes de la física y las matemáticas y su objetivo es comprender cómo funciona el universo, no solo qué hay en él.\n\n" +
          "Por ejemplo, la astrofísica analiza:\n" +
          "La composición de las estrellas (qué elementos químicos las forman).\n" +
          "La temperatura y brillo de los cuerpos celestes.\n" +
          "Cómo la gravedad mantiene unidos los sistemas planetarios.\n" +
          "Cómo la energía viaja a través del espacio.\n\n" +
          "Gracias a la astrofísica, hoy entendemos que las estrellas producen su energía mediante fusión nuclear, que los planetas se mantienen en órbita por la gravedad, y que el universo se está expandiendo.\n\n" +
          "También se apoya en otras ciencias, como:\n" +
          "La química (para saber qué elementos hay en los planetas o estrellas).\n" +
          "La matemática (para calcular distancias y trayectorias).\n" +
          "La informática (para analizar grandes volúmenes de datos astronómicos).\n\n" +
          "En resumen, la astrofísica es la ciencia que nos ayuda a entender no solo qué hay en el universo, sino cómo y por qué funciona de la manera en que lo hace.",
        images: [
          "https://media.gettyimages.com/id/1582388838/es/v%C3%ADdeo/agujero-de-gusano-abstracto-futurista-metaverso-tecnol%C3%B3gico.jpg?s=640x640&k=20&c=vPqKVii_eZ563QN_-knnvIw-2SGE6SfTBGucdCPsFOQ=",
          "https://wallpapers.com/images/featured/astrofisica-mcbrrxoytmrmogwl.jpg"
        ]
      },
      {
        id: "estrellas",
        title: "Física Estelar",
        content: "La física estelar se concentra en las estrellas, que son los ladrillos básicos del universo.\n"+
            "Cada estrella pasa por un ciclo de vida, que puede durar millones o miles de millones de años.\n\n"+
            "Etapas principales de una estrella:\n"+
            "Nacimiento:\n"+
            "Las estrellas se forman en nubes de gas y polvo llamadas nebulosas. Cuando parte del material se concentra por la gravedad, la temperatura aumenta hasta que comienza la fusión nuclear, dando origen a una nueva estrella.\n\n"+
            "Vida estable:\n"+
            "Durante la mayor parte de su existencia, la estrella convierte hidrógeno en helio, liberando luz y calor. En esta etapa se encuentra el Sol, en lo que se llama la secuencia principal.\n\n"+
            "Vejez y muerte:\n"+
            "Cuando se agota el combustible nuclear, la estrella cambia.\n"+
            "Las más pequeñas se transforman en enanas blancas.\n"+
            "Las medianas se vuelven gigantes rojas antes de apagarse.\n"+
            "Las muy grandes pueden explotar como supernovas, y dejar atrás estrellas de neutrones o agujeros negros.\n\n"+
            "La física estelar permite calcular la masa, la edad y la temperatura de una estrella solo analizando su luz (mediante la espectroscopía).",
        images: [
          "https://media.gettyimages.com/id/1514138928/es/v%C3%ADdeo/volando-a-trav%C3%A9s-de-estrellas-y-nebulosas-video-de-archivo.jpg?s=640x640&k=20&c=ACIFlk6sJU09gLYdrekSBd5GuRfrjKT9Lf67ymUykZc=",
          "https://i.ytimg.com/vi/TNMOlAGvQZc/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCcgKyh_MA8=&rs=AOn4CLAwupyblztjIKDyQvmOVzt_8M-mMg"
        ] 
      },
      {
        id: "galaxias",
        title: "Estructura Galáctica",
        content: "Las galaxias son enormes conjuntos de estrellas, polvo, gas, planetas y materia oscura.\n"+
            "Cada galaxia contiene miles de millones de estrellas, y hay miles de millones de galaxias en el universo observable.\n\n"+
            "La Vía Láctea, donde vivimos, tiene forma de espiral con varios brazos que giran alrededor de un centro brillante.\n"+
            "En el núcleo de nuestra galaxia hay un agujero negro supermasivo llamado Sagitario A*.\n\n"+
            "Los astrónomos estudian la estructura galáctica para entender:\n"+
            "Cómo nacen y evolucionan las galaxias.\n"+
            "Por qué tienen distintas formas: espirales (como la Vía Láctea), elípticas (más redondeadas) o irregulares.\n"+
            "Cómo se agrupan formando cúmulos y supercúmulos.\n"+
            "Cómo influye la materia oscura, que no emite luz pero representa gran parte de la masa del universo.\n\n"+
            "Las galaxias no están quietas: se mueven, giran y a veces chocan entre sí.\n"+
            "Por ejemplo, la Vía Láctea y la galaxia de Andrómeda están en camino de colisionar dentro de unos 4.000 millones de años, formando una nueva galaxia más grande.",
        images: [
          "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/03/9-webb-19-images.webp",
          "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/NZZBKDUUS5BAPOFWRDB4ZVXJXA.jpg"
        ]
      },
      {
        id: "cosmologia",
        title: "Cosmología Física",
        content: "La cosmología es la ciencia que estudia el universo como un todo:La cosmología es la ciencia que estudia el universo como un todo: su origen, evolución, estructura y destino final.\n\n" +
            "La idea más aceptada sobre el origen del universo es el Big Bang, una gran expansión que ocurrió hace unos 13.800 millones de años.\n\n" +
            "Desde entonces, el universo ha estado en constante expansión, con galaxias alejándose unas de otras.\n\n" +
            "Los cosmólogos investigan:\n" +
            "La radiación cósmica de fondo, que es una “huella” del Big Bang.\n" +
            "La materia oscura, que no se ve pero forma la mayor parte de la masa del universo.\n" +
            "La energía oscura, una fuerza misteriosa que acelera la expansión del cosmos.\n" +
            "La forma del universo (si es finito, infinito, plano o curvado).\n\n" +

            "Algunos científicos creen que el universo podría seguir expandiéndose para siempre, mientras que otros piensan que podría detenerse y colapsar nuevamente en un fenómeno llamado Big Crunch.\n\n" +
            "La cosmología combina observaciones astronómicas con teorías de la física moderna, como la relatividad de Einstein y la mecánica cuántica, para construir una imagen completa del cosmos.",
        images: [
          "https://st4.depositphotos.com/16761810/23709/i/450/depositphotos_237091408-stock-photo-planets-galaxy-cosmos-physical-cosmology.jpg",
          "https://e1.pxfuel.com/desktop-wallpaper/187/871/desktop-wallpaper-best-3-cosmology-on-hip-cosmology.jpg"
        ]
      }
    ]
  },
  "exploracion-espacial": {
    title: "Exploración Espacial",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es?",
        content: "La exploración espacial es el conjunto de actividades que realiza el ser humano para investigar y conocer el espacio exterior.\n" +
          "Esto incluye el envío de naves espaciales, satélites, sondas y misiones tripuladas para estudiar planetas, lunas, asteroides y otros cuerpos celestes.\n\n" +
          "Su objetivo es comprender mejor el universo, descubrir nuevos mundos y desarrollar tecnologías que también pueden mejorar la vida en la Tierra.\n\n" +
          "Todo comenzó con la curiosidad del ser humano por saber qué hay más allá del cielo. Al principio, la exploración se hacía desde el planeta, observando con telescopios.\n" +
          "Pero con el avance de la ciencia y la tecnología, fue posible enviar cohetes, satélites y naves espaciales más allá de la atmósfera terrestre.\n\n" +
          "La era espacial empezó oficialmente en 1957, cuando la Unión Soviética lanzó el Sputnik 1, el primer satélite artificial. Desde ese momento, la humanidad ha enviado sondas, robots y astronautas a explorar el espacio, visitando planetas, lunas y más allá.\n\n" +
          "La exploración espacial no solo busca descubrir nuevos lugares, sino también entender cómo se formó el universo, si existe vida en otros planetas y cómo proteger la Tierra de amenazas del espacio, como asteroides o radiación solar.",
        images: [
          "https://media.istockphoto.com/id/1353874144/es/foto/astronauta-en-el-espacio-exterior-spaceman-con-fondo-estrellado-y-gal%C3%A1ctico-fondo-de-pantalla.jpg?s=612x612&w=0&k=20&c=8I-HgT_AfvRa34iFHAh17qcLrIHvZQZ8GvLLj_Cl7Yk=",
          "https://okdiario.com/img/2024/01/02/la-exploracion-espacial_--cuales-son-los-proximos-destinos-de-la-humanidad-en-el-espacio_.jpg"
        ]
      },
      {
        id: "tecnologia",
        title: "Tecnología Espacial",
        content: "La tecnología espacial incluye todas las herramientas, máquinas e inventos creados para explorar el espacio.\n" +
           "Esto va desde los cohetes que impulsan las naves, hasta los satélites artificiales, robots exploradores, trajes espaciales y sistemas de comunicación que permiten enviar y recibir información desde millones de kilómetros de distancia.\n\n" +
           "Algunos ejemplos importantes de tecnología espacial son:\n" +
           "Satélites de comunicación: permiten llamadas, televisión y conexión a internet desde casi cualquier lugar del mundo.\n" +
           "Sondas espaciales: viajan sin tripulación para explorar planetas, lunas o asteroides (como Voyager, New Horizons o Juno).\n" +
           "Rovers: robots que se mueven sobre la superficie de otros planetas, como Curiosity y Perseverance en Marte.\n" +
           "Telescopios espaciales: como el Hubble o el James Webb, que observan el universo desde fuera de la atmósfera terrestre con una claridad impresionante.\n\n" +
           "La tecnología espacial no solo sirve para la astronomía; también tiene aplicaciones en la vida diaria, como en la medicina, la meteorología, el transporte o la ingeniería. Muchas cosas que hoy usamos —como los GPS o las cámaras de los celulares— nacieron gracias a la investigación espacial.",
        images: [
          "https://wallpapers.com/images/hd/space-technology-3840-x-2160-wallpaper-8r4le3r5lx79o276.jpg",
          "https://preview.redd.it/destiny-2-seraph-space-station-wallpaper-v0-9m1u3muly2ca1.jpg?auto=webp&s=4e2a48272526d19560db60573848ec3c5f3ece75"
        ]
      },
      {
        id: "misiones-tripuladas",
        title: "Misiones Tripuladas",
        content: "Las misiones tripuladas son aquellas en las que viajan astronautas al espacio.\n" +
           "Estas misiones son más complejas y costosas, porque se debe garantizar la seguridad, el oxígeno, los alimentos y la comunicación de los tripulantes durante todo el viaje.\n\n\n" +
           "La primera persona en viajar al espacio fue Yuri Gagarin (1961), a bordo de la nave Vostok 1.\n" +
           "A partir de ahí, se realizaron muchas otras misiones, pero el momento más importante fue en 1969, cuando Neil Armstrong y Buzz Aldrin llegaron a la Luna con la misión Apolo 11.\n" +
           "Fue la primera vez que un ser humano caminó sobre otro cuerpo celeste.\n\n" +
           "Desde entonces, las misiones tripuladas han servido para construir estaciones espaciales (como la Estación Espacial Internacional, o EEI), realizar experimentos científicos, y probar tecnologías para futuros viajes más lejanos, como los de Marte o la Luna.\n\n" +
           "Hoy en día, astronautas de muchos países viven y trabajan en el espacio durante meses, realizando estudios sobre cómo el cuerpo humano reacciona fuera de la Tierra o cómo cultivar alimentos en microgravedad.",
        images: [
          "https://img.asmedia.epimg.net/resizer/v2/QS64C4QD7JEDHNDF3MCEZR7PMU.jpg?auth=cb162283c35826a4bcb9c6d75cd8d02bc2004b122e6b384414b46762eb406b0c&width=1472&height=828&smart=true",
          "https://content.nationalgeographic.com.es/medio/2022/11/22/el-comandante-del-apolo-15-dave-scott-levantando-polvo-mientras-se-aleja-del-lunar-rover-31-de-julio-de-1971_704d03da_800x800.jpg"
        ]
      },
      {
        id: "futuro",
        title: "El Futuro de la Exploración",
        content: "El futuro de la exploración espacial es emocionante y lleno de posibilidades.\n" +
           "Los avances tecnológicos permitirán llegar más lejos, permanecer más tiempo en el espacio y colaborar más entre países y empresas.\n\n" +
           "Algunos de los objetivos del futuro incluyen:\n" +
           "Regresar a la Luna para construir bases permanentes, como parte del programa Artemis de la NASA.\n\n" +
           "Enviar humanos a Marte, lo que sería uno de los mayores logros de la historia.\n\n" +
           "Explorar lunas heladas, como Europa (de Júpiter) o Encélado (de Saturno), donde podría existir vida bajo el hielo.\n\n" +
           "Desarrollar turismo espacial, permitiendo que personas no astronautas viajen al espacio.\n\n" +
           "Proteger la Tierra vigilando asteroides y basura espacial.\n\n" +
           "También se espera que en el futuro la exploración espacial ayude a obtener nuevos recursos, desarrollar tecnologías limpias y fomentar la cooperación internacional, ya que explorar el cosmos es un desafío que involucra a toda la humanidad.",
        images: [
          "https://futuroelectrico.com/wp-content/uploads/2024/06/tecnologia-espacial-2.jpg",
          "https://futuroelectrico.com/wp-content/uploads/2020/09/1-Mision-a-Marte-Principal.jpg"
        ]
      }
    ]
  },
  "misiones-espaciales": {
    title: "Misiones Espaciales",
    sections: [
      {
        id: "que-son",
        title: "¿Qué son?",
        content: "Las misiones espaciales son proyectos creados por científicos, ingenieros y agencias espaciales para explorar el espacio y estudiar todo lo que hay fuera de la Tierra.\n" +
            "Cada misión tiene un objetivo específico, como estudiar planetas, observar estrellas, investigar el clima, o incluso enviar astronautas a vivir en el espacio.\n\n" +
            "Las misiones espaciales ayudan a responder preguntas muy importantes, como:\n" +
            "¿Cómo se formó el universo?\n" +
            "¿Hay vida en otros planetas?\n" +
            "¿Cómo funciona el clima en la Tierra y en otros lugares?\n" +
            "¿Cómo se comportan los materiales o el cuerpo humano fuera de la Tierra?\n" +
            "¿Cómo proteger nuestro planeta de asteroides u otros peligros espaciales?\n\n" +
            "Estas misiones han sido posibles gracias al desarrollo de la tecnología espacial, como los cohetes, satélites, sondas y naves espaciales.\n" +
            "Cada una de ellas cumple una función esencial: unas observan desde la órbita terrestre, otras viajan a planetas lejanos, y algunas llevan seres humanos más allá de nuestro planeta.\n\n" +
            "Existen dos grandes tipos de misiones espaciales:\n" +
            "Misiones no tripuladas:\n\n" +
            "No llevan personas a bordo.\n" +
            "Usan satélites, sondas o robots que envían datos e imágenes desde el espacio.\n" +
            "Son muy útiles porque pueden viajar a lugares donde sería peligroso o imposible enviar humanos, como el Sol o los planetas exteriores.\n\n" +
            "Ejemplos: Voyager 1 y 2, Curiosity, James Webb, New Horizons.\n\n" +
            "Misiones tripuladas:\n\n" +
            "Llevan astronautas que viajan, experimentan y trabajan directamente en el espacio.\n" +
            "Estas misiones requieren una gran preparación, ya que deben garantizar oxígeno, comida, comunicación y seguridad.\n\n" +
            "Ejemplos: Apolo 11, Soyuz, Space Shuttle, Estación Espacial Internacional.",
        images: [
          "https://media.istockphoto.com/id/1486146016/es/foto/el-transbordador-espacial-despega-en-el-fondo-del-cielo-azul.jpg?s=612x612&w=0&k=20&c=FOAZLjBxPZvq9zmaIYCAXOc-L-7axO78yu-JT7QTBDU=",
          "https://media.istockphoto.com/id/494878534/es/foto/espacio-sistema-de-lanzamiento-despega.jpg?s=612x612&w=0&k=20&c=yJHfjMSZak-CUyLkjycwV_fEoNeYjoVeAqwuBATqo28=",
          "https://us.123rf.com/450wm/annadarcraft/annadarcraft2305/annadarcraft230501678/205051567-transbordador-espacial-despegando-hacia-el-cielo-creado-con-tecnolog%C3%ADa-de-inteligencia-artificial.jpg?ver=6"
        ]
      },
      {
        id: "misiones-historicas",
        title: "Misiones Históricas",
        content: "Las misiones históricas fueron las primeras grandes aventuras humanas en el espacio.\n" +
            "Sentaron las bases de toda la exploración moderna y demostraron que el ser humano puede alcanzar lo que antes parecía imposible.\n\n" +
            "🛰️ Sputnik 1 (1957) – El comienzo de la era espacial:\n\n"+
            "Fue el primer satélite artificial lanzado por la Unión Soviética.\n" +
            "Solo era una pequeña esfera metálica, pero su lanzamiento cambió la historia: demostró que era posible colocar objetos en órbita.\n" +
            "Desde entonces comenzó la “carrera espacial” entre Estados Unidos y la Unión Soviética.\n\n" +
            "👨‍🚀 Vostok 1 (1961) – El primer ser humano en el espacio:\n\n"+
            "El cosmonauta Yuri Gagarin se convirtió en el primer hombre en viajar al espacio.\n" +
            "Orbó la Tierra una vez y regresó sano y salvo.\n" +
            "su misión mostró que los humanos podían sobrevivir en el espacio y abrió la puerta a futuras misiones tripuladas.\n" +
            "Su viaje inspiró a millones de personas y marcó un momento histórico.\n\n" +
            "🌕 Apolo 11 (1969) – El primer alunizaje:\n\n"+
            "Fue la primera misión en la que el ser humano pisó la Luna.\n" +
            "Neil Armstrong y Buzz Aldrin caminaron sobre la superficie lunar, mientras Michael Collins orbitaba alrededor en el módulo de mando.\n" +
            "Armstrong pronunció la famosa frase: “Es un pequeño paso para el hombre, pero un gran salto para la humanidad”.\n\n" +
            "Este logro demostró la capacidad tecnológica y científica de la humanidad y sigue siendo uno de los hitos más importantes en la historia de la exploración espacial.\n\n" +
            "🛰️ Voyager 1 y 2 (1977) – Los mensajeros del sistema solar\n\n"+
            "Fueron dos sondas lanzadas por la NASA para explorar los planetas exteriores del sistema solar.\n" +
            "Visitaron Júpiter, Saturno, Urano y Neptuno, enviando imágenes y datos que revolucionaron nuestro conocimiento de estos mundos.\n" +
            "Voyager 1 es ahora el objeto hecho por el hombre más lejano de la Tierra, habiendo entrado en el espacio interestelar en 2012.\n\n" +
            "Estas misiones históricas no solo ampliaron nuestro conocimiento del espacio, sino que también inspiraron a generaciones enteras a soñar con las estrellas y a trabajar para alcanzar nuevas fronteras.\n\n"+
            "🚀 Space Shuttle (1981–2011) – Reutilización espacial\n\n"+
            "Los transbordadores espaciales fueron naves reutilizables que llevaron astronautas y satélites al espacio durante 30 años.\n" +
            "Permitieron la construcción de la Estación Espacial Internacional y el lanzamiento del Telescopio Espacial Hubble.",
        images: [
          "https://media.cnn.com/api/v1/images/stellar/prod/cnne-621437-190207123342-xl-nasa-archives-p176-super-169.jpg?c=16x9&q=h_833,w_1480,c_fill",
          "https://wallpapers.com/images/hd/voyager-pictures-ts1347hevi7wzdej.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Space_Shuttle_Columbia_launching.jpg/1024px-Space_Shuttle_Columbia_launching.jpg",
          "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2019/06/apolo-11_3.jpg?tf=3840x"
        ] 
      },
      {
        id: "misiones-actuales",
        title: "Misiones Actuales",
        content: "Hoy en día, la exploración del espacio continúa con nuevas tecnologías, cooperación internacional y la participación de empresas privadas.\n\n" +
            "Las misiones actuales buscan explorar más lejos, con más precisión y menor costo.\n\n" +
            "🌍 Estación Espacial Internacional (EEI):\n\n"+
            "Es un laboratorio flotante que orbita la Tierra cada 90 minutos.\n" +
            "Astronautas de diferentes países viven y trabajan allí, realizando experimentos científicos en microgravedad.\n" +
            "La EEI es un ejemplo de cooperación internacional en la exploración espacial.\n\n" +
            "🔭 Telescopio Espacial James Webb (2021):\n\n"+
            "Es el telescopio más grande y avanzado jamás lanzado al espacio.\n" +
            "Está diseñado para observar las primeras galaxias formadas después del Big Bang y estudiar atmósferas de exoplanetas en busca de signos de vida.\n" +
            "Ayuda a entender cómo nació el universo y si existen planetas parecidos a la Tierra.\n\n" +
            "🤖 Rover Perseverance (2020):\n\n"+
            "Es un robot que explora Marte, buscando señales de vida pasada y probando nuevas tecnologías.\n" +
            "Lleva un helicóptero llamado Ingenuity, que ha realizado vuelos exitosos en la atmósfera marciana.\n" +
            "Perseverance también recolecta muestras de suelo y roca para futuras misiones que las traerán a la Tierra.\n\n" +
            "Estas misiones actuales no solo amplían nuestro conocimiento del espacio, sino que también preparan el camino para futuras exploraciones más ambiciosas.\n\n"+
            "🌞 Solar Orbiter y Parker Solar Probe:\n\n"+
            "Son misiones que estudian el Sol de cerca, analizando su energía y su viento solar, lo que ayuda a proteger nuestros satélites y sistemas eléctricos en la Tierra.\n\n"+
            "🪐 JUICE (2023):\n\n"+
            "Es una misión de la Agencia Espacial Europea (ESA) para estudiar las lunas heladas de Júpiter, como Europa, Ganímedes y Calisto, que podrían tener océanos subterráneos con condiciones para la vida.",
        images: [
          "https://cdn.pixabay.com/photo/2012/11/28/11/25/satellite-67718_1280.jpg",
          "https://content.nationalgeographic.com.es/medio/2021/12/20/jamesweb_9aefcc07_800x800.jpg",
          "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/06/PIA23764-16-1-jpg.webp"
        ]
      },
      {
        id: "misiones-futuras",
        title: "Misiones Futuras",
        content: "El futuro de la exploración espacial es uno de los más emocionantes de la historia.\n" +
            "Las misiones planeadas para las próximas décadas buscan regresar a la Luna, llegar a Marte y descubrir nuevos mundos habitables.\n\n" +
            "🌕 Programa Artemis (NASA):\n\n"+
            "Este programa busca regresar a la Luna.\n" +
            "La misión Artemis III llevará a la primera mujer y a la primera persona de color a caminar sobre la superficie lunar.\n" +
            "Además, se planea construir una base lunar permanente y una estación espacial en órbita lunar llamada Gateway.\n\n" +
            "🔴 Viaje humano a Marte:\n\n"+
            "Tanto la NASA como SpaceX (empresa de Elon Musk) planean enviar astronautas a Marte en las próximas décadas.\n" +
            "El objetivo es estudiar si el planeta puede albergar vida y preparar el terreno para una futura colonia humana.\n\n" +
            "🪐 Exploración de lunas heladas:\n\n"+
            "Misiones como Europa Clipper y Dragonfly buscarán signos de vida en las lunas de Júpiter y Saturno, que podrían tener océanos bajo su superficie helada.\n\n" +
            "🌠 Telescopios del futuro:\n\n"+
            "Se construirán nuevos telescopios espaciales que podrán detectar planetas similares a la Tierra, analizar su atmósfera y buscar posibles señales de vida extraterrestre.\n\n" +
            "🧑‍🚀 Turismo y colonias espaciales:\n\n"+
            "Empresas privadas como Blue Origin, SpaceX y Virgin Galactic trabajan en proyectos de turismo espacial, permitiendo que personas comunes puedan viajar fuera de la Tierra.\n" +
            "También se estudia la posibilidad de colonias en la Luna o Marte, donde la humanidad podría vivir algún día.\n\n" +
            "Estas misiones futuras no solo ampliarán nuestro conocimiento del universo, sino que también podrían cambiar la forma en que vivimos y entendemos nuestro lugar en el cosmos.",
            
        images: [
          "https://content.nationalgeographic.com.es/medio/2022/08/24/el-cohete-sls-de-artemis-i-y-la-nave-espacial-orion-en-fase-de-ensamblaje_7189d70a_1280x853.jpg",
          "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/72JDSUTSTD54BGNNUYL6FS6V4I.jpg",
          "https://danielmarin.naukas.com/files/2024/04/Captura-de-pantalla-2024-04-20-a-las-22.09.30.png"
        ]
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
                <div key={section.id} id={section.id} className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-8 pb-16">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/20 pb-2">
                        {section.title}
                      </h2>
                      <div className="text-white/90 leading-relaxed whitespace-pre-line">
                        {section.content.split("\n").map((line, i) => {
                          //  líneas que parecen títulos terminan con ":"
                          if (line.trim().endsWith(":")) {
                            return (
                              <p key={i} className="font-bold mt-3">
                                {line}
                              </p>
                            );
                          }
                          // líneas que comienzan con "•" para darles estilo 
                          else if (line.trim().startsWith("•")) {
                            return (
                              <p key={i} className="ml-4 before:content-['•_']">
                                {line.replace("•", "").trim()}
                              </p>
                            );
                          }
                          // Resto del texto normal
                          else {
                            return <p key={i}>{line}</p>;
                          }
                        })}
                      </div>
                    </div>

                    {/* soporta `images[]` o `image` singular*/}
                    {(() => {
                      const s = section as any; // convierte a any aquí solo
                      const imgs = Array.isArray(s.images)
                        ? s.images
                        : s.image
                          ? [s.image]
                          : [];

                      if (imgs.length === 0) return null;

                      return (
                        <div className="mt-20 flex flex-col space-y-8 lg:w-80">
                          {imgs.map((imgSrc: string, idx: number) => (
                            <div
                              key={idx}
                              className="aspect-video bg-slate-800 rounded-lg overflow-hidden shadow-lg"
                            >
                              <img
                                src={imgSrc}
                                alt={`${section.title} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })()}
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
