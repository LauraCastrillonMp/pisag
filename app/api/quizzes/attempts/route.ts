import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { searchParams } = new URL(req.url)
  const sectionId = searchParams.get("section_id") || undefined
  const userId = searchParams.get("user_id") || undefined

  let query = supabase
    .from("quiz_attempts")
    .select("*")
    .order("completed_at", { ascending: false })
  if (sectionId) query = query.eq("section_id", sectionId)
  if (userId) query = query.eq("user_id", userId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let payload: { section_id?: string; score?: number; total_questions?: number }
  try { payload = await req.json() } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }
  const { section_id, score, total_questions } = payload
  if (!section_id || typeof score !== "number" || typeof total_questions !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { error } = await supabase.from("quiz_attempts").insert({
    section_id,
    score,
    total_questions,
    user_id: auth.user.id,
    completed_at: new Date().toISOString(),
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", auth.user.id)
    .single()
  const newXP = (profile?.xp || 0) + score
  const { error: xpError } = await supabase
    .from("profiles")
    .update({ xp: newXP })
    .eq("id", auth.user.id)

  if (profileError || xpError) return NextResponse.json({ error: (profileError || xpError)?.message }, { status: 500 })

  return NextResponse.json({ ok: true }, { status: 201 })
}
