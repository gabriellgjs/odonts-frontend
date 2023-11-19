import { memo } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Control } from 'react-hook-form'
import { cn } from '@lib/utils'

export type InputFormProps = {
  control: Control<any>
  name: string
  className?: string
  title: string
  placeholder?: string
  maxLength?: number
  disabled?: boolean
}

const InputForm = ({
  control,
  name,
  className,
  title,
  placeholder,
  maxLength,

  disabled = false,
}: InputFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('py-1', className)}>
          <FormLabel required>{title}</FormLabel>
          <FormControl>
            <Input
              className={'w-full'}
              disabled={disabled}
              placeholder={placeholder}
              {...field}
              maxLength={maxLength}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default memo(InputForm)
