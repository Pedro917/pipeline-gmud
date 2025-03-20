// src/app/tarefas/layout.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/user-menu';

export default function TarefasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h2 className="text-xl font-bold">Meu Projeto</h2>
            </Link>
            <div className="flex items-center space-x-4">
              <nav className="space-x-4">
                <Link href="/tarefas">
                  <Button variant="ghost">Tarefas</Button>
                </Link>
                {/* Adicione mais links de navegação aqui conforme necessário */}
              </nav>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        {children}
      </main>
    </div>
  );
}