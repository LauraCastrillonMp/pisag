import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("auth_token");

  if (request.nextUrl.pathname.includes("/admin")) {
    console.log("Validating admin route...");
    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log(payload);
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
