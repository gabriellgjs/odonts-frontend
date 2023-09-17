import { VariantProps } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { variantsInput } from '../input'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof variantsInput> {
  className?: string
}

// TODO remover a apos recriar o componente