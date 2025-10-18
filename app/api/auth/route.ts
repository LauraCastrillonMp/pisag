import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars");
}

const supabase = createClient(SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

type Body = {
    action?: "login" | "register" | "logout";
    email?: string;
    password?: string;
    // optional token for logout (or use Authorization header)
    token?: string;
};

export async function POST(req: NextRequest) {
    const body = (await req.json()) as Body;
    const action = body.action;

    if (!action) {
        return NextResponse.json({ error: "Missing action (login|register|logout)" }, { status: 400 });
    }

    try {
        if (action === "register") {
            const { email, password } = body;
            if (!email || !password) {
                return NextResponse.json({ error: "email and password are required" }, { status: 400 });
            }

            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) return NextResponse.json({ error: error.message }, { status: 400 });
            return NextResponse.json({ data }, { status: 201 });
        }

        if (action === "login") {
            const { email, password } = body;
            if (!email || !password) {
                return NextResponse.json({ error: "email and password are required" }, { status: 400 });
            }

            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) return NextResponse.json({ error: error.message }, { status: 401 });
            return NextResponse.json({ data }, { status: 200 });
        }

        if (action === "logout") {
            // prefer token in body, fallback to Authorization header
            const token = body.token ?? req.headers.get("authorization")?.split(" ")[1];
            if (!token) return NextResponse.json({ error: "Missing access token for logout" }, { status: 400 });

            // Use Supabase REST logout endpoint to invalidate the token server-side
            const resp = await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    apikey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
                },
            });

            if (!resp.ok) {
                const text = await resp.text();
                return NextResponse.json({ error: "Logout failed", details: text }, { status: resp.status });
            }

            return NextResponse.json({ message: "Logged out" }, { status: 200 });
        }

        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
    }
}