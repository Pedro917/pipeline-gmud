import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as crypto from "crypto"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

// Função para hash da senha (mesmo método usado no seed)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Verificar se o email e a senha foram fornecidos
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Buscar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Verificar se o usuário existe
    if (!user) {
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      )
    }

    // Verificar se a senha está correta
    const hashedPassword = hashPassword(password)
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      )
    }

    // Criar token JWT
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "seu_segredo_jwt_temporario",
      { expiresIn: "8h" }
    )

    // Configurar cookie com o token
    const cookieStore = await cookies()
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas
    })

    // Retornar dados do usuário (exceto a senha)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login realizado com sucesso",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}