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
import { useEffect, useState } from 'react'
import { RoleOption } from '@components/funcionarios/types/employeeTypes'
import api from '@lib/axios'
import {
  SelectOptionProps,
  SelectProps,
} from '@components/shared/selects/type/selectProps'

const SelectRoleId = ({
  control,
  tokenApi,
  placeholder = 'Escolha um cargo',
}: SelectProps) => {
  const [rolesOptions, setRolesOptions] = useState<SelectOptionProps>([])

  useEffect(() => {
    const roleOptions = async () => {
      const response = await api
        .get('/roles', {
          headers: {
            Authorization: `Bearer ${tokenApi}`,
          },
        })
        .then((response): RoleOption[] => response.data.results)

      const roleOptions: SelectOptionProps = response.map((role) => {
        return {
          value: role.id,
          selectValue: role.description,
        }
      })

      setRolesOptions(roleOptions)
    }

    roleOptions()
  }, [tokenApi])
  return (
    <FormField
      control={control}
      name={'roleId'}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Cargo</FormLabel>
          <Select name={'roleId'} onValueChange={field.onChange}>
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
                {rolesOptions &&
                  rolesOptions.map((option, index) => (
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

export default SelectRoleId
