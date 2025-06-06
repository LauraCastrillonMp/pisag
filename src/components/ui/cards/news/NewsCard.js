import styles from "../../../../styles/News.module.css";
import Link from "next/link"

export default function NewsCard({ news, loading }) {
  return (
    <>
      <div className={styles.newsGrid}>
        {news.map((item) => (
          <article key={item.id} className={styles.newsCard}>
            <img
              src={item.image_url}
              alt={item.title}
              className={styles.newsImage}
            />
            <Link href={`/noticias/${item.id}`}>
              <h2 className={styles.newsTitle}>{item.title}</h2>
            </Link>
            <p className={styles.newsSummary}>{item.summary}</p>
            <div className={styles.newsFooter}>
              <span className={styles.newsDate}>
                {new Date(item.created_at).toLocaleDateString("es-ES")}
              </span>
              <Link href={`/noticias/${item.id}`} className={styles.readMore}>
                Leer más
              </Link>
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p>No hay noticias disponibles en este momento.</p>
        </div>
      )}

      {loading && <div className={styles.loading}>Cargando...</div>}
    </>
  );
}
