'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { toast } from '@components/ui/use-toast'
import { CreateEmployeeSchema } from '@components/funcionarios/schema/createEmployeeSchema'
import { Input } from '@components/ui/input'
import {
  RoleOption,
  SelectOptionProps,
} from '@components/funcionarios/types/employeeTypes'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { cn } from '@lib/utils'
import { useEffect, useMemo, useState } from 'react'
import api from '@lib/axios'
import { useSession } from 'next-auth/react'
import { Button } from '@components/ui/button'
import { normalizeCEP } from '@utils/functions/normalizeInputs'
import { findByCEP } from '@services/findByCEP/findByCEP'
import { useRouter } from 'next/navigation'
import { SettingsProps } from '@components/settings/types/settingsTypes'

const profileFormSchema = CreateEmployeeSchema.omit({ email: true })

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({ employee }: SettingsProps) {
  const { data } = useSession()
  const router = useRouter()
  const [rolesOptions, setRolesOptions] = useState<SelectOptionProps>([])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      roleId: employee.user.role.description,
      gender: employee.gender,
      maritalStatus: employee.maritalStatus,
      birthDate: employee.birthDate,
      telephoneNumber: employee.telephone.telephoneNumber,
      hireDate: employee.hireDate,
      postalCode: employee.address.postalCode,
      city: employee.address.city,
      number: employee.address.number,
      district: employee.address.district,
      state: employee.address.state,
      street: employee.address.street,
    },
  })
  const postalCodeValueWatch = form.watch('postalCode')

  useEffect(() => {
    const roleOptionsRequest = async () => {
      const response = await api
        .get('/roles', {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
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
    if (data?.user.token) {
      roleOptionsRequest()
    }
  }, [data?.user.token])

  useEffect(() => {
    form.setValue('postalCode', normalizeCEP(postalCodeValueWatch))
    if (postalCodeValueWatch && postalCodeValueWatch.length === 9) {
      const cep = async () => {
        const response = await findByCEP(postalCodeValueWatch).then(
          (data) => data,
        )

        if (response?.erro) {
          form.setError('postalCode', {
            type: 'custom',
            message: 'CEP inválido',
          })
          return
        }
        form.clearErrors('postalCode')
        form.clearErrors('state')
        form.clearErrors('city')
        form.setValue('city', response?.localidade ?? '')
        form.setValue('state', response?.uf ?? '')
      }

      cep()
    }
  }, [postalCodeValueWatch, form])

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

  function onSubmit(formValues: ProfileFormValues) {
    const data = {
      id: employee.id,
      name: formValues.name,
      birthDate: formValues.birthDate,
      rg: formValues.rg,
      cpf: formValues.cpf,
      maritalStatus: formValues.maritalStatus,
      gender: formValues.gender,
      hireDate: formValues.hireDate,
      user: {
        id: employee.user.id,
        roleId:
          formValues.roleId === employee.user.role.description
            ? employee.user.roleId
            : formValues.roleId,
      },
      address: {
        id: employee.address.id,
        street: formValues.street,
        number: formValues.number,
        district: formValues.district,
        city: formValues.city,
        postalCode: formValues.postalCode,
        state: formValues.state,
      },
      telephone: {
        id: employee.telephone.id,
        telephoneNumber: formValues.telephoneNumber,
      },
    }

    const request = async () => {
      await api
        .put(`/employees/person-details/${employee.id}`, data)
        .then(() => {
          toast({
            title: 'Sucesso',
            description: 'Perfil atualizado com sucesso',
          })
          router.refresh()
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: 'Atenção',
            variant: 'destructive',
            description: 'Error ao atualizar o perfil',
          })
        })
        .finally(() => {
          router.refresh()
        })
    }

    request()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-5 sm:py-4 lg:grid-cols-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={'col-span-2'}>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className={'w-full'} placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="CPF"
                  {...field}
                  maxLength={14}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="RG"
                  {...field}
                  maxLength={12}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="Data de Nascimento"
                  {...field}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <Select name="roleId" onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'dark:border-gray-400 dark:bg-transparent dark:focus:border-blue-500',
                    )}
                  >
                    <SelectValue
                      className="w-full text-slate-500 "
                      placeholder={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent className="w-full dark:bg-gray-700">
                  <SelectGroup>
                    {rolesOptions.map((role, index) => (
                      <SelectItem
                        className={
                          'hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-800'
                        }
                        key={index}
                        value={String(role.value)}
                      >
                        {role.selectValue}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <Select name="gender" onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'dark:border-gray-400 dark:bg-transparent dark:focus:border-blue-500',
                    )}
                  >
                    <SelectValue
                      className="w-full text-slate-500 "
                      placeholder={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent className="w-full dark:bg-gray-700">
                  <SelectGroup>
                    {genderOptions.map((gender, index) => (
                      <SelectItem
                        className={
                          'hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-800'
                        }
                        key={index}
                        value={String(gender.value)}
                      >
                        {gender.selectValue}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select name="maritalStatus" onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'dark:border-gray-400 dark:bg-transparent dark:focus:border-blue-500',
                    )}
                  >
                    <SelectValue
                      className="w-full text-slate-500 "
                      placeholder={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent className="w-full dark:bg-gray-700">
                  <SelectGroup>
                    {maritalStatusOptions.map((maritalStatus, index) => (
                      <SelectItem
                        className={
                          'hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-800'
                        }
                        key={index}
                        value={String(maritalStatus.value)}
                      >
                        {maritalStatus.selectValue}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="Telefone"
                  {...field}
                  maxLength={15}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hireDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Admissão</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="Data de Admissão"
                  {...field}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  placeholder="CEP"
                  {...field}
                  maxLength={9}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  disabled
                  placeholder="Estado"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  className={'w-full'}
                  disabled
                  placeholder="Cidade"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input className={'w-full'} placeholder="Rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input className={'w-full'} placeholder="Número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input className={'w-full'} placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'flex w-full sm:col-span-2 lg:col-span-4'}>
          <div className={'lg:flex-0 flex flex-1 justify-center'}>
            <Button type="submit" className={'w-full px-12 lg:w-fit'}>
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
