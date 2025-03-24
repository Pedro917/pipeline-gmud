import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/login", "/api/auth/login"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get("auth-token")?.value
  console.log(token)
  return NextResponse.next()
  
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
  
  // try {
  //   verify(token, process.env.JWT_SECRET || "seu_segredo_jwt_temporario")
  //   return NextResponse.next()
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
}

export const config = {
  matcher: [
    '/((?!_next|api/auth/login|login).*)',
  ],
}