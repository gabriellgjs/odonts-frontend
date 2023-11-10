import { Avatar, AvatarFallback } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { memo } from 'react'
import { destroyCookie } from 'nookies'

type AvatarProfileProps = {
  name: string
}
const AvatarProfile = ({ name }: AvatarProfileProps) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="text-gray-800 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-gray-800"
          onClick={() => {
            router.push('/configuracoes/perfil')
          }}
        >
          Meu perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-600"
          onClick={async () => {
            await signOut({ redirect: false })
            destroyCookie(null, 'access-token')
            router.push('/login')
          }}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(AvatarProfile)
