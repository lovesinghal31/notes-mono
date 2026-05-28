import { NextResponse, NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value
  const { pathname } = new URL(request.url)

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register"
  const isHomePage = pathname === "/"
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/me") ||
    pathname.startsWith("/auth/logout")

  if (isAuthPage || isHomePage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/dashboard/me", request.url))
    }
    return NextResponse.next()
  }

  if (isProtectedRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/me/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/logout",
    "/",
  ],
}
