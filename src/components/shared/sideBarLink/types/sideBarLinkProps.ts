import { LiHTMLAttributes } from 'react'

export interface SideBarLinkProps extends LiHTMLAttributes<HTMLLIElement> {
  title: string
  href: string
  isActive?: boolean
  current?: boolean
  handleSideBar: () => void
}
