import { ReactNode } from 'react'

export interface SideBarLinkProps {
  icon: ReactNode
  title: string
  href: string
  isActive?: boolean
  onClick: () => void
}
// TODO ainda em construção
