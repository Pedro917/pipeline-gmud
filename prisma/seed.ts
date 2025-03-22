import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: hashPassword('admin123'),
        name: 'Administrador',
        role: 'ADMIN'
      }
    });
    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: 'usuario@usuario.com' }
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: 'usuario@usuario.com',
        password: hashPassword('usuario123'),
        name: 'Usuário Padrão',
        role: 'USER'
      }
    });
    console.log('Usuário padrão criado com sucesso!');
  } else {
    console.log('Usuário padrão já existe.');
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