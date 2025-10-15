import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const resourceType = searchParams.get("resource_type") || undefined

  let query = supabase.from("user_favorites").select("*").eq("user_id", auth.user.id)
  if (resourceType) query = query.eq("resource_type", resourceType)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let payload: { resource_type?: string; resource_id?: string }
  try { payload = await req.json() } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }

  const { resource_type, resource_id } = payload
  if (!resource_type || !resource_id) return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

  const { data: existing } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("resource_type", resource_type)
    .eq("resource_id", resource_id)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase.from("user_favorites").delete().eq("id", existing.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ favorited: false })
  } else {
    const { error } = await supabase.from("user_favorites").insert({
      user_id: auth.user.id,
      resource_type,
      resource_id,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ favorited: true })
  }
}
