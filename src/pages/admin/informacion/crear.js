import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "../../../lib/auth";

export default function CrearInformacion() {
  const { session, loading } = useSession();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: ""
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (loading) return <div>Cargando...</div>;
  if (!session || session.user.role !== "admin") return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/information", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        router.push("/admin/informacion");
      } else {
        const data = await res.json();
        setError(data.message || "Error creando recurso");
      }
    } catch (err) {
      setError("Error creando recurso");
    }
    setSaving(false);
  };

  return (
    <div>
      <h1>Crear Nuevo Recurso</h1>
      <form onSubmit={handleSubmit}>
        <label>Título<input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Slug<input name="slug" value={form.slug} onChange={handleChange} required /></label>
        <label>Contenido<textarea name="content" value={form.content} onChange={handleChange} required /></label>
        {error && <div>{error}</div>}
        <button type="submit" disabled={saving}>{saving ? "Guardando..." : "Crear Recurso"}</button>
      </form>
    </div>
  );
} 