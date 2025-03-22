// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Obter token do cookie
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (!token) {
      return NextResponse.json(
        { message: "Não autenticado" },
        { status: 401 }
      )
    }
    
    // Verificar token
    const payload = verify(
      token, 
      process.env.JWT_SECRET || "seu_segredo_jwt_temporario"
    ) as { id: string }
    
    // Buscar dados do usuário
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    
    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Erro ao obter usuário:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}