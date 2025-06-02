import { useState, useEffect } from "react";
import styles from "../../styles/Gallery.module.css";

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
            <div key={cont++} className={styles.photoContainer}>
              <img
                src={photo.hdurl}
                alt={photo.title}
                className={styles.photo}
              />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </div>
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
