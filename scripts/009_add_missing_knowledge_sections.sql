-- Add the missing knowledge sections to complete the 6 topics
INSERT INTO public.knowledge_sections (title, description, difficulty, icon) VALUES
  ('Exploración Espacial', 'Descubre las misiones y tecnologías que nos permiten explorar el cosmos', 'intermediate', '🚀'),
  ('Misiones Espaciales', 'Conoce las misiones históricas y actuales de exploración espacial', 'intermediate', '🛰️'),
  ('Cosmología', 'Estudia el origen, evolución y estructura del universo', 'advanced', '🌌');

-- Add quiz questions for Exploración Espacial
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

-- Add quiz questions for Misiones Espaciales
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

-- Add quiz questions for Cosmología
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es la teoría del Big Bang?',
  '["La explosión de una estrella", "La teoría del origen del universo", "Un tipo de galaxia", "Un fenómeno atmosférico"]'::jsonb,
  1,
  'La teoría del Big Bang explica que el universo comenzó como un punto infinitamente denso y caliente que se expandió hace aproximadamente 13.8 mil millones de años.',
  15
FROM public.knowledge_sections WHERE title = 'Cosmología';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es la materia oscura?',
  '["Materia visible en el espacio", "Materia invisible que no emite luz", "Agujeros negros", "Estrellas muertas"]'::jsonb,
  1,
  'La materia oscura es una forma hipotética de materia que no emite, absorbe o refleja luz, pero que ejerce efectos gravitacionales observables en el universo.',
  15
FROM public.knowledge_sections WHERE title = 'Cosmología';
