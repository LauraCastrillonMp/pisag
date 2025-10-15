"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { KnowledgeSection, QuizQuestion, QuizAttempt } from "@/types/database"
import { revalidatePath } from "next/cache"

export async function getKnowledgeSections() {
  const supabase = await createServerClient() // Use createServerClient here

  const { data, error } = await supabase
    .from("knowledge_sections")
    .select(
      `
      *,
      questions:quiz_questions(count)
    `,
    )
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching knowledge sections:", error)
    return []
  }

  return data as (KnowledgeSection & { questions: { count: number }[] })[]
}

export async function getKnowledgeSection(id: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("knowledge_sections").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching knowledge section:", error)
    return null
  }

  return data as KnowledgeSection
}

export async function getQuizQuestions(sectionId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("section_id", sectionId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching quiz questions:", error)
    return []
  }

  return data as QuizQuestion[]
}

export async function submitQuizAttempt(sectionId: string, score: number, totalQuestions: number) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Usuario no autenticado")
  }

  // Insert quiz attempt
  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    section_id: sectionId,
    score,
    total_questions: totalQuestions,
  })
  if (error) throw error

  // Increment user XP
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", user.id)
    .single()
  const newXP = (profile?.xp || 0) + score
  const { error: xpError } = await supabase
    .from("profiles")
    .update({ xp: newXP })
    .eq("id", user.id)
  if (profileError || xpError) throw (profileError || xpError)

  revalidatePath(`/conocimiento/${sectionId}`)
}

export async function getUserQuizAttempts(sectionId?: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  let query = supabase
    .from("quiz_attempts")
    .select(
      `
      *,
      section:knowledge_sections(title, icon)
    `,
    )
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })

  if (sectionId) {
    query = query.eq("section_id", sectionId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching quiz attempts:", error)
    return []
  }

  return data as (QuizAttempt & { section?: { title: string; icon?: string } })[]
}

export async function getLeaderboard(limit = 10) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      `
      user_id,
      score,
      profiles!quiz_attempts_user_id_fkey(username, avatar_url)
    `,
    )
    .order("score", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching leaderboard:", error)
    return []
  }

  // Group by user and sum scores
  const userScores = new Map<string, { username: string; avatar_url?: string; totalScore: number; attempts: number }>()

  data.forEach((attempt) => {
    const profile = attempt.profiles as { username: string; avatar_url?: string } | null
    if (!profile) return

    const existing = userScores.get(attempt.user_id)
    if (existing) {
      existing.totalScore += attempt.score
      existing.attempts += 1
    } else {
      userScores.set(attempt.user_id, {
        username: profile.username,
        avatar_url: profile.avatar_url,
        totalScore: attempt.score,
        attempts: 1,
      })
    }
  })

  return Array.from(userScores.values())
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit)
}
