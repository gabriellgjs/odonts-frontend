import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { ButtonProps } from './types/ButtonProps'

const DefaultButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children, baseStyle, ...rest } = props
    return (
      <button
        ref={ref}
        className={cn(
          baseStyle,
          `bg-orange-500 text-white hover:bg-orange-600`,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

export default DefaultButton
