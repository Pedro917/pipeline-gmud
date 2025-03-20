// src/app/tarefas/nova/page.tsx
import TarefaForm from '@/components/tarefas/tarefas-form';

export default function NovaTarefaPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nova Tarefa</h1>
      <TarefaForm />
    </div>
  );
}