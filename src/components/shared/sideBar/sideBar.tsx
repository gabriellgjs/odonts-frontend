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

import { SideBarContext } from '@/providers/sideBarProvider'
import { SideBarLink } from '@components/shared/sideBarLink/sideBarLink'
import { Separator } from '@components/ui/separator'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { memo, useContext } from 'react'
import { Logo } from '../logo/logo'
import { SideBarLinkProps } from '../sideBarLink/types/sideBarLink'
import { SideBarProps } from './types/sideBarProps'

const SideBar = ({ children }: SideBarProps) => {
  const { sideBarActivated, toggleOpenSideBar } = useContext(SideBarContext)
  const segment = useSelectedLayoutSegment()
  const sideBarOptions: SideBarLinkProps[] = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <Home />,
      current: segment === '(dashboard)',
      variant: 'default',
      onClick: toggleOpenSideBar,
    },
    {
      title: 'Agendamento',
      href: '/agendamento',
      icon: <CalendarHeart />,
      current: `/${segment}` === '/agendamento',
      variant: 'default',
      onClick: toggleOpenSideBar,
    },
    {
      title: 'Paciente',
      href: '/paciente',
      icon: <PersonStanding />,
      current: `/${segment}` === '/paciente',
      variant: 'default',
      onClick: toggleOpenSideBar,
    },
    {
      title: 'Funcionário',
      href: '/funcionario',
      icon: <Users />,
      current: `/${segment}` === '/funcionario',
      variant: 'default',
      onClick: toggleOpenSideBar,
    },
    {
      title: 'Sair',
      href: '',
      icon: <DoorOpen />,
      current: false,
      variant: 'logout',
      onClick: toggleOpenSideBar,
    },
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-2 ">
        <Sheet open={sideBarActivated}>
          <SheetContent side={'left'} closeSheet={toggleOpenSideBar}>
            <div className="flex h-screen flex-col">
              <SheetTitle className="flex flex-row items-center justify-between">
                <Logo width={40} height={40} />
                <div
                  className="cursor-pointer p-1 hover:rounded-lg hover:bg-gray-400"
                  onClick={toggleOpenSideBar}
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
      {children}
    </>
  )
}

export default memo(SideBar)

// TODO ainda em construção
