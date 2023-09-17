import { buttonVariants } from '@/components/ui/button'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { InputProps } from './types/InputProps'

// flex-1 rounded-lg border-2 border-solid border-gray-100 p-4 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:placeholder:text-gray-800

export const variantsInput = cva(['input'], {
  variants: {
    variant: {
      default: [
        'flex-1',
        'rounded-lg',
        'border-2',
        'border-solid',
        'border-gray-100',
        'text-gray-900',
        'focus:border-orange-500',
        'focus:outline-none',
        'focus:placeholder:text-gray-800',
      ],
    },
    sizes: {
      default: ['p-4, text-base'],
      sm: [],
      lg: [],
    },
  },
  defaultVariants: {
    variant: 'default',
    sizes: 'default',
  },
})

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, variant, sizes, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={buttonVariants({ variant, size: sizes, className })}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input

// TODO recriar esse componente