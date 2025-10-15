-- Add more quiz questions for Sistema Solar section
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

-- Add questions for Astrofísica section
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
