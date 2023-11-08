'use client'

import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Button } from '@components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const Preferences = () => {
  const { setTheme } = useTheme()

  return (
    <div className={'flex items-baseline gap-x-4'}>
      <span>Temas: </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SunIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Escolha um tema</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Escuro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Preferences
