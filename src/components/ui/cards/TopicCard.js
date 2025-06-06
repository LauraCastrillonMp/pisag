import Link from "next/link"
import styles from "../../../styles/Information.module.css"

export default function TopicCard({ topics }) {
    return (
        <div className={styles.topicsGrid}>
          {topics.map((topic) => (
            <Link key={topic.id} href={`/informacion/${topic.slug}`} className={styles.topicCard}>
              {topic.image_url && (
                <div className={styles.topicImageContainer}>
                  <img src={topic.image_url || "/placeholder.svg"} alt={topic.title} className={styles.topicImage} />
                </div>
              )}
              <div className={styles.topicContent}>
                <h2 className={styles.topicTitle}>{topic.title}</h2>
                <p className={styles.topicDescription}>{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
    );
}