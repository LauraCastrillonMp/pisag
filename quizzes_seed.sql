-- Poblar la base de datos con tests, preguntas y respuestas para el portal de astronomía

-- TEST 1: ASTRONOMÍA
INSERT INTO quizzes (title, description, difficulty, slug) VALUES
('Astronomía', 'Test sobre conceptos básicos de astronomía.', 'Fácil', 'astronomia');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO quiz_questions (quiz_id, question_text) VALUES
(@quiz_id, '¿Qué estudia la astronomía?'),
(@quiz_id, '¿Cuál de los siguientes cuerpos celestes es una estrella?'),
(@quiz_id, '¿Qué rama de la ciencia se encarga de analizar el origen y evolución del universo?'),
(@quiz_id, '¿Cuál es el principal objetivo de la astronomía?'),
(@quiz_id, '¿Qué herramienta es fundamental para la observación astronómica?');

SET @q1 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué estudia la astronomía?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q1, 'Los océanos y mares de la Tierra.', 0),
(@q1, 'El universo, incluyendo planetas, estrellas y galaxias.', 1),
(@q1, 'La composición química de los alimentos.', 0),
(@q1, 'El comportamiento humano en sociedad.', 0);

SET @q2 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál de los siguientes cuerpos celestes es una estrella?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q2, 'La Luna.', 0),
(@q2, 'Marte.', 0),
(@q2, 'El Sol.', 1),
(@q2, 'Europa.', 0);

SET @q3 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué rama de la ciencia se encarga de analizar el origen y evolución del universo?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q3, 'Biología.', 0),
(@q3, 'Astronomía.', 1),
(@q3, 'Geología.', 0),
(@q3, 'Química.', 0);

SET @q4 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál es el principal objetivo de la astronomía?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q4, 'Estudiar la atmósfera terrestre.', 0),
(@q4, 'Analizar la estructura interna de la Tierra.', 0),
(@q4, 'Investigar el origen, evolución y movimientos de los cuerpos celestes.', 1),
(@q4, 'Desarrollar nuevas tecnologías de comunicación.', 0);

SET @q5 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué herramienta es fundamental para la observación astronómica?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q5, 'Microscopio.', 0),
(@q5, 'Telescopio.', 1),
(@q5, 'Estetoscopio.', 0),
(@q5, 'Sismógrafo.', 0);

-- TEST 2: SISTEMA SOLAR
INSERT INTO quizzes (title, description, difficulty, slug) VALUES
('Sistema Solar', 'Test sobre el Sistema Solar.', 'Fácil', 'sistema-solar');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO quiz_questions (quiz_id, question_text) VALUES
(@quiz_id, '¿Qué es el Sistema Solar?'),
(@quiz_id, '¿Cuál es el planeta más cercano al Sol?'),
(@quiz_id, '¿Qué tipo de planetas se encuentran en la parte exterior del Sistema Solar?'),
(@quiz_id, '¿Cuál de los siguientes no es un planeta del Sistema Solar?'),
(@quiz_id, '¿Qué cuerpo celeste es conocido como el "Planeta Rojo"?');

SET @q1 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué es el Sistema Solar?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q1, 'Un conjunto de galaxias cercanas.', 0),
(@q1, 'Nuestro hogar en el universo que incluye planetas, estrellas y otros cuerpos celestes orbitando alrededor del Sol.', 1),
(@q1, 'Una constelación en la Vía Láctea.', 0),
(@q1, 'Un cúmulo de estrellas jóvenes.', 0);

SET @q2 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál es el planeta más cercano al Sol?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q2, 'Venus.', 0),
(@q2, 'Tierra.', 0),
(@q2, 'Mercurio.', 1),
(@q2, 'Marte.', 0);

SET @q3 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué tipo de planetas se encuentran en la parte exterior del Sistema Solar?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q3, 'Planetas rocosos.', 0),
(@q3, 'Planetas enanos.', 0),
(@q3, 'Gigantes gaseosos.', 1),
(@q3, 'Planetas terrestres.', 0);

SET @q4 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál de los siguientes no es un planeta del Sistema Solar?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q4, 'Neptuno.', 0),
(@q4, 'Plutón', 1),
(@q4, 'Saturno', 0),
(@q4, 'Urano', 0);

SET @q5 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué cuerpo celeste es conocido como el "Planeta Rojo"?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q5, 'Júpiter', 0),
(@q5, 'Marte', 1),
(@q5, 'Venus', 0),
(@q5, 'Saturno', 0);

-- TEST 3: ASTROFÍSICA
INSERT INTO quizzes (title, description, difficulty, slug) VALUES
('Astrofísica', 'Test sobre conceptos de astrofísica.', 'Medio', 'astrofisica');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO quiz_questions (quiz_id, question_text) VALUES
(@quiz_id, '¿Qué estudia la astrofísica?'),
(@quiz_id, '¿Cuál es uno de los objetivos principales de la astrofísica?'),
(@quiz_id, '¿Qué fenómeno estudia la astrofísica relacionada con la muerte de estrellas masivas?'),
(@quiz_id, '¿Qué herramienta es esencial en la astrofísica para analizar la luz de los astros?'),
(@quiz_id, '¿Cuál de las siguientes es una teoría fundamental en astrofísica sobre el origen del universo?');

SET @q1 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué estudia la astrofísica?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q1, 'La composición y estructura de la Tierra.', 0),
(@q1, 'El universo, desde los átomos en las estrellas hasta los agujeros negros y la expansión cósmica.', 1),
(@q1, 'El comportamiento de los océanos.', 0),
(@q1, 'Las interacciones entre especies animales.', 0);

SET @q2 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál es uno de los objetivos principales de la astrofísica?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q2, 'Desarrollar nuevas tecnologías de comunicación.', 0),
(@q2, 'Entender cómo nació, evoluciona y el destino del universo.', 1),
(@q2, 'Estudiar la biodiversidad en la Tierra.', 0),
(@q2, 'Analizar la historia de las civilizaciones antiguas.', 0);

SET @q3 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué fenómeno estudia la astrofísica relacionada con la muerte de estrellas masivas?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q3, 'Formación de planetas.', 0),
(@q3, 'Agujeros negros.', 1),
(@q3, 'Movimiento de galaxias.', 0),
(@q3, 'Ciclos de las estaciones.', 0);

SET @q4 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué herramienta es esencial en la astrofísica para analizar la luz de los astros?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q4, 'Espectroscopio.', 1),
(@q4, 'Microscopio.', 0),
(@q4, 'Barómetro.', 0),
(@q4, 'Termómetro.', 0);

SET @q5 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál de las siguientes es una teoría fundamental en astrofísica sobre el origen del universo?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q5, 'Teoría de la Evolución.', 0),
(@q5, 'Teoría del Big Bang.', 1),
(@q5, 'Teoría de la Deriva Continental.', 0),
(@q5, 'Teoría de la Relatividad General.', 0);

-- TEST 4: MISIONES ESPACIALES
INSERT INTO quizzes (title, description, difficulty, slug) VALUES
('Misiones Espaciales', 'Test sobre misiones y exploración espacial.', 'Medio', 'misiones-espaciales');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO quiz_questions (quiz_id, question_text) VALUES
(@quiz_id, '¿Cuál fue la primera misión tripulada en llegar a la Luna?'),
(@quiz_id, '¿Qué misión espacial llevó al primer ser humano al espacio?'),
(@quiz_id, '¿Qué telescopio espacial ha proporcionado imágenes detalladas del universo desde 1990?'),
(@quiz_id, '¿Cuál es el objetivo principal de las misiones espaciales?'),
(@quiz_id, '¿Qué planeta fue visitado por la sonda Voyager 2 en 1989?');

SET @q1 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál fue la primera misión tripulada en llegar a la Luna?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q1, 'Apollo 11', 1),
(@q1, 'Vostok 1.', 0),
(@q1, 'Gemini 4.', 0),
(@q1, 'Soyuz 1.', 0);

SET @q2 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué misión espacial llevó al primer ser humano al espacio?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q2, 'Vostok 1', 1),
(@q2, 'Gemini 1', 0),
(@q2, 'Mercury 3', 0),
(@q2, 'Apollo 7', 0);

SET @q3 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué telescopio espacial ha proporcionado imágenes detalladas del universo desde 1990?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q3, 'James Webb', 0),
(@q3, 'Hubble', 1),
(@q3, 'Keppler', 0),
(@q3, 'Spitzer', 0);

SET @q4 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál es el objetivo principal de las misiones espaciales?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q4, 'Colonizar otros planetas', 0),
(@q4, 'Explorar planetas, lunas y el universo para entender nuestro lugar en el cosmos', 1),
(@q4, 'Crear estaciones espaciales comerciales', 0),
(@q4, 'Lanzar satélites de telecomunicaciones', 0);

SET @q5 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué planeta fue visitado por la sonda Voyager 2 en 1989?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q5, 'Saturno', 0),
(@q5, 'Júpiter', 0),
(@q5, 'Urano', 0),
(@q5, 'Neptuno.', 1);

-- TEST 5: EXPLORACIÓN ESPACIAL
INSERT INTO quizzes (title, description, difficulty, slug) VALUES
('Exploración Espacial', 'Test sobre exploración y tecnología espacial.', 'Medio', 'exploracion-espacial');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO quiz_questions (quiz_id, question_text) VALUES
(@quiz_id, '¿Qué ha motivado al ser humano a la exploración espacial?'),
(@quiz_id, '¿Cuál fue el primer satélite artificial lanzado al espacio?'),
(@quiz_id, '¿Qué agencia espacial llevó al primer ser humano a la Luna?'),
(@quiz_id, '¿Qué planeta ha sido explorado por los rovers Spirit y Opportunity?'),
(@quiz_id, '¿Cuál es el principal desafío de las misiones tripuladas a Marte?');

SET @q1 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué ha motivado al ser humano a la exploración espacial?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q1, 'La búsqueda de recursos minerales.', 0),
(@q1, 'El deseo de explorar lo desconocido.', 1),
(@q1, 'La necesidad de colonizar otros planetas.', 0),
(@q1, 'La competencia entre naciones.', 0);

SET @q2 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál fue el primer satélite artificial lanzado al espacio?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q2, 'Explorer 1.', 0),
(@q2, 'Sputnik 1.', 1),
(@q2, 'Apollo 11.', 0),
(@q2, 'Hubble.', 0);

SET @q3 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué agencia espacial llevó al primer ser humano a la Luna?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q3, 'NASA', 1),
(@q3, 'ESA', 0),
(@q3, 'Roscosmos', 0),
(@q3, 'JAXA', 0);

SET @q4 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Qué planeta ha sido explorado por los rovers Spirit y Opportunity?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q4, 'Venus', 0),
(@q4, 'Marte', 1),
(@q4, 'Júpiter', 0),
(@q4, 'Saturno', 0);

SET @q5 = (SELECT id FROM quiz_questions WHERE quiz_id=@quiz_id AND question_text LIKE '¿Cuál es el principal desafío de las misiones tripuladas a Marte?');
INSERT INTO quiz_answers (question_id, answer_text, is_correct) VALUES
(@q5, 'La distancia y duración del viaje.', 1),
(@q5, 'La falta de interés público.', 0),
(@q5, 'La ausencia de tecnología adecuada.', 0),
(@q5, 'La oposición de la comunidad científica.', 0); 