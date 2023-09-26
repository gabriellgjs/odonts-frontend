import { Logo } from '../logo/logo'
import { HeaderProps } from './types/headerProps'
import { AlignJustify } from 'lucide-react'

export const Header = ({ openSheet }: HeaderProps) => (
  <div className="flex items-center justify-between border-2 p-3 shadow-sm">
    <div
      className="h-full rounded-lg border-2 border-neutral-100 p-1 hover:border-gray-200"
      onClick={() => openSheet()}
    >
      <AlignJustify className="m-0 p-0" />
    </div>
    <Logo width={48} height={48} />
  </div>
)
