"use server"

import { createClient } from "@/lib/supabase/server"
import type { ForumThread, ForumPost } from "@/types/database"
import { revalidatePath } from "next/cache"

export async function getForumThreads(category?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("forum_threads")
    .select(
      `
      *,
      author:profiles!forum_threads_author_id_fkey(username, avatar_url),
      posts:forum_posts(count)
    `,
    )
    .order("is_pinned", { ascending: false })
    .order("updated_at", { ascending: false })

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching forum threads:", error)
    return []
  }

  return data as (ForumThread & {
    author?: { username: string; avatar_url?: string }
    posts: { count: number }[]
  })[]
}

export async function getForumThread(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("forum_threads")
    .select(
      `
      *,
      author:profiles!forum_threads_author_id_fkey(username, avatar_url)
    `,
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching forum thread:", error)
    return null
  }

  return data as ForumThread & { author?: { username: string; avatar_url?: string } }
}

export async function getForumPosts(threadId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("forum_posts")
    .select(
      `
      *,
      author:profiles!forum_posts_author_id_fkey(username, avatar_url, role)
    `,
    )
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching forum posts:", error)
    return []
  }

  return data as (ForumPost & { author?: { username: string; avatar_url?: string; role: string } })[]
}

export async function createForumThread(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Usuario no autenticado")
  }

  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const content = formData.get("content") as string

  if (!title || !category || !content) {
    throw new Error("Todos los campos son requeridos")
  }

  // Create thread
  const { data: thread, error: threadError } = await supabase
    .from("forum_threads")
    .insert({
      title,
      category,
      author_id: user.id,
    })
    .select()
    .single()

  if (threadError) throw threadError

  // Create first post
  const { error: postError } = await supabase.from("forum_posts").insert({
    thread_id: thread.id,
    author_id: user.id,
    content,
  })

  if (postError) throw postError

  revalidatePath("/foros")
  return thread.id
}

export async function createForumPost(threadId: string, content: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Usuario no autenticado")
  }

  if (!content.trim()) {
    throw new Error("El contenido no puede estar vacío")
  }

  const { error } = await supabase.from("forum_posts").insert({
    thread_id: threadId,
    author_id: user.id,
    content,
  })

  if (error) throw error

  // Update thread's updated_at
  await supabase.from("forum_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId)

  revalidatePath(`/foros/${threadId}`)
}

export async function deleteForumPost(postId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Usuario no autenticado")
  }

  // Check if user is the author or admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  const { data: post } = await supabase.from("forum_posts").select("author_id, thread_id").eq("id", postId).single()

  if (!post || (post.author_id !== user.id && profile?.role !== "admin")) {
    throw new Error("No tienes permiso para eliminar esta publicación")
  }

  const { error } = await supabase.from("forum_posts").delete().eq("id", postId)

  if (error) throw error

  revalidatePath(`/foros/${post.thread_id}`)
}

export async function searchForumThreads(searchTerm: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("forum_threads")
    .select(
      `
      *,
      author:profiles!forum_threads_author_id_fkey(username, avatar_url),
      posts:forum_posts(count)
    `,
    )
    .ilike("title", `%${searchTerm}%`)
    .order("updated_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error searching forum threads:", error)
    return []
  }

  return data as (ForumThread & {
    author?: { username: string; avatar_url?: string }
    posts: { count: number }[]
  })[]
}
