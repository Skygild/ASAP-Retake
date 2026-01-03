import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/login", "/signup"]
const AUTH_ROUTES = ["/login", "/signup"]

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const authCookie = request.cookies.get("auth_tokens")
	const isAuthenticated = !!authCookie?.value

	const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route)
	const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route)
	const isRootRoute = pathname === "/"

	if (!isAuthenticated && !isPublicRoute && !isRootRoute) {
		const loginUrl = new URL("/login", request.url)
		loginUrl.searchParams.set("redirect", pathname)
		return NextResponse.redirect(loginUrl)
	}

	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url))
	}

	if (isAuthenticated && isRootRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
}
