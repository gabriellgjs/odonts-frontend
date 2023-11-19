import { cn } from '@lib/utils'
import { LucideProps } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cloneElement, ReactElement, ReactNode } from 'react'
import colors from 'tailwindcss/colors'

type StyledDivProps = {
  icon?: ReactElement<LucideProps>
  children?: ReactNode
  className?: string
}

export const StyledDiv = ({ children, className, icon }: StyledDivProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={cn(
        className,
        'my-4 flex items-center justify-center gap-3 rounded-lg text-base font-medium',
        'p-2 capitalize text-gray-800 dark:hover:bg-gray-900',
      )}
    >
      {icon &&
        cloneElement(icon, {
          width: 20,
          height: 20,
          color: resolvedTheme === 'dark' ? colors.gray[100] : colors.gray[900],
        })}
      {children}
    </div>
  )
}
