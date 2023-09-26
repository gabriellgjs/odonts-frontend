import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { useRouter } from 'next/navigation'
import { cloneElement, forwardRef } from 'react'
import colors from 'tailwindcss/colors'
import { SideBarLinkProps } from './types/sideBarLink'

export const sideBarLinkVariants = cva('my-3 flex  cursor-pointer', {
  variants: {
    variant: {
      default: 'rounded-lg items-center',
      logout: 'flex-1 items-end ',
    },
    size: {
      default: 'py-2',
      logout: 'py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export const SideBarLink = forwardRef<HTMLLIElement, SideBarLinkProps>(
  ({ href, icon, onClick, title, isActive, variant, size, className }, ref) => {
    const router = useRouter()

    const toggleRedirectPage = (href: string) => {
      router.push(href)
      onClick()
    }

    return (
      <li
        ref={ref}
        onClick={() => toggleRedirectPage(href)}
        className={cn(
          sideBarLinkVariants({ variant, size, className }),
          variant === 'default'
            ? `${
                !isActive
                  ? 'hover:bg-gray-200'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`
            : '',
        )}
      >
        <div
          className={cn(
            'flex  items-center rounded-lg',
            variant === 'logout'
              ? 'my-2 w-fit bg-transparent hover:bg-zinc-100'
              : 'w-full',
          )}
        >
          <div className="rounded-2xl p-2">
            {cloneElement(icon, {
              color:
                variant === 'default'
                  ? `${!isActive ? colors.gray[700] : colors.orange[500]}`
                  : colors.gray[500],
              width: 20,
              height: 20,
            })}
          </div>
          <span
            className={cn(
              'ml-4 text-sm capitalize',
              variant === 'default'
                ? `${isActive ? 'font-bold text-neutral-50' : 'font-medium'}`
                : ' font-medium text-red-500 hover:text-red-600',
            )}
          >
            {title}
          </span>
        </div>
      </li>
    )
  },
)

SideBarLink.displayName = 'SideBarLink'
