import { cva, type VariantProps } from 'class-variance-authority'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import colors from 'tailwindcss/colors'

import { cn } from '@lib/utils'
import { useTheme } from 'next-themes'

const inputVariants = cva(
  'rounded-lg border-2 bg-neutral-100 dark:bg-transparent dark:border-gray-400 border-gray-100 text-base dark:text-neutral-50 text-gray-900 dark:focus:border-blue-500 focus:border-orange-500  focus:outline-none dark:placeholder:text-gray-100 placeholder:text-gray-700 disabled:cursor-not-allowed dark:disabled:opacity-100',

  {
    variants: {
      variant: {
        email: ['flex-1'],
        password: ['flex-1', 'w-full'],
        ghost: 'bg-transparent border',
      },
      inputSize: {
        default: 'p-4',
        sm: 'p-3',
        lg: 'w-full sm:w-2/4 lg:w-1/3 p-4',
      },
      sizes: {
        email: 'w-full',
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
      inputSize,
      ...rest
    },
    ref,
  ) => {
    const { systemTheme } = useTheme()
    return (
      <>
        <input
          type={
            variant === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : 'text'
          }
          className={cn(inputVariants({ variant, className, inputSize }))}
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
              <Eye
                className="fill h-5 w-5"
                color={
                  systemTheme !== 'dark' ? colors.gray[700] : colors.gray[100]
                }
              />
            ) : (
              <EyeOff
                className="h-5 w-5"
                color={
                  systemTheme !== 'dark' ? colors.gray[700] : colors.gray[100]
                }
              />
            )}
          </button>
        )}
      </>
    )
  },
)
Input.displayName = 'Input'
