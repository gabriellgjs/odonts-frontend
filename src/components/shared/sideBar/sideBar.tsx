'use client'

import {
  AlignJustify,
  CalendarHeart,
  DoorOpen,
  Home,
  PersonStanding,
  Users,
} from 'lucide-react'
import { useSelectedLayoutSegment } from 'next/navigation'

import { StyledDiv } from '@components/ui/styledDiv'
import { SideBarLink } from '@components/shared/sideBarLink/sideBarLink'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { memo, useCallback, useState, useMemo } from 'react'
import { Logo } from '../logo/logo'
import { SideBarLinkProps } from '../sideBarLink/types/sideBarLinkProps'

const SideBar = () => {
  const segment = useSelectedLayoutSegment()
  const [open, setOpen] = useState(false)

  const handleSetSideBar = useCallback(() => setOpen((prev) => !prev), [])

  const sideBarOptions: SideBarLinkProps[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        href: '/',
        icon: <Home />,
        current: segment === '(dashboard)',
        variant: 'default',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Agendamentos',
        href: '/agendamentos',
        icon: <CalendarHeart />,
        current: `/${segment}` === '/agendamentos',
        variant: 'default',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Pacientes',
        href: '/pacientes',
        icon: <PersonStanding />,
        current: `/${segment}` === '/pacientes',
        variant: 'default',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Funcionários',
        href: '/funcionarios',
        icon: <Users />,
        current: `/${segment}` === '/funcionarios',
        variant: 'default',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Sair',
        href: '',
        icon: <DoorOpen />,
        current: false,
        variant: 'logout',
        handleSideBar: handleSetSideBar,
      },
    ],
    [handleSetSideBar, segment],
  )

  return (
    <Sheet open={open}>
      <SheetTrigger>
        <div onClick={handleSetSideBar}>
          <StyledDiv
            className="hover:border"
            icon={<AlignJustify className="m-0 p-0" />}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="left" closeSheet={handleSetSideBar}>
        <div className="flex h-screen flex-col">
          <SheetTitle className="flex flex-row items-center justify-center">
            <Logo width={50} height={50} />
          </SheetTitle>
          <Separator className="my-4" />
          {sideBarOptions.map((option) => (
            <SideBarLink
              key={option.title}
              handleSideBar={handleSetSideBar}
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
  )
}

export default memo(SideBar)
