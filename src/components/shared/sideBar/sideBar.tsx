'use client'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { CalendarHeart, Home, PersonStanding, Users, X } from 'lucide-react'

import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import SideBarLink from '../../shared/sideBarLink/sideBarLink'
import { Logo } from '../logo/logo'

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const segment = useSelectedLayoutSegment()
  const sideBarOptions = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <Home color="red" width={20} height={20} />,
      current: segment === '(dashboard)',
    },
    {
      title: 'Agendamento',
      href: '/agendamento',
      icon: <CalendarHeart color="red" width={20} height={20} />,
      current: `/${segment}` === '/agendamento',
    },
    {
      title: 'Paciente',
      href: '/paciente',
      icon: <PersonStanding color="red" width={20} height={20} />,
      current: `/${segment}` === '/paciente',
    },
    {
      title: 'Funcionário',
      href: '/funcionario',
      icon: <Users color="red" width={20} height={20} />,
      current: `/${segment}` === '/funcionario',
    },
  ]

  const toggleOpenSideBar = () => setSideBarOpen((prevState) => !prevState)
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet open={sideBarOpen}>
        <SheetTrigger asChild data-state="close">
          <Button onClick={toggleOpenSideBar} className="">
            123
          </Button>
        </SheetTrigger>

        <SheetContent side={'left'}>
          <SheetTitle className="flex flex-row items-center justify-between">
            <Logo width={40} height={40} />
            <div onClick={toggleOpenSideBar}>
              <X />
            </div>
          </SheetTitle>

          <Separator className="my-4" />
          {sideBarOptions.map((option) => (
            <SideBarLink
              onClick={toggleOpenSideBar}
              key={option.title}
              href={option.href}
              title={option.title}
              isActive={option.current}
              icon={option.icon}
            />
          ))}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideBar

// TODO ainda em construção
