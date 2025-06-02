import db from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end()
  try {
    // Obtener todos los quizzes
    const [quizzes] = await db.query("SELECT * FROM quizzes")
    const quizzesWithQuestions = []
    for (const quiz of quizzes) {
      // Obtener preguntas del quiz
      const [questions] = await db.query("SELECT * FROM quiz_questions WHERE quiz_id = ?", [quiz.id])
      for (const question of questions) {
        // Obtener respuestas de la pregunta
        const [answers] = await db.query("SELECT id, answer_text, is_correct FROM quiz_answers WHERE question_id = ?", [question.id])
        question.answers = answers
      }
      quiz.questions = questions
      quizzesWithQuestions.push(quiz)
    }
    res.status(200).json({ quizzes: quizzesWithQuestions })
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los tests" })
  }
} 