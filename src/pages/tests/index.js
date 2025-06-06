"use client"

import Head from "next/head"
import TestCard from "../../components/ui/cards/TestCard"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "../../lib/auth"
import styles from "../../styles/Tests.module.css"

export default function TestsIndex() {
  const router = useRouter()
  const { session } = useSession()
  const [lastScore, setLastScore] = useState(null)
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("lastTestScore")
      if (data) {
        setLastScore(JSON.parse(data))
      }
    }
  }, [])

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch("/api/tests")
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Error al obtener los tests")
        setTests(data.quizzes)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTests()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Tests de Conocimiento | Portal de Astronomía</title>
        <meta name="description" content="Pon a prueba tus conocimientos sobre astronomía." />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Tests de Conocimiento</h1>
        {lastScore && (
          <div className={styles.scoreMessage}>
            Última calificación: {lastScore.score} de {lastScore.total}
          </div>
        )}
        {loading ? (
          <div className={styles.loading}>Cargando tests...</div>
        ) : error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : tests.length === 0 ? (
          <div className={styles.emptyState}>No hay tests disponibles.</div>
        ) : (
          <TestCard tests={tests} />
        )}
      </main>
    </div>
  )
}