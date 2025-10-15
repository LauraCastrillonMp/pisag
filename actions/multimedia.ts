"use server"

import { createClient } from "@/lib/supabase/server"
import type { MultimediaResource, MultimediaType } from "@/types/database"

export async function getMultimediaResources(type?: MultimediaType, category?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("multimedia_resources")
    .select(
      `
      *,
      uploader:profiles!multimedia_resources_uploaded_by_fkey(username, avatar_url)
    `,
    )
    .order("created_at", { ascending: false })

  if (type) {
    query = query.eq("type", type)
  }

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching multimedia resources:", error)
    return []
  }

  return data as (MultimediaResource & { uploader?: { username: string; avatar_url?: string } })[]
}

export async function getMultimediaResource(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("multimedia_resources")
    .select(
      `
      *,
      uploader:profiles!multimedia_resources_uploaded_by_fkey(username, avatar_url)
    `,
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching multimedia resource:", error)
    return null
  }

  return data as MultimediaResource & { uploader?: { username: string; avatar_url?: string } }
}

export async function searchMultimediaResources(searchTerm: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("multimedia_resources")
    .select(
      `
      *,
      uploader:profiles!multimedia_resources_uploaded_by_fkey(username, avatar_url)
    `,
    )
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error searching multimedia resources:", error)
    return []
  }

  return data as (MultimediaResource & { uploader?: { username: string; avatar_url?: string } })[]
}

export async function toggleFavoriteMultimedia(resourceId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Usuario no autenticado")
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_type", "multimedia")
    .eq("resource_id", resourceId)
    .single()

  if (existing) {
    // Remove favorite
    const { error } = await supabase.from("user_favorites").delete().eq("id", existing.id)

    if (error) throw error
    return { favorited: false }
  } else {
    // Add favorite
    const { error } = await supabase.from("user_favorites").insert({
      user_id: user.id,
      resource_type: "multimedia",
      resource_id: resourceId,
    })

    if (error) throw error
    return { favorited: true }
  }
}

export async function checkIfMultimediaFavorited(resourceId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_type", "multimedia")
    .eq("resource_id", resourceId)
    .single()

  return !!data
}
