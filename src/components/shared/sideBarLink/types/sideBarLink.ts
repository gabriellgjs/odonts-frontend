import { VariantProps } from 'class-variance-authority'
import { LucideProps } from 'lucide-react'
import { LiHTMLAttributes, ReactElement } from 'react'
import { sideBarLinkVariants } from '../sideBarLink'

export interface SideBarLinkProps
  extends LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof sideBarLinkVariants> {
  icon: ReactElement<LucideProps>
  title: string
  href: string
  isActive?: boolean
  current?: boolean
  onClick: () => void
}
// TODO ainda em construção
