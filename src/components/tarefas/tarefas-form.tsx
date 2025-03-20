// src/components/tarefas/tarefa-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createTarefa, updateTarefa } from '@/server/actions/tarefas';
import { Tarefa } from '@prisma/client';

interface TarefaFormProps {
  tarefa?: Tarefa;
}

export default function TarefaForm({ tarefa }: TarefaFormProps) {
  const router = useRouter();
  const [titulo, setTitulo] = useState(tarefa?.titulo || '');
  const [descricao, setDescricao] = useState(tarefa?.descricao || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (tarefa) {
        await updateTarefa(tarefa.id, { titulo, descricao });
      } else {
        await createTarefa({ titulo, descricao });
      }
      router.push('/tarefas');
      router.refresh();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      alert('Ocorreu um erro ao salvar a tarefa. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="titulo" className="font-medium">Título</label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título da tarefa"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="descricao" className="font-medium">Descrição</label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva sua tarefa (opcional)"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : tarefa ? 'Atualizar' : 'Criar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}