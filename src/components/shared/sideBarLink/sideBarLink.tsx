import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { SideBarLinkProps } from './types/sideBarLink'

const SideBarLink = ({
  title,
  icon,
  isActive,
  href,
  onClick,
}: SideBarLinkProps) => {
  const router = useRouter()

  const toggleRedirectPage = (href: string) => {
    router.push(href)
    onClick()
  }

  return (
    <div
      onClick={() => toggleRedirectPage(href)}
      className={cn(
        'my-3 flex  cursor-pointer items-center rounded-lg py-2',
        `${!isActive ? 'hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'}`,
      )}
    >
      <div className="rounded-2xl p-2 ">{icon}</div>
      <span
        className={cn(
          'ml-4 text-sm ',
          `${isActive ? 'font-bold text-white' : 'font-medium'}`,
        )}
      >
        {title}
      </span>
    </div>
  )
}

export default SideBarLink
