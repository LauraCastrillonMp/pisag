"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCurrentUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get user profile from database
  const { data: profile } = await supabase.from("profiles").select("*", { count: "exact" }).eq("id", user.id).single()

  return {
    id: user.id,
    email: user.email,
    username: profile?.username || user.email?.split("@")[0],
    role: profile?.role || "user",
    xp: profile?.xp || 0,
    avatar_url: profile?.avatar_url,
    bio: profile?.bio || '',
    created_at: profile?.created_at || '',
    updated_at: profile?.updated_at || '',
  }
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
}

export async function updateProfile(prevState: any, formData: FormData) {
  "use server";
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const username = formData.get("username")?.toString().trim().slice(0,32);
  const bio = formData.get("bio")?.toString().slice(0, 256) || null;
  const avatar_url = formData.get("avatar_url")?.toString() || undefined;

  if (!username || username.length < 3) return { error: "El nombre de usuario debe tener 3 caracteres mínimo" };

  const { error } = await supabase.from("profiles").update({ username, bio, avatar_url })
    .eq("id", user.id);
  if (error) return { error: error.message };
  // Optionally, refresh cache/views
  revalidatePath("/perfil");
  return { success: true };
}
