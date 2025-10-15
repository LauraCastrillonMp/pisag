import NoticiasList from "./NoticiasList"
import AdminNoticiasPage from "./AdminNoticiasPage"

export default async function Page() {
  const noticias = await NoticiasList()

  if (!noticias) {
    return <p>No tienes acceso a esta página.</p>
  }

  return <AdminNoticiasPage noticias={noticias} />
}
