-- Complete content seed based on pisag1.odoo.com
-- This script adds comprehensive content for all knowledge sections

-- First, ensure all knowledge sections exist (based on pisag1.odoo.com)
INSERT INTO public.knowledge_sections (title, description, difficulty, icon) VALUES
  ('Astronomía', 'Es la ciencia que estudia el universo, incluyendo los astros como planetas, estrellas, galaxias y otros cuerpos celestes. Se encarga de analizar su origen, evolución, composición y movimientos.', 'beginner', '🌟'),
  ('Sistema Solar', 'El Sistema Solar es nuestro hogar en el vasto universo. Desde los rocosos mundos interiores hasta los gigantes gaseosos y los lejanos cuerpos helados, cada rincón de este sistema encierra maravillas y misterios por descubrir.', 'beginner', '🪐'),
  ('Astrofísica', 'Es la ciencia que estudia el universo, desde los átomos que componen las estrellas hasta los agujeros negros y la expansión del cosmos. Nos ayuda a entender cómo nació, evoluciona y qué destino le espera al universo.', 'advanced', '⚛️'),
  ('Exploración Espacial', 'Desde que el ser humano alzó la vista al cielo, soñó con explorar lo desconocido. Hoy, la exploración espacial nos lleva más allá de la Tierra, revelando los secretos del universo y desafiando los límites de nuestra tecnología.', 'intermediate', '🚀'),
  ('Misiones Espaciales', 'Las misiones espaciales han llevado a la humanidad más allá de los límites de la Tierra, explorando planetas, lunas y el vasto universo. Cada misión nos acerca a descubrir lo desconocido y entender nuestro lugar en el cosmos.', 'intermediate', '🛰️')
ON CONFLICT (title) DO NOTHING;

-- Add comprehensive quiz questions for Astronomía
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuál es la estrella más cercana a la Tierra?',
  '["La Luna", "El Sol", "Próxima Centauri", "Sirio"]'::jsonb,
  1,
  'El Sol es la estrella más cercana a la Tierra, ubicada a aproximadamente 150 millones de kilómetros.',
  10
FROM public.knowledge_sections WHERE title = 'Astronomía';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es una galaxia?',
  '["Un planeta grande", "Un sistema de estrellas, gas y polvo", "Una estrella brillante", "Un agujero negro"]'::jsonb,
  1,
  'Una galaxia es un sistema masivo compuesto por estrellas, gas, polvo cósmico y materia oscura, unidos por la gravedad.',
  10
FROM public.knowledge_sections WHERE title = 'Astronomía';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué estudia la astronomía?',
  '["Solo los planetas", "El universo y todos los cuerpos celestes", "Solo las estrellas", "Solo la Tierra"]'::jsonb,
  1,
  'La astronomía es la ciencia que estudia el universo, incluyendo los astros como planetas, estrellas, galaxias y otros cuerpos celestes.',
  10
FROM public.knowledge_sections WHERE title = 'Astronomía';

-- Add comprehensive quiz questions for Sistema Solar
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuántos planetas tiene nuestro Sistema Solar?',
  '["6", "7", "8", "9"]'::jsonb,
  2,
  'Nuestro Sistema Solar tiene 8 planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Plutón fue reclasificado como planeta enano en 2006.',
  10
FROM public.knowledge_sections WHERE title = 'Sistema Solar';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuál es el planeta más grande del Sistema Solar?',
  '["Saturno", "Júpiter", "Neptuno", "Urano"]'::jsonb,
  1,
  'Júpiter es el planeta más grande del Sistema Solar, con un diámetro de aproximadamente 143,000 kilómetros, más de 11 veces el diámetro de la Tierra.',
  10
FROM public.knowledge_sections WHERE title = 'Sistema Solar';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué planeta es conocido como el "Planeta Rojo"?',
  '["Venus", "Marte", "Júpiter", "Mercurio"]'::jsonb,
  1,
  'Marte es conocido como el "Planeta Rojo" debido al óxido de hierro (herrumbre) presente en su superficie, que le da su característico color rojizo.',
  10
FROM public.knowledge_sections WHERE title = 'Sistema Solar';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué caracteriza a los planetas del Sistema Solar?',
  '["Todos son rocosos", "Incluyen mundos rocosos interiores y gigantes gaseosos", "Todos son gaseosos", "Solo hay planetas pequeños"]'::jsonb,
  1,
  'El Sistema Solar incluye desde los rocosos mundos interiores hasta los gigantes gaseosos y los lejanos cuerpos helados, cada rincón encierra maravillas y misterios por descubrir.',
  15
FROM public.knowledge_sections WHERE title = 'Sistema Solar';

-- Add comprehensive quiz questions for Astrofísica
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es un agujero negro?',
  '["Una estrella muy brillante", "Una región del espacio con gravedad extrema", "Un planeta oscuro", "Una nebulosa"]'::jsonb,
  1,
  'Un agujero negro es una región del espacio-tiempo donde la gravedad es tan intensa que nada, ni siquiera la luz, puede escapar de ella.',
  15
FROM public.knowledge_sections WHERE title = 'Astrofísica';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es una supernova?',
  '["El nacimiento de una estrella", "La explosión de una estrella masiva", "Un tipo de galaxia", "Un cometa brillante"]'::jsonb,
  1,
  'Una supernova es la explosión extremadamente energética de una estrella masiva al final de su vida, que puede brillar más que toda una galaxia durante un breve período.',
  15
FROM public.knowledge_sections WHERE title = 'Astrofísica';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué estudia la astrofísica?',
  '["Solo las estrellas", "El universo desde átomos hasta agujeros negros", "Solo los planetas", "Solo las galaxias"]'::jsonb,
  1,
  'La astrofísica es la ciencia que estudia el universo, desde los átomos que componen las estrellas hasta los agujeros negros y la expansión del cosmos.',
  15
FROM public.knowledge_sections WHERE title = 'Astrofísica';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué nos ayuda a entender la astrofísica?',
  '["Solo el presente del universo", "Cómo nació, evoluciona y qué destino le espera al universo", "Solo las estrellas", "Solo los planetas"]'::jsonb,
  1,
  'La astrofísica nos ayuda a entender cómo nació, evoluciona y qué destino le espera al universo, desde los átomos hasta la expansión cósmica.',
  15
FROM public.knowledge_sections WHERE title = 'Astrofísica';

-- Add comprehensive quiz questions for Exploración Espacial
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuál fue el primer satélite artificial lanzado al espacio?',
  '["Apollo 11", "Sputnik 1", "Voyager 1", "Hubble"]'::jsonb,
  1,
  'Sputnik 1 fue el primer satélite artificial lanzado por la Unión Soviética el 4 de octubre de 1957, marcando el inicio de la era espacial.',
  10
FROM public.knowledge_sections WHERE title = 'Exploración Espacial';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es la Estación Espacial Internacional (ISS)?',
  '["Un telescopio espacial", "Un laboratorio orbital", "Una nave de exploración", "Un satélite de comunicaciones"]'::jsonb,
  1,
  'La ISS es un laboratorio orbital que orbita la Tierra, donde los astronautas realizan experimentos científicos en microgravedad.',
  10
FROM public.knowledge_sections WHERE title = 'Exploración Espacial';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué ha logrado la exploración espacial?',
  '["Solo llegar a la Luna", "Llevarnos más allá de la Tierra, revelando secretos del universo", "Solo estudiar la Tierra", "Solo construir satélites"]'::jsonb,
  1,
  'La exploración espacial nos lleva más allá de la Tierra, revelando los secretos del universo y desafiando los límites de nuestra tecnología.',
  15
FROM public.knowledge_sections WHERE title = 'Exploración Espacial';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Desde cuándo el ser humano ha soñado con explorar el espacio?',
  '["Desde el siglo XX", "Desde que alzó la vista al cielo", "Solo desde la era espacial", "Solo desde la invención del telescopio"]'::jsonb,
  1,
  'Desde que el ser humano alzó la vista al cielo, soñó con explorar lo desconocido. Hoy, la exploración espacial nos lleva más allá de la Tierra.',
  10
FROM public.knowledge_sections WHERE title = 'Exploración Espacial';

-- Add comprehensive quiz questions for Misiones Espaciales
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿En qué año el ser humano llegó por primera vez a la Luna?',
  '["1967", "1969", "1971", "1973"]'::jsonb,
  1,
  'El 20 de julio de 1969, la misión Apollo 11 llevó a los primeros humanos a la Luna, con Neil Armstrong y Buzz Aldrin.',
  10
FROM public.knowledge_sections WHERE title = 'Misiones Espaciales';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuál es el objetivo principal de la misión Mars Perseverance?',
  '["Buscar vida pasada", "Estudiar la atmósfera", "Recolectar muestras", "Todas las anteriores"]'::jsonb,
  3,
  'La misión Mars Perseverance tiene múltiples objetivos: buscar signos de vida pasada, estudiar la geología y atmósfera marciana, y recolectar muestras para traer a la Tierra.',
  15
FROM public.knowledge_sections WHERE title = 'Misiones Espaciales';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué han logrado las misiones espaciales?',
  '["Solo explorar la Luna", "Llevar a la humanidad más allá de los límites de la Tierra", "Solo estudiar la Tierra", "Solo construir satélites"]'::jsonb,
  1,
  'Las misiones espaciales han llevado a la humanidad más allá de los límites de la Tierra, explorando planetas, lunas y el vasto universo.',
  15
FROM public.knowledge_sections WHERE title = 'Misiones Espaciales';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué nos ayudan a entender las misiones espaciales?',
  '["Solo nuestro planeta", "Nuestro lugar en el cosmos", "Solo las estrellas", "Solo la Luna"]'::jsonb,
  1,
  'Cada misión espacial nos acerca a descubrir lo desconocido y entender nuestro lugar en el cosmos, explorando planetas, lunas y el vasto universo.',
  15
FROM public.knowledge_sections WHERE title = 'Misiones Espaciales';


-- Add sample news articles based on the website content
INSERT INTO public.news_articles (title, content, excerpt, category, image_url, author_id, published_at)
SELECT 
  'Desde la Tierra hasta el infinito: Expandiendo la mente con conocimiento cósmico',
  'La astronomía nos permite explorar el universo desde nuestro hogar en la Tierra. Cada descubrimiento nos acerca más a entender nuestro lugar en el cosmos y las maravillas que nos rodean. La información espacial está ahora al alcance de nuestras manos, permitiéndonos soñar con explorar lo desconocido y desafiar los límites de nuestra tecnología.',
  'Información espacial al alcance de tus manos. Descubre cómo la astronomía nos permite explorar el universo.',
  'discoveries',
  '/telescope-silhouette-against-milky-way-night-sky.jpg',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  NOW()
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

INSERT INTO public.news_articles (title, content, excerpt, category, image_url, author_id, published_at)
SELECT 
  'Cada estrella es una historia: El legado de las misiones espaciales',
  'Cada estrella en el cielo nocturno cuenta una historia única, y cada misión espacial representa un paso más allá hacia lo desconocido. Desde las primeras observaciones hasta las misiones más avanzadas, la humanidad continúa expandiendo su conocimiento del cosmos. Sigue aprendiendo y descubriendo las maravillas que el universo tiene para ofrecer.',
  'Cada estrella es una historia, cada misión un paso más allá a lo desconocido. Sigue aprendiendo.',
  'missions',
  '/vast-starfield.png',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  NOW()
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

-- Add sample forum threads
INSERT INTO public.forum_threads (title, category, author_id, is_pinned)
SELECT 
  '¿Qué te motiva a estudiar astronomía?',
  'general',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  true
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

INSERT INTO public.forum_threads (title, category, author_id, is_pinned)
SELECT 
  'Misiones espaciales más impactantes de la historia',
  'missions',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  false
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

INSERT INTO public.forum_threads (title, category, author_id, is_pinned)
SELECT 
  'El futuro de la exploración espacial',
  'exploration',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
  false
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

-- Add sample multimedia resources
INSERT INTO public.multimedia_resources (title, description, type, url, thumbnail_url, category, uploaded_by)
SELECT 
  'Telescopio observando el cielo estrellado',
  'Imagen de un telescopio apuntando hacia el cielo nocturno lleno de estrellas y nebulosas',
  'image',
  '/telescope-silhouette-against-milky-way-night-sky.jpg',
  '/telescope-silhouette-against-milky-way-night-sky.jpg',
  'astronomy',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');

INSERT INTO public.multimedia_resources (title, description, type, url, thumbnail_url, category, uploaded_by)
SELECT 
  'Campo estelar vasto',
  'Imagen de un vasto campo de estrellas que representa la inmensidad del universo',
  'image',
  '/vast-starfield.png',
  '/vast-starfield.png',
  'cosmology',
  (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');
