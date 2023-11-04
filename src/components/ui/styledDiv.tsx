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
  const { systemTheme } = useTheme()

  return (
    <div
      className={cn(
        className,
        'my-4 flex items-center justify-center gap-3 rounded-lg p-3 text-base font-medium capitalize text-gray-800 dark:hover:bg-gray-900',
      )}
    >
      {icon &&
        cloneElement(icon, {
          width: 20,
          height: 20,
          color: systemTheme !== 'dark' ? colors.gray[700] : colors.gray[100],
        })}
      {children}
    </div>
  )
}
