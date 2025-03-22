import { Home, Store, Rocket, FileCode, Wrench, Users } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link';
import { AccountMenu } from './account-menu';
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Image
          src={'/logo-hap.png'}
          alt="Logomarcar hapvida"
          className="h-10 w-10"
          width={256}
          height={256}
         />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href={'/'} className='flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground'>
            <Wrench className="h-4 w-4" />
            Builds/Releases
          </Link>

          <Link href={'/'} className='flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground'>
            <FileCode className="h-4 w-4" />
            Scripts/Objetos
          </Link>

          <Link href={'/'} className='flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground'>
            <Rocket className="h-4 w-4" />
            Publicações
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}