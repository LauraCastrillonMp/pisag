import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data, error } = await supabase
    .from("knowledge_sections")
    .select("*, quiz_questions(count)")
    .order("created_at", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single()
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  let payload: { id?: string; title?: string; description?: string; difficulty?: string; icon?: string }
  try { payload = await req.json() } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }
  if (!payload.title) return NextResponse.json({ error: "Missing title" }, { status: 400 })

  const { data, error } = await supabase.from("knowledge_sections").insert(payload).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
