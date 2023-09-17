import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { ButtonProps } from './types/ButtonProps'

const OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children, baseStyle, ...rest } = props
    return (
      <button
        ref={ref}
        className={cn(
          baseStyle,
          `border-2 border-blue-400 text-gray-800 hover:bg-blue-600 hover:text-gray-200`,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

export default OutlineButton
