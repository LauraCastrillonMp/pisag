import Head from "next/head"
import Link from "next/link"
import styles from "../../styles/Information.module.css"
import TopicCard from "../../components/ui/cards/TopicCard"

export default function Informacion({ topics }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Información Astronómica | Portal de Astronomía</title>
        <meta name="description" content="Recursos educativos sobre astronomía, sistema solar, astrofísica y más" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Información Astronómica</h1>

        <p className={styles.description}>
          Explora nuestros recursos educativos sobre astronomía, sistema solar, astrofísica, misiones espaciales y más.
        </p>

        <TopicCard topics={topics} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch information topics from the API
  let topics = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/information`)
    const data = await res.json()
    topics = data.topics || []
  } catch (error) {
    console.error("Error fetching information topics:", error)
  }

  return {
    props: {
      topics,
    },
  }
}
