import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Admin.module.css";
import { useSession } from "../../../lib/auth";

export default function AdminInformacion() {
  const { session, loading } = useSession();
  const [info, setInfo] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session || session.user.role !== "admin") {
        router.push("/auth/login");
      } else {
        fetchInfo();
      }
    }
    // eslint-disable-next-line
  }, [session, loading]);

  const fetchInfo = async () => {
    setLoadingInfo(true);
    try {
      const res = await fetch("/api/information");
      const data = await res.json();
      setInfo(data.information || []);
    } catch (err) {
      setError("Error cargando información");
    }
    setLoadingInfo(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este recurso?")) return;
    try {
      const res = await fetch(`/api/information/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setInfo(info.filter((i) => i.slug !== slug));
        setSuccess("Recurso eliminado correctamente.");
        setTimeout(() => setSuccess(null), 2500);
      } else {
        alert("Error eliminando el recurso");
      }
    } catch (err) {
      alert("Error eliminando el recurso");
    }
  };

  if (loading || loadingInfo) return <div className={styles.loading}>Cargando...</div>;
  if (!session || session.user.role !== "admin") return null;

  return (
    <div className={styles.adminContainer}>
      <div className={styles.breadcrumbs}>
        <Link href="/admin">Dashboard</Link>
        <span>/</span>
        <span>Información</span>
      </div>
      <div className={styles.sectionHeader}>
        <h1 className={styles.adminHeading}>Gestión de Información</h1>
        <Link href="/admin" className={styles.backButton}>Volver al Dashboard</Link>
      </div>
      <hr className={styles.divider} />
      <Link href="/admin/informacion/crear" className={styles.createButton}>Crear Nuevo Recurso</Link>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Slug</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {info.map((i) => (
            <tr key={i.slug}>
              <td>{i.title}</td>
              <td>{i.slug}</td>
              <td>
                <Link href={`/admin/informacion/editar/${i.slug}`} className={styles.editButton}>Editar</Link>
                <button onClick={() => handleDelete(i.slug)} className={styles.deleteButton}>Eliminar</button>
                <Link href={`/informacion/${i.slug}`} className={styles.viewButton} target="_blank">Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {info.length === 0 && <div>No hay recursos registrados.</div>}
    </div>
  );
} 