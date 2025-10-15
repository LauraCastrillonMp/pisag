"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateUserRole(formData: FormData) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const userId = formData.get("userId") as string
  const newRole = formData.get("newRole") as string

  await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

  revalidatePath("/admin/usuarios")
}

export async function createNewsArticle(formData: FormData) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const imageUrl = formData.get("imageUrl") as string

  await supabase.from("news_articles").insert({
    title,
    content,
    category,
    image_url: imageUrl,
    author_id: user.id,
  })

  revalidatePath("/noticias")
  redirect("/admin/noticias")
}

export async function deleteNewsArticle(articleId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  await supabase.from("news_articles").delete().eq("id", articleId)

  revalidatePath("/noticias")
  revalidatePath("/admin/noticias")
}

export async function deleteThread(threadId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  await supabase.from("forum_threads").delete().eq("id", threadId)

  revalidatePath("/foros")
  revalidatePath("/admin/foros")
}

export async function toggleThreadPin(threadId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const { data: thread } = await supabase.from("forum_threads").select("is_pinned").eq("id", threadId).single()

  await supabase.from("forum_threads").update({ is_pinned: !thread?.is_pinned }).eq("id", threadId)

  revalidatePath("/foros")
  revalidatePath("/admin/foros")
}

export async function toggleThreadLock(threadId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  const { data: thread } = await supabase.from("forum_threads").select("is_locked").eq("id", threadId).single()

  await supabase.from("forum_threads").update({ is_locked: !thread?.is_locked }).eq("id", threadId)

  revalidatePath("/foros")
  revalidatePath("/admin/foros")
}

export async function deleteMultimedia(resourceId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  await supabase.from("multimedia_resources").delete().eq("id", resourceId)

  revalidatePath("/multimedia")
  revalidatePath("/admin/multimedia")
}

export async function deleteQuizSection(sectionId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  await supabase.from("knowledge_sections").delete().eq("id", sectionId)

  revalidatePath("/conocimiento")
  revalidatePath("/admin/quizzes")
}
