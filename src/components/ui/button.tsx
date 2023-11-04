import { cva, type VariantProps } from 'class-variance-authority'
import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react'

import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'

const buttonVariants = cva(
  'justify-center flex items-center rounded-lg capitalize gap-3 p-2',
  {
    variants: {
      variant: {
        default:
          'bg-orange-500 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:bg-orange-600 text-lg font-bold',
        outline:
          'transition-colors border sm:hover:border-gray-200 dark:sm:hover:bg-gray-900 dark:sm:text-neutral-100 sm:text-gray-800 sm:bg-transparent dark:sm:bg-gray-700 hover:bg-opacity-60 hover:bg-stone-200 text-base font-medium',
        confirm:
          'font-medium bg-green-600 hover:bg-green-800 text-white transition-colors',
      },
      size: {
        default: '',
        sm: 'my-4 sm:p-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactElement<LucideProps>
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, ...rest }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      >
        {icon &&
          cloneElement(icon, {
            width: 20,
            height: 20,
          })}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
