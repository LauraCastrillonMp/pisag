"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "../../lib/auth"
import styles from "../../styles/Tests.module.css"

export default function TestDetail() {
  const router = useRouter()
  const { session, loading } = useSession()
  const [test, setTest] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [error, setError] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(() => {
    if (!router.isReady) return
    const fetchTest = async () => {
      try {
        const res = await fetch("/api/tests")
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Error al obtener el test")
        const found = data.quizzes.find(q => q.id == router.query.id || q.slug === router.query.id)
        if (!found) setError("Test no encontrado")
        else setTest(found)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchTest()
  }, [router.isReady, router.query.id])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!session) {
    if (typeof window !== "undefined") {
      router.replace("/auth/login")
    }
    return null
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Error</title>
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>{error}</h1>
          <Link href="/tests" className={styles.backLink}>
            &larr; Volver a tests
          </Link>
        </main>
      </div>
    )
  }

  if (!test) {
    return <div className={styles.container}><main className={styles.main}>Cargando test...</main></div>
  }

  const handleOption = (idx) => {
    setSelected(idx)
    setShowFeedback(false)
  }

  const handleNext = () => {
    const correctIdx = test.questions[current].answers.findIndex(a => a.is_correct)
    if (selected === correctIdx) {
      setScore(score + 1)
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
    setShowFeedback(true)
    setTimeout(() => {
      if (current < test.questions.length - 1) {
        setCurrent(current + 1)
        setSelected(null)
        setShowFeedback(false)
        setIsCorrect(null)
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  const percent = Math.round(((current + (finished ? 1 : 0)) / test.questions.length) * 100)

  return (
    <div className={styles.container}>
      <Head>
        <title>{test.title} | Portal de Astronomía</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{test.title}</h1>
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar} style={{ width: percent + "%" }} />
          <span className={styles.progressText}>{current + 1} / {test.questions.length}</span>
        </div>
        {!finished ? (
          <div className={styles.questionBlock}>
            <h2 className={styles.question}>
              {test.questions[current].question_text}
            </h2>
            <ul className={styles.options}>
              {test.questions[current].answers.map((opt, idx) => (
                <li key={opt.id}>
                  <div
                    className={
                      `${styles.optionCard} ${selected === idx ? styles.selected : ""} ` +
                      (showFeedback && idx === test.questions[current].answers.findIndex(a => a.is_correct)
                        ? styles.correct : "") +
                      (showFeedback && selected === idx && selected !== test.questions[current].answers.findIndex(a => a.is_correct)
                        ? styles.incorrect : "")
                    }
                    onClick={() => !showFeedback && handleOption(idx)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selected === idx}
                    style={{ cursor: showFeedback ? 'default' : 'pointer' }}
                  >
                    {opt.answer_text}
                  </div>
                </li>
              ))}
            </ul>
            <button
              className={styles.nextButton}
              onClick={handleNext}
              disabled={selected === null || showFeedback}
            >
              {current === test.questions.length - 1 ? "Finalizar" : "Siguiente"}
            </button>
            {showFeedback && (
              <div className={isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.resultBlock}>
            <h2>¡Test finalizado!</h2>
            <div className={styles.finalScoreBox}>
              <span className={styles.finalScore}>{score} / {test.questions.length}</span>
              <span className={styles.finalPercent}>{Math.round((score / test.questions.length) * 100)}%</span>
            </div>
            <p>
              {score === test.questions.length
                ? "¡Excelente! Has respondido todo correctamente."
                : score >= Math.ceil(test.questions.length * 0.7)
                ? "¡Muy bien! Buen dominio del tema."
                : "Puedes intentarlo de nuevo para mejorar tu puntaje."}
            </p>
            <Link href="/tests" className={styles.backLink}>
              &larr; Volver a tests
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}