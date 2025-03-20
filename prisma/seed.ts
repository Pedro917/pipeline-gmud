// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// Função simples para hash da senha (em produção use bcrypt)
function hashSenha(senha: string): string {
  return crypto.createHash('sha256').update(senha).digest('hex');
}

async function main() {
  // Verificar se o usuário admin já existe
  const adminExistente = await prisma.usuario.findUnique({
    where: { email: 'admin@exemplo.com' }
  });

  if (!adminExistente) {
    await prisma.usuario.create({
      data: {
        email: 'admin@exemplo.com',
        senha: hashSenha('admin123'),
        nome: 'Administrador',
        role: 'admin'
      }
    });
    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });