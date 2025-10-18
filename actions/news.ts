"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { NewsArticle, NewsCategory } from "@/types/database"

export async function getNewsArticles(category?: string, limit = 20) {
  const supabase = await createServerClient() // Add `await` here

  let query = supabase
    .from("news_articles")
    .select(
      `
      *,
      author:profiles(username, avatar_url)
    `,
    )
    .order("published_at", { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching news articles:", error)
    return []
  }

  return data
}

export async function getNewsArticle(id: string) {
  console.log("Fetching news article with ID:", id) // Debugging

  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching news article:", error)
    return null
  }

  return data
}

export async function searchNewsArticles(searchTerm: string) {
  const supabase = await createServerClient() // Add `await` here

  const { data, error } = await supabase
    .from("news_articles")
    .select(
      `
      *,
      author:profiles(username, avatar_url)
    `,
    )
    .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
    .order("published_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error searching news articles:", error)
    return []
  }

  return data as (NewsArticle & { author?: { username: string; avatar_url?: string } })[]
}

export async function toggleFavoriteNews(newsId: string) {
  const supabase = await createServerClient() // Add `await` here

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
    .eq("resource_type", "news")
    .eq("resource_id", newsId)
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
      resource_type: "news",
      resource_id: newsId,
    })

    if (error) throw error
    return { favorited: true }
  }
}

export async function checkIfFavorited(newsId: string) {
  const supabase = await createServerClient() // Add `await` here

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_type", "news")
    .eq("resource_id", newsId)
    .single()

  return !!data
}

export async function updateNewsArticle(id: string, updates: {
  title?: string;
  content?: string;
  category?: string;
  image_url?: string;
}) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("news_articles")
    .update(updates)
    .eq("id", id)

  if (error) {
    console.error("Error updating news article:", error)
    return false
  }

  return true
}

// export async function createNewsArticle(article: {
//   title: string;
//   content: string;
//   category: NewsCategory;
//   image_url?: string;
// }) {
//   const supabase = await createServerClient()
  
//   const {
//     data: { user },
//   } = await supabase.auth.getUser() 

//   if (!user) {
//     throw new Error("Usuario no autenticado")
//   }
//   const { error } = await supabase.from("news_articles").insert({
//     title: article.title,
//     content: article.content,
//     category: article.category,
//     image_url: article.image_url,
//     author_id: user.id,
//   })
  
//   if (error) {
//     console.error("Error creating news article:", error)
//     return false
//   }

//   return true
// }