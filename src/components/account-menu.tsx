import { User } from 'lucide-react'
import { Dialog } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import Link from 'next/link'

export function AccountMenu(){
    return(
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <User className="h-6 w-6" />
                            <span className="sr-only">Conta</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Conta</DropdownMenuLabel>
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={'/login'}>Sair</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </>
    )
}