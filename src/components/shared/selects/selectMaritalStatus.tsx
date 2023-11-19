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

const SelectMaritalStatus = ({
  control,
  placeholder = 'Escolha um estado civil',
}: SelectProps) => {
  const maritalStatusOptions = useMemo(() => {
    return [
      {
        value: 'Solteiro (a)',
        selectValue: 'Solteiro (a)',
      },
      {
        value: 'Casado (a)',
        selectValue: 'Casado (a)',
      },
      {
        value: 'Divorciado (a)',
        selectValue: 'Divorciado (a)',
      },
      {
        value: 'Viúvo (a)',
        selectValue: 'Viúvo (a)',
      },
      {
        value: 'Outro',
        selectValue: 'Outro',
      },
    ]
  }, [])

  return (
    <FormField
      control={control}
      name={'maritalStatus'}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Estado civil</FormLabel>
          <Select name={'maritalStatus'} onValueChange={field.onChange}>
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
                {maritalStatusOptions &&
                  maritalStatusOptions.map((option, index) => (
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

export default SelectMaritalStatus
