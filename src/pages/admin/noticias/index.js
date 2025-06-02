import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "../../../lib/auth";

export default function AdminNoticias() {
  const { session, loading } = useSession();
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session || session.user.role !== "admin") {
        router.push("/auth/login");
      } else {
        fetchNews();
      }
    }
    // eslint-disable-next-line
  }, [session, loading]);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await fetch("/api/news?limit=1000");
      const data = await res.json();
      setNews(data.news || []);
    } catch (err) {
      setError("Error cargando noticias");
    }
    setLoadingNews(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta noticia?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNews(news.filter((n) => n.id !== id));
      } else {
        alert("Error eliminando la noticia");
      }
    } catch (err) {
      alert("Error eliminando la noticia");
    }
  };

  if (loading || loadingNews) return <div>Cargando...</div>;
  if (!session || session.user.role !== "admin") return null;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Gestión de Noticias</h1>
      <Link href="/admin/noticias/crear"><button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', marginBottom: 16, cursor: 'pointer' }}>Crear Nueva Noticia</button></Link>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8f8ff' }}>
        <thead>
          <tr style={{ background: '#e3eafc' }}>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Título</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Resumen</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Autor</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.id}>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{n.title}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{n.summary}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{n.author_name}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>
                <Link href={`/admin/noticias/editar/${n.id}`}><button style={{ background: '#2979ff', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 6, cursor: 'pointer' }}>Editar</button></Link>
                <button onClick={() => handleDelete(n.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 6, cursor: 'pointer' }}>Eliminar</button>
                <Link href={`/noticias/${n.id}`} target="_blank"><button style={{ background: '#43d9ad', color: '#222', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Ver</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {news.length === 0 && <div style={{ marginTop: 16 }}>No hay noticias registradas.</div>}
    </div>
  );
} 