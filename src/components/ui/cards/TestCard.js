import styles from "../../../styles/Tests.module.css"
import Link from "next/link"

export default function TestCard({ tests }) {
    return (
        <div className={styles.quizGrid}>
            {tests.map(test => (
              <div key={test.id} className={styles.quizCard}>
                <div className={styles.quizTitle}>{test.title}</div>
                {test.description && <div className={styles.quizDescription}>{test.description}</div>}
                <div className={styles.quizMeta}>
                  <span className={styles.questionCount}>{test.questions?.length || 0} preguntas</span>
                  {test.difficulty && <span className={styles.difficulty}>{test.difficulty}</span>}
                </div>
                <Link href={`/tests/${test.slug || test.id}`} className={styles.startButton}>
                  Realizar test
                </Link>
              </div>
            ))}
          </div>
    );
}