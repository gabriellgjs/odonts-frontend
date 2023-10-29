import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'
import { ReactElement, ReactNode, cloneElement } from 'react'

type StyledDivProps = {
  icon?: ReactElement<LucideProps>
  children?: ReactNode
  className?: string
}

export const StyledDiv = ({ children, className, icon }: StyledDivProps) => {
  return (
    <div
      className={cn(
        className,
        'my-4 flex items-center justify-center gap-3 rounded-lg border p-2 text-base font-medium capitalize hover:bg-stone-200 hover:bg-opacity-60 sm:bg-transparent sm:p-3 sm:text-gray-800 sm:hover:border-gray-200',
      )}
    >
      {icon &&
        cloneElement(icon, {
          width: 20,
          height: 20,
        })}
      {children}
    </div>
  )
}
