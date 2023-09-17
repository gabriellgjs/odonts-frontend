import { ButtonHTMLAttributes, ReactNode } from 'react'

interface VariantsButton {
  variant?: 'default' | 'outline'
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantsButton {
  children: ReactNode
  baseStyle?: string
}
