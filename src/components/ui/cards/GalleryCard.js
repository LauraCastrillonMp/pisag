import styles from "../../../styles/Gallery.module.css";

export default function CardGallery({ title, image }) {
  return (
    <div className={styles.photoContainer}>
      <img src={image.hdurl} alt={title} className={styles.photo} />
      <p>{title}</p>
    </div>
  );
}
