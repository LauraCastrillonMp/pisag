import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/InformationTopic.module.css"

export default function InformacionTema({ topic }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div className={styles.loading}>Cargando...</div>
  }

  if (!topic) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Tema no encontrado</title>
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Tema no encontrado</h1>
          <p>El tema que buscas no existe o ha sido eliminado.</p>
          <Link href="/informacion" className={styles.backLink}>
            &larr; Volver a información
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{topic.title} | Información Astronómica</title>
        <meta name="description" content={topic.description} />
      </Head>

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            {topic.image_url && (
              <div className={styles.heroImage}>
                <img src={topic.image_url || "/placeholder.svg"} alt={topic.title} className={styles.topicImage} />
              </div>
            )}

            <h1 className={styles.title}>{topic.title}</h1>
            <p className={styles.description}>{topic.description}</p>
          </header>

          <div className={styles.content} dangerouslySetInnerHTML={{ __html: topic.content }} />
        </article>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          &larr; Volver a Inicio
        </Link>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/information/${params.slug}`)

    if (!res.ok) {
      return { props: { topic: null } }
    }

    const topic = await res.json()

    console.log(topic)

    return {
      props: {
        topic
      },
    }
  } catch (error) {
    console.error("Error fetching information topic:", error)
    return {
      props: {
        topic: null
      },
    }
  }
}
