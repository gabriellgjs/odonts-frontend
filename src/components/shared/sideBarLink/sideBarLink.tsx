import { SideBarLinkProps } from './types/sideBarLink'

const SideBarLink = ({ title, icon, isSelect = false }: SideBarLinkProps) => {
  return (
    <div className="flex cursor-pointer items-center">
      <div className="rounded-2xl p-2 ">{icon}</div>
      <span className="ml-4 text-sm font-bold">{title}</span>
    </div>
  )
}

export default SideBarLink
