
// 'use server';

// import { prisma } from '@/server/db/client';
// import { revalidatePath } from 'next/cache';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/auth';

// async function getCurrentUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     throw new Error('Usuário não autenticado');
//   }
//   return parseInt(session.user.id);
// }

// export async function getTarefas() {
//   const userId = await getCurrentUserId();
//   return prisma.tarefa.findMany({
//     where: { usuarioId: userId },
//     orderBy: { criadaEm: 'desc' }
//   });
// }

// export async function getTarefaById(id: number) {
//   const userId = await getCurrentUserId();
//   return prisma.tarefa.findFirst({
//     where: { 
//       id,
//       usuarioId: userId 
//     }
//   });
// }

// export async function createTarefa(data: { titulo: string; descricao?: string }) {
//   const userId = await getCurrentUserId();
//   const result = await prisma.tarefa.create({
//     data: {
//       ...data,
//       usuarioId: userId
//     }
//   });
  
//   revalidatePath('/tarefas');
//   return result;
// }

// export async function updateTarefa(id: number, data: { titulo: string; descricao?: string }) {
//   const userId = await getCurrentUserId();
//   const tarefa = await prisma.tarefa.findFirst({
//     where: { 
//       id,
//       usuarioId: userId 
//     }
//   });
  
//   if (!tarefa) throw new Error('Tarefa não encontrada ou não pertence ao usuário atual');
  
//   const result = await prisma.tarefa.update({
//     where: { id },
//     data
//   });
  
//   revalidatePath('/tarefas');
//   revalidatePath(`/tarefas/${id}`);
//   return result;
// }

// export async function toggleTarefa(id: number) {
//   const userId = await getCurrentUserId();
//   const tarefa = await prisma.tarefa.findFirst({
//     where: { 
//       id,
//       usuarioId: userId 
//     }
//   });
  
//   if (!tarefa) throw new Error('Tarefa não encontrada ou não pertence ao usuário atual');
  
//   const result = await prisma.tarefa.update({
//     where: { id },
//     data: { concluida: !tarefa.concluida }
//   });
  
//   revalidatePath('/tarefas');
//   return result;
// }

// export async function deleteTarefa(id: number) {
//   const userId = await getCurrentUserId();
//   const tarefa = await prisma.tarefa.findFirst({
//     where: { 
//       id,
//       usuarioId: userId 
//     }
//   });
  
//   if (!tarefa) throw new Error('Tarefa não encontrada ou não pertence ao usuário atual');
  
//   await prisma.tarefa.delete({
//     where: { id }
//   });
  
//   revalidatePath('/tarefas');
// }