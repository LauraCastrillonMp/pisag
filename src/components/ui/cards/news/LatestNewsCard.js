import Link from "next/link"
import styles from "../../../../styles/Home.module.css"

export default function LatestNewsCard({ latestNews }) {
    return (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
          <div className={styles.grid}>
            {latestNews.map((news) => (
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
    )
}