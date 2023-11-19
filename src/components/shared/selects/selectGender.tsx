'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { useMemo } from 'react'
import { SelectProps } from '@components/shared/selects/type/selectProps'

const SelectGender = ({
  control,
  placeholder = 'Escolha um gênero',
}: SelectProps) => {
  const genderOptions = useMemo(() => {
    return [
      {
        value: 'Masculino',
        selectValue: 'Masculino',
      },
      {
        value: 'Feminino',
        selectValue: 'Feminino',
      },
    ]
  }, [])

  return (
    <FormField
      control={control}
      name={'gender'}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Gênero</FormLabel>
          <Select name={'gender'} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  className="w-full text-slate-500 "
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <FormMessage />
            <SelectContent className="w-full dark:bg-gray-700">
              <SelectGroup>
                {genderOptions &&
                  genderOptions.map((option, index) => (
                    <SelectItem
                      className={
                        'hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-800'
                      }
                      key={index}
                      value={String(option.value)}
                    >
                      {option.selectValue}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default SelectGender
