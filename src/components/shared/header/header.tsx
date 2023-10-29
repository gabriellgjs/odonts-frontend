import { AlignJustify } from 'lucide-react'
import { Logo } from '../logo/logo'
import { useContext } from 'react'
import { SideBarContext } from '@providers/sideBar/sideBarProvider'

export const Header = () => {
  const { toggleOpenSideBar } = useContext(SideBarContext)
  return (
    <div className="flex items-center justify-between border-2 p-3 shadow-sm">
      <div
        className="h-full rounded-lg border-2 border-neutral-100 p-1 hover:border-gray-200"
        onClick={toggleOpenSideBar}
      >
        <AlignJustify className="m-0 p-0" />
      </div>
      <Logo width={48} height={48} />
    </div>
  )
}
