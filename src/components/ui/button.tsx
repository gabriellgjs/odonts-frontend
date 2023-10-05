import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'justify-center flex items-center rounded-lg capitalize ',
  {
    variants: {
      variant: {
        default:
          'bg-orange-500 text-white hover:bg-orange-600 text-lg font-bold',
        outline:
          ' border sm:hover:border-gray-200 sm:text-gray-800 sm:bg-transparent hover:bg-opacity-60 hover:bg-stone-200 text-base font-medium',
      },
      size: {
        default: 'gap-3 p-2 sm:p-3',
        outline: 'w-full my-4 gap-3 p-2 sm:p-3',
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
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...rest }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
