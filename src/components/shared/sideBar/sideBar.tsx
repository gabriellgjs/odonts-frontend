'use client'

import { AlignJustify, X } from 'lucide-react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { SideBarLink } from '@components/shared/sideBarLink/sideBarLink'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { StyledDiv } from '@components/ui/styledDiv'
import { memo, useCallback, useMemo, useState } from 'react'
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
        current: segment === '(dashboard)',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Agendamentos',
        href: '/agendamentos',
        current: `/${segment}` === '/agendamentos',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Pacientes',
        href: '/pacientes',
        current: `/${segment}` === '/pacientes',
        handleSideBar: handleSetSideBar,
      },
      {
        title: 'Funcionários',
        href: '/funcionarios',
        current: `/${segment}` === '/funcionarios',
        handleSideBar: handleSetSideBar,
      },
    ],
    [handleSetSideBar, segment],
  )

  return (
    <Sheet open={open}>
      <SheetTrigger>
        <div onClick={handleSetSideBar}>
          <StyledDiv icon={<AlignJustify className="m-0 p-0" />} />
        </div>
      </SheetTrigger>
      <SheetContent side="left" closeSheet={handleSetSideBar}>
        <div className="flex h-screen flex-col">
          <SheetTitle className="flex flex-row items-center justify-between sm:justify-center">
            <Logo width={50} height={50} />
            <SheetClose
              onClick={handleSetSideBar}
              className={' block sm:hidden'}
            >
              <X />
            </SheetClose>
          </SheetTitle>
          <Separator className="my-4" />
          {sideBarOptions.map((option) => (
            <SideBarLink
              key={option.title}
              handleSideBar={handleSetSideBar}
              href={option.href}
              title={option.title}
              isActive={option.current}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default memo(SideBar)
