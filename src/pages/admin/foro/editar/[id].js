import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "../../../../lib/auth";

export default function EditarForo() {
  const { session, loading } = useSession();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: ""
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!loading && session && session.user.role === "admin" && id) {
      fetch(`/api/forum/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title || "",
            content: data.content || "",
            category_id: data.category_id || ""
          });
          setLoadingTopic(false);
        })
        .catch(() => {
          setError("Error cargando foro");
          setLoadingTopic(false);
        });
    }
  }, [id, session, loading]);

  if (loading || loadingTopic) return <div>Cargando...</div>;
  if (!session || session.user.role !== "admin") return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/forum/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        router.push("/admin/foro");
      } else {
        const data = await res.json();
        setError(data.message || "Error actualizando foro");
      }
    } catch (err) {
      setError("Error actualizando foro");
    }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Editar Foro</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label>Título<input name="title" value={form.title} onChange={handleChange} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
          <label>Contenido<textarea name="content" value={form.content} onChange={handleChange} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
          <label>ID Categoría<input name="category_id" value={form.category_id} onChange={handleChange} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 16, marginTop: 8, cursor: 'pointer' }}>{saving ? "Guardando..." : "Guardar Cambios"}</button>
        </div>
      </form>
    </div>
  );
} 