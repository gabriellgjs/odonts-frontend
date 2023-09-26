'use client'

import {
  CalendarHeart,
  DoorOpen,
  Home,
  PersonStanding,
  Users,
  X,
} from 'lucide-react'
import { useSelectedLayoutSegment } from 'next/navigation'

import { SideBarLink } from '@components/shared/sideBarLink/sideBarLink'
import { Separator } from '@components/ui/separator'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { Logo } from '../logo/logo'
import { SideBarLinkProps } from '../sideBarLink/types/sideBarLink'
import { SideBarProps } from './types/sideBarProps'

const SideBar = ({ active, toggleSideBar }: SideBarProps) => {
  const segment = useSelectedLayoutSegment()
  const sideBarOptions: SideBarLinkProps[] = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <Home />,
      current: segment === '(dashboard)',
      variant: 'default',
      onClick: toggleSideBar,
    },
    {
      title: 'Agendamento',
      href: '/agendamento',
      icon: <CalendarHeart />,
      current: `/${segment}` === '/agendamento',
      variant: 'default',
      onClick: toggleSideBar,
    },
    {
      title: 'Paciente',
      href: '/paciente',
      icon: <PersonStanding />,
      current: `/${segment}` === '/paciente',
      variant: 'default',
      onClick: toggleSideBar,
    },
    {
      title: 'Funcionário',
      href: '/funcionario',
      icon: <Users />,
      current: `/${segment}` === '/funcionario',
      variant: 'default',
      onClick: toggleSideBar,
    },
    {
      title: 'Sair',
      href: '',
      icon: <DoorOpen />,
      current: false,
      variant: 'logout',
      onClick: toggleSideBar,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 ">
      <Sheet defaultOpen={active} open={active}>
        <SheetContent side={'left'} closeSheet={toggleSideBar}>
          <div className="flex h-screen flex-col">
            <SheetTitle className="flex flex-row items-center justify-between">
              <Logo width={40} height={40} />
              <div
                className="cursor-pointer p-1 hover:rounded-lg hover:bg-gray-400"
                onClick={toggleSideBar}
              >
                <X />
              </div>
            </SheetTitle>
            <Separator className="my-4" />
            {sideBarOptions.map((option) => (
              <SideBarLink
                onClick={option.onClick}
                key={option.title}
                href={option.href}
                title={option.title}
                isActive={option.current}
                icon={option.icon}
                variant={option.variant}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideBar

// TODO ainda em construção
