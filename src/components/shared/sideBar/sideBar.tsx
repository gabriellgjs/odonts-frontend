'use client'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { CalendarHeart, Home, PersonStanding, Users } from 'lucide-react'

import SideBarLink from '../../shared/sideBarLink/sideBarLink'
import Logo from '../logo/logo'

const SideBar = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild data-state="open">
          <Button>123</Button>
        </SheetTrigger>

        <SheetContent side={'left'}>
          <SheetTitle className="flex flex-row items-baseline justify-between">
            <Logo width={40} height={40} />
            <span className="ml-2 font-black">ODONTS</span>
          </SheetTitle>

          <Separator className="my-4" />
          <SideBarLink
            title="Dashboard"
            isSelect
            icon={<Home color="red" width={20} height={20} />}
          />

          <SideBarLink
            title="Agendamento"
            icon={<CalendarHeart color="red" width={20} height={20} />}
          />

          <SideBarLink
            title="Paciente"
            icon={<PersonStanding color="red" width={20} height={20} />}
          />

          <SideBarLink
            title="Funcionário"
            icon={<Users color="red" width={20} height={20} />}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideBar

// TODO ainda em construção