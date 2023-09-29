import { cva, type VariantProps } from 'class-variance-authority'
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import colors from 'tailwindcss/colors'

const inputVariants = cva(
  [
    'flex-1',
    'rounded-lg',
    'border-2',
    'border-gray-100',
    'text-base',
    'text-gray-900',
    'focus:border-orange-500',
    'focus:outline-none',
    'focus:placeholder:text-gray-800',
  ],
  {
    variants: {
      variant: {
        email: [''],
        password: ['w-full'],
      },
      inputSize: {
        default: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'email',
      inputSize: 'default',
    },
  },
)

interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputVariants> {
  isPasswordVisible?: boolean
  togglePasswordVisibility?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      isPasswordVisible,
      togglePasswordVisibility,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn('flex', variant === 'password' ? 'relative' : '')}>
        <input
          type={
            variant === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : 'text'
          }
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...rest}
        />
        {variant === 'password' && (
          <button
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-4 "
            type="button"
          >
            {isPasswordVisible ? (
              <Eye className="h-5 w-5" color={colors.gray[700]} />
            ) : (
              <EyeOff className="h-5 w-5" color={colors.gray[500]} />
            )}
          </button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
