import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import Informacion from "./informacion"
import NavBar from "../components/navbar/NavBar"

export default function Home({ latestNews, informacion }) {
  const [featuredImage, setFeaturedImage] = useState('')

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=hsZub3VBreA3ADY9scvbbHzpdNfyjcG2pRgdhVSp")
      .then((res) => res.json())
      .then((data) => {
        if (data.hdurl) {
          setFeaturedImage(data.hdurl)
        }
      })
      .catch((err) => console.error("Error fetching featured image:", err))
  }, [])

  console.log("Featured image:", featuredImage)

  return (
    <div className={styles.container}>
      <Head>
        <title>Portal de Astronomía</title>
        <meta name="description" content="Portal de noticias y recursos sobre astronomía" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar />
        <h1 className={styles.title}>Bienvenido al Portal de Astronomía</h1>

        <div className={styles.hero}>
          {featuredImage && (
            <div className={styles.featuredImage}>
              <img
                src={featuredImage || "/placeholder.svg"}
                alt={featuredImage.title}
                className={styles.heroImage}
              />
              <p className={styles.imageCaption}>{featuredImage.title}</p>
            </div>
          )}
          <div className={styles.heroContent}>
            <p className={styles.description}>
              Explora el universo con noticias, foros y recursos sobre astronomía, astrofísica y exploración espacial.
            </p>
          </div>
        </div>

        <Informacion topics={informacion} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
          <div className={styles.grid}>
            {latestNews &&
              latestNews.map((news) => (
                <Link href={`/noticias/${news.id}`} key={news.id} className={styles.card}>
                  <img src={news.image_url || "/placeholder.svg"} alt={news.title} className={styles.cardImage} />
                  <h3>{news.title}</h3>
                  <p>{news.summary}</p>
                  <small className={styles.date}>{new Date(news.created_at).toLocaleDateString("es-ES")}</small>
                </Link>
              ))}
            <Link href="/noticias" className={styles.card}>
              <h3>Ver todas las noticias &rarr;</h3>
              <p>Accede a nuestro archivo completo de noticias astronómicas.</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Portal de Astronomía © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch latest news from the API
  let latestNews = []
  let informacion = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/news?limit=3`)
    const data = await res.json()
    latestNews = data.news || []

    const informacionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/information`)
    const informacionData = await informacionRes.json()
    informacion = informacionData.topics || []
  } catch (error) {
    console.error("Error fetching news:", error)
  }

  return {
    props: {
      latestNews,
      informacion,
    },
  }
}
