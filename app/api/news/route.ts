import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category") || undefined
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) : 20

  let query = supabase
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  let payload: { title?: string; content?: string; category?: string; image_url?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { title, content, category, image_url } = payload
  if (!title || !content || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase.from("news_articles").insert({
    title,
    content,
    category,
    image_url: image_url || null,
    author_id: user.id,
  }).select("*").single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
