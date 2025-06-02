import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "../../../lib/auth";

export default function AdminForo() {
  const { session, loading } = useSession();
  const [foros, setForos] = useState([]);
  const [loadingForos, setLoadingForos] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session || session.user.role !== "admin") {
        router.push("/auth/login");
      } else {
        fetchForos();
      }
    }
    // eslint-disable-next-line
  }, [session, loading]);

  const fetchForos = async () => {
    setLoadingForos(true);
    try {
      const res = await fetch("/api/forum");
      const data = await res.json();
      setForos(data.topics || []);
    } catch (err) {
      setError("Error cargando foros");
    }
    setLoadingForos(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este foro?")) return;
    try {
      const res = await fetch(`/api/forum/${id}`, { method: "DELETE" });
      if (res.ok) {
        setForos(foros.filter((f) => f.id !== id));
      } else {
        alert("Error eliminando el foro");
      }
    } catch (err) {
      alert("Error eliminando el foro");
    }
  };

  if (loading || loadingForos) return <div>Cargando...</div>;
  if (!session || session.user.role !== "admin") return null;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Gestión de Foros</h1>
      <Link href="/admin/foro/crear"><button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', marginBottom: 16, cursor: 'pointer' }}>Crear Nuevo Foro</button></Link>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8f8ff' }}>
        <thead>
          <tr style={{ background: '#e3eafc' }}>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Título</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Categoría</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Autor</th>
            <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {foros.map((f) => (
            <tr key={f.id}>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{f.title}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{f.category_name}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>{f.author_name}</td>
              <td style={{ padding: 8, border: '1px solid #e0e0e0' }}>
                <Link href={`/admin/foro/editar/${f.id}`}><button style={{ background: '#2979ff', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 6, cursor: 'pointer' }}>Editar</button></Link>
                <button onClick={() => handleDelete(f.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 6, cursor: 'pointer' }}>Eliminar</button>
                <Link href={`/foro/${f.id}`} target="_blank"><button style={{ background: '#43d9ad', color: '#222', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Ver</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {foros.length === 0 && <div style={{ marginTop: 16 }}>No hay foros registrados.</div>}
    </div>
  );
} 