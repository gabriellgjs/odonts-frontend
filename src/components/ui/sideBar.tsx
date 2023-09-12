'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Home, CalendarHeart, PersonStanding, Users } from 'lucide-react'
import * as colors from 'tailwindcss/colors'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import LogoOdontsSvg from '../../assets/logoOdonts.svg'
import SideBarLink from '../shared/sideBarLink/sideBarLink'

const SideBar = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild data-state="open">
          <Button variant="outline">123</Button>
        </SheetTrigger>

        <SheetContent side={'left'}>
          <SheetTitle className="flex flex-row items-baseline justify-between">
            <Image src={LogoOdontsSvg} alt="Logo" width={40} height={40} />
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
