// app/api/auth/logout/route.ts
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Remover o cookie de autenticação
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  
  return NextResponse.json({ message: "Logout realizado com sucesso" })
}