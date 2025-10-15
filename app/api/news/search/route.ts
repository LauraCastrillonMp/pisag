import { NextResponse } from "next/server"
import { createServerClientFromRequest } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerClientFromRequest(req)
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""
  if (!q) return NextResponse.json({ data: [] })

  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .or(`title.ilike.%${q}%,content.ilike.%${q}%,excerpt.ilike.%${q}%`)
    .order("published_at", { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
