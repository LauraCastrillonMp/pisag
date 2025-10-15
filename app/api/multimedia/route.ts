import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type") || undefined
  const category = searchParams.get("category") || undefined

  let query = supabase.from("multimedia_resources").select("*").order("created_at", { ascending: false })
  if (type && type !== "all") query = query.eq("type", type)
  if (category && category !== "all") query = query.eq("category", category)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  let payload: { title?: string; description?: string; type?: string; url?: string; category?: string }
  try { payload = await req.json() } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }

  const { title, type, url } = payload
  if (!title || !type || !url) return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

  const { data, error } = await supabase.from("multimedia_resources").insert({ ...payload, uploaded_by: user.id }).select("*").single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
