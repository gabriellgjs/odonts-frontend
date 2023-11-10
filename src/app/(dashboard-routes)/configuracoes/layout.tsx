import { Separator } from '@components/ui/separator'
import { SidebarNav } from './sideBarNav'
import { Toaster } from '@components/ui/toaster'

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/configuracoes/perfil',
  },
  {
    title: 'Usuário',
    href: '/configuracoes/usuario',
  },
  {
    title: 'Preferências',
    href: '/configuracoes/preferencias',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

const ProfilePage = ({ children }: SettingsLayoutProps) => {
  return (
    <>
      <Toaster />
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-center text-2xl font-bold tracking-tight lg:text-left">
            Configurações
          </h2>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 sm:px-16">{children}</div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
