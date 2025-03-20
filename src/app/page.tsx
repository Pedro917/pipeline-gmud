// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserMenu from '@/components/user-menu';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Meu Projeto</h2>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Meu Projeto Full Stack</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Tarefas</CardTitle>
              <CardDescription>Veja e gerencie todas as suas tarefas</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acesse o sistema de gerenciamento de tarefas completo.</p>
            </CardContent>
            <CardFooter>
              <Link href="/tarefas">
                <Button>Acessar Tarefas</Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Você pode adicionar mais cards para outros módulos aqui */}
        </div>
      </main>
    </div>
  );
}