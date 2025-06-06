import { useState, useEffect } from "react";
import styles from "../../styles/Gallery.module.css";
import Link from "next/link";
import CardGallery from "../../components/ui/cards/GalleryCard";

export default function Gallery({ initialPhotos }) {
  const [photos, setPhotos] = useState(initialPhotos);
  let cont = 0;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Galería de Fotos</h1>
        <p className={styles.description}>
          Aquí encontrarás una pequeña galería de fotos de astronomía.
        </p>

        <div className={styles.gallery}>
          {photos.map((photo) => (
            <CardGallery key={cont++} title={photo.title} image={photo} />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          &larr; Volver al inicio
        </Link>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  let initialPhotos = [];

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/gallery`
    );
    const data = await res.json();
    initialPhotos = data.images || [];
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return {
    props: {
      initialPhotos,
    },
  };
}
