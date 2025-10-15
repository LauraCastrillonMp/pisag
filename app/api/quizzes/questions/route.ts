import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { searchParams } = new URL(req.url)
  const sectionId = searchParams.get("section_id")
  if (!sectionId) return NextResponse.json({ error: "section_id required" }, { status: 400 })

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("section_id", sectionId)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single()
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  let payload: { section_id?: string; question?: string; options?: string[]; correct_answer?: number; explanation?: string; points?: number }
  try { payload = await req.json() } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }
  const { section_id, question, options, correct_answer, points } = payload
  if (!section_id || !question || !options || typeof correct_answer !== "number" || typeof points !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase.from("quiz_questions").insert(payload).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
