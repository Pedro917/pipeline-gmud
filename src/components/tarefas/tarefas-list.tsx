// 'use client';

// import { Tarefa } from '@prisma/client';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { deleteTarefa, toggleTarefa } from '@/server/actions/tarefas';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface TarefasListProps {
//   tarefas: Tarefa[];
// }

// export default function TarefasList({ tarefas }: TarefasListProps) {
//   const router = useRouter();
  
//   const handleToggle = async (id: number) => {
//     await toggleTarefa(id);
//     router.refresh();
//   };
  
//   const handleDelete = async (id: number) => {
//     if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
//       await deleteTarefa(id);
//       router.refresh();
//     }
//   };
  
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Título</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Data de Criação</TableHead>
//           <TableHead>Ações</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {tarefas.length === 0 ? (
//           <TableRow>
//             <TableCell colSpan={4} className="text-center">Nenhuma tarefa encontrada</TableCell>
//           </TableRow>
//         ) : (
//           tarefas.map((tarefa) => (
//             <TableRow key={tarefa.id}>
//               <TableCell>{tarefa.titulo}</TableCell>
//               <TableCell>
//                 <Badge variant={tarefa.concluida ? "default" : "secondary"}>
//                   {tarefa.concluida ? 'Concluída' : 'Pendente'}
//                 </Badge>
//               </TableCell>
//               <TableCell>{new Date(tarefa.criadaEm).toLocaleDateString('pt-BR')}</TableCell>
//               <TableCell className="space-x-2">
//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   onClick={() => handleToggle(tarefa.id)}
//                 >
//                   {tarefa.concluida ? 'Reabrir' : 'Concluir'}
//                 </Button>
//                 <Link href={`/tarefas/${tarefa.id}`}>
//                   <Button variant="outline" size="sm">Editar</Button>
//                 </Link>
//                 <Button 
//                   variant="destructive" 
//                   size="sm" 
//                   onClick={() => handleDelete(tarefa.id)}
//                 >
//                   Excluir
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   );
// }