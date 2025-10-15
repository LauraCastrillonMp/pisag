import { createServerClient } from "@/lib/supabase/server"
import { getNewsArticles } from "@/actions/news"

export default async function NoticiasList() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // Handle unauthenticated users
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    return null // Handle unauthorized users
  }

  const noticias = await getNewsArticles()

  return noticias
}