import { Control } from 'react-hook-form'

export type SelectProps = {
  control: Control<any>
  tokenApi?: string
  placeholder?: string
  className?: string
}

export type SelectOptionProps = {
  value: string | number
  selectValue: string
}[]
