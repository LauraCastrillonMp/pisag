-- Insert sample news articles (these will be visible to everyone)
-- Note: author_id will be NULL for these sample articles since we don't have a specific admin user yet

INSERT INTO public.news_articles (title, excerpt, content, category, image_url, published_at) VALUES
(
  'La sonda Athena ya está en la Luna para su persecución del alunizaje',
  'La NASA logra un hito histórico con el aterrizaje exitoso de la sonda Athena en la superficie lunar.',
  'La NASA ha anunciado el exitoso alunizaje de la sonda Athena, marcando un hito importante en la exploración lunar moderna. La misión tiene como objetivo estudiar la composición del suelo lunar y buscar recursos que puedan ser utilizados en futuras misiones tripuladas.

La sonda, que fue lanzada hace tres meses, aterrizó en el cráter Shackleton cerca del polo sur lunar, una región de gran interés científico debido a la presencia de hielo de agua en cráteres permanentemente sombreados.

El equipo de la misión celebró el éxito del alunizaje después de meses de preparación y navegación precisa. Los primeros datos científicos se esperan en las próximas semanas, cuando los instrumentos de la sonda comiencen sus operaciones completas.

Este logro representa un paso crucial hacia el programa Artemis de la NASA, que busca establecer una presencia humana sostenible en la Luna para finales de esta década.',
  'missions',
  '/placeholder.svg?height=400&width=800',
  NOW() - INTERVAL '2 days'
),
(
  'Tycho: El exoplaneta infernal que desafía los límites de la habitabilidad',
  'Astrónomos descubren un exoplaneta con condiciones extremas que desafía nuestra comprensión de los mundos habitables.',
  'Un equipo internacional de astrónomos ha descubierto Tycho-1b, un exoplaneta que presenta condiciones tan extremas que está redefiniendo los límites de lo que consideramos habitable.

Ubicado a 120 años luz de la Tierra, este mundo rocoso orbita tan cerca de su estrella que su temperatura superficial alcanza los 2,400 grados Celsius, suficiente para derretir hierro. Sin embargo, lo más sorprendente es que el planeta parece tener una atmósfera densa que, según los modelos, podría contener compuestos orgánicos complejos.

Los investigadores utilizaron el Telescopio Espacial James Webb para analizar la luz que pasa a través de la atmósfera del planeta durante sus tránsitos. Los datos revelaron la presencia de moléculas que normalmente se asocian con procesos biológicos, aunque en este caso probablemente sean el resultado de procesos geoquímicos extremos.

Este descubrimiento nos recuerda que el universo es mucho más diverso y sorprendente de lo que imaginamos, y que debemos mantener una mente abierta sobre dónde y cómo podría existir la vida.',
  'discoveries',
  '/placeholder.svg?height=400&width=800',
  NOW() - INTERVAL '5 days'
),
(
  'La NASA logra la mejor aproximación del Sol: Un hito en exploración espacial',
  'La sonda Parker Solar Probe establece un nuevo récord al acercarse más que nunca a nuestra estrella.',
  'La sonda Parker Solar Probe de la NASA ha establecido un nuevo récord histórico al realizar el acercamiento más cercano jamás logrado al Sol, pasando a solo 6.1 millones de kilómetros de la superficie solar.

Durante este encuentro cercano, la sonda experimentó temperaturas de hasta 1,400 grados Celsius en su escudo térmico, mientras que sus instrumentos científicos operaban a temperatura ambiente gracias a su innovador sistema de protección térmica.

Los datos recopilados durante este sobrevuelo proporcionarán información crucial sobre la corona solar, el viento solar y los campos magnéticos del Sol. Estos conocimientos son fundamentales para comprender mejor el clima espacial y proteger nuestros satélites y sistemas de comunicación en la Tierra.

La misión Parker Solar Probe continuará realizando acercamientos cada vez más cercanos al Sol hasta 2025, cuando se espera que alcance su distancia mínima de aproximadamente 6 millones de kilómetros.',
  'missions',
  '/placeholder.svg?height=400&width=800',
  NOW() - INTERVAL '1 week'
),
(
  'Lluvia de meteoros Perseidas: El espectáculo celeste del año',
  'Prepárate para observar una de las lluvias de meteoros más espectaculares, con hasta 100 meteoros por hora.',
  'La lluvia de meteoros Perseidas, uno de los eventos astronómicos más esperados del año, alcanzará su punto máximo este fin de semana, ofreciendo un espectáculo celestial impresionante para observadores de todo el hemisferio norte.

Las Perseidas son causadas por los restos del cometa Swift-Tuttle, que orbita el Sol cada 133 años. Cuando la Tierra pasa a través de la estela de escombros dejada por el cometa, estas partículas entran en nuestra atmósfera a velocidades de hasta 60 kilómetros por segundo, creando las brillantes estelas de luz que conocemos como meteoros.

Este año, las condiciones serán especialmente favorables para la observación, ya que la Luna estará en fase creciente y se pondrá temprano en la noche, dejando cielos oscuros ideales para ver los meteoros. Los expertos predicen que podrían ser visibles hasta 100 meteoros por hora en el pico de actividad.

Para disfrutar mejor del espectáculo, se recomienda alejarse de las luces de la ciudad, permitir que los ojos se adapten a la oscuridad durante al menos 20 minutos, y mirar hacia el noreste después de la medianoche.',
  'celestial_events',
  '/placeholder.svg?height=400&width=800',
  NOW() - INTERVAL '3 days'
);
