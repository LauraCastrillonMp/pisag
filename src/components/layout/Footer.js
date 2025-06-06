import styles from "../../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Portal de Astronomía © {new Date().getFullYear()}</p>
    </footer>
  );
}
