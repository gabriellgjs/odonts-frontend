import { useRouter } from 'next/navigation'
import { forwardRef, memo, useCallback } from 'react'
import { SideBarLinkProps } from './types/sideBarLinkProps'

export const SideBarLink = memo(
  forwardRef<HTMLLIElement, SideBarLinkProps>(
    ({ href, title, isActive, handleSideBar }, ref) => {
      const router = useRouter()

      const toggleRedirectPage = useCallback(
        async (href: string) => {
          router.push(href)
          handleSideBar()
        },
        [handleSideBar, router],
      )

      return (
        <li
          ref={ref}
          onClick={() => {
            toggleRedirectPage(href)
          }}
          className={` my-3 flex cursor-pointer items-center rounded-lg py-2 pl-4 ${
            isActive
              ? 'bg-neutral-200/80 dark:bg-gray-900'
              : 'hover:bg-neutral-200 dark:hover:bg-gray-900'
          }`}
        >
          <div className={'flex items-center rounded-lg'}>
            <span className={'text-lg font-medium'}>{title}</span>
          </div>
        </li>
      )
    },
  ),
)

SideBarLink.displayName = 'SideBarLink'
