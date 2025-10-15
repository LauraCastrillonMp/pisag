-- Seed knowledge sections
INSERT INTO public.knowledge_sections (title, description, difficulty, icon) VALUES
  ('Astronomía Básica', 'Conceptos fundamentales del universo y la observación celeste', 'beginner', '🌟'),
  ('Sistema Solar', 'Explora los planetas, lunas y cuerpos celestes de nuestro sistema', 'beginner', '🪐'),
  ('Astrofísica', 'Física aplicada al estudio de estrellas, galaxias y el cosmos', 'advanced', '⚛️');

-- Seed sample quiz questions for Astronomía Básica
INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Cuál es la estrella más cercana a la Tierra?',
  '["La Luna", "El Sol", "Próxima Centauri", "Sirio"]'::jsonb,
  1,
  'El Sol es la estrella más cercana a la Tierra, ubicada a aproximadamente 150 millones de kilómetros.',
  10
FROM public.knowledge_sections WHERE title = 'Astronomía Básica';

INSERT INTO public.quiz_questions (section_id, question, options, correct_answer, explanation, points)
SELECT 
  id,
  '¿Qué es una galaxia?',
  '["Un planeta grande", "Un sistema de estrellas, gas y polvo", "Una estrella brillante", "Un agujero negro"]'::jsonb,
  1,
  'Una galaxia es un sistema masivo compuesto por estrellas, gas, polvo cósmico y materia oscura, unidos por la gravedad.',
  10
FROM public.knowledge_sections WHERE title = 'Astronomía Básica';

-- Seed sample news articles (will need admin user first, so we'll add these later via the admin panel)
