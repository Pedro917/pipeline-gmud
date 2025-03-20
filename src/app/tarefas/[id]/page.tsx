// src/app/tarefas/[id]/page.tsx
import { getTarefaById } from '@/server/actions/tarefas';
import TarefaForm from '@/components/tarefas/tarefas-form';
import { notFound } from 'next/navigation';

interface EditarTarefaPageProps {
  params: {
    id: string;
  };
}

export default async function EditarTarefaPage({ params }: EditarTarefaPageProps) {
  const id = parseInt(params.id);
  const tarefa = await getTarefaById(id);
  
  if (!tarefa) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editar Tarefa</h1>
      <TarefaForm tarefa={tarefa} />
    </div>
  );
}