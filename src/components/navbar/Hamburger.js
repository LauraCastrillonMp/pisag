import styles from '../../styles/Hamburger.module.css';

export default function Hamburger({ isOpen }) {
  const colorClass = isOpen ? styles.burgerOpen : styles.burgerClosed;

  return (
    <div className={styles.hamburger}>
      <div className={`${styles.burger} ${colorClass} ${isOpen ? styles.burger1Open : styles.burger1Closed}`} />
      <div className={`${styles.burger} ${colorClass} ${isOpen ? styles.burger2Open : styles.burger2Closed}`} />
      <div className={`${styles.burger} ${colorClass} ${isOpen ? styles.burger3Open : styles.burger3Closed}`} />
    </div>
  );
}
