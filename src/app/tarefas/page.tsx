// import { getTarefas } from '@/server/actions/tarefas';
// import TarefasList from '@/components/tarefas/tarefas-list';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default async function TarefasPage() {
//   const tarefas = await getTarefas();
  
//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
//         <Link href="/tarefas/nova">
//           <Button>Nova Tarefa</Button>
//         </Link>
//       </div>
      
//       <TarefasList tarefas={tarefas} />
//     </div>
//   );
// }