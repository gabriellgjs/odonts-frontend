'use client'

import {
  Form,
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
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@lib/axios'
import { cn } from '@lib/utils'
import { findByCEP } from '@services/findByCEP/findByCEP'
import {
  normalizeCEP,
  normalizeCPF,
  normalizeDate,
  normalizePhoneNumber,
  normalizeRG,
} from '@utils/functions/normalizeInputs'
import { useSession } from 'next-auth/react'
import { memo, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { CreateEmployeeSchema } from './schema/createEmployeeSchema'
import {
  Employee,
  InputsProps,
  RefFormProps,
  RoleOption,
  SelectOptionProps,
  createEmployeeFormData,
} from './types/employeeTypes'

type FormEmployeeProps = {
  row?: Employee | undefined
  formRef: (ref: RefFormProps) => void | undefined
  onSubmit?: (dataForm: createEmployeeFormData) => void
  disabledInputs: boolean
}

type selectedOptionsEmployee = {
  value: string
  description: string
}

const FormEmployee = ({
  row,
  formRef,
  onSubmit,
  disabledInputs,
}: FormEmployeeProps) => {
  const form = useForm<createEmployeeFormData>({
    resolver: zodResolver(CreateEmployeeSchema),
  })

  const { data } = useSession()
  const [rolesOptions, setRolesOptions] = useState<SelectOptionProps>([])
  const [roleSelect, setRoleSelect] = useState<selectedOptionsEmployee | null>(
    null,
  )
  const [genderSelect, setGenderSelect] =
    useState<selectedOptionsEmployee | null>(null)
  const [maritalStatusSelect, setMaritalStatusSelect] =
    useState<selectedOptionsEmployee | null>(null)

  const handlerSelectedOption = (name: string) => {
    if (name === 'roleId') {
      return roleSelect?.description ?? ''
    }
    if (name === 'gender') {
      return genderSelect?.description ?? ''
    }
    if (name === 'maritalStatus') {
      return maritalStatusSelect?.description ?? ''
    }
    return ''
  }

  console.log(form.formState.errors.email)
  const cpfValueWatch = form.watch('cpf')
  const rgValueWatch = form.watch('rg')
  const phoneValueWatch = form.watch('telephoneNumber')
  const birthDateValueWatch = form.watch('birthDate')
  const hireDateValueWatch = form.watch('hireDate')
  const postalCodeValueWatch = form.watch('postalCode')

  useEffect(() => {
    const roleOptions = async () => {
      const response = await api
        .get('/roles', {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
          },
        })
        .then((response): RoleOption[] => response.data.results)

      const roleOptions: SelectOptionProps = response.map((role) => {
        const values = {
          value: role.id,
          selectValue: role.description,
        }
        return values
      })

      setRolesOptions(roleOptions)
    }
    if (data?.user.token) {
      roleOptions()
    }
  }, [data?.user.token])

  const genderOptions = useMemo(() => {
    const defaultGenders = [
      {
        value: 'Masculino',
        selectValue: 'Masculino',
      },
      {
        value: 'Feminino',
        selectValue: 'Feminino',
      },
    ]

    return defaultGenders
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

  useEffect(() => {
    if (formRef) {
      const ref: RefFormProps = {
        reset: () => {
          form.reset()
        },
      }
      formRef(ref)
    }
  }, [form, formRef])

  useEffect(() => {
    form.setValue('cpf', normalizeCPF(cpfValueWatch))
  }, [cpfValueWatch, form])

  useEffect(() => {
    form.setValue('birthDate', normalizeDate(birthDateValueWatch))
  }, [birthDateValueWatch, form])

  useEffect(() => {
    form.setValue('hireDate', normalizeDate(hireDateValueWatch))
  }, [hireDateValueWatch, form])

  useEffect(() => {
    form.setValue('rg', normalizeRG(rgValueWatch))
  }, [rgValueWatch, form])

  useEffect(() => {
    form.setValue('telephoneNumber', normalizePhoneNumber(phoneValueWatch))
  }, [phoneValueWatch, form])

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

  const inputsRequire: InputsProps = useMemo(() => {
    return [
      {
        labelTitle: 'Nome',
        required: true,
        inputName: 'name',
        inputPlaceholder: 'Ex: Maria Silva',
        className: 'col-span-2',
        isInput: true,
        defaultValue: row ? row.name : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.name?.message : '',
      },
      {
        labelTitle: 'CPF',
        required: true,
        inputName: 'cpf',
        inputPlaceholder: 'Ex: 123.456.789-10',
        isInput: true,
        inputMax: 14,
        defaultValue: row ? row.cpf : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.cpf?.message : '',
      },
      {
        labelTitle: 'E-mail',
        required: true,
        inputName: 'email',
        inputPlaceholder: 'Ex: joao@gmail.com',
        className: 'col-span-2',
        isInput: true,
        defaultValue: row ? row.user.email : '',
        disable: disabledInputs,
        errorWatcher: form.formState.errors.email?.message,
      },
      {
        labelTitle: 'RG',
        required: true,
        inputName: 'rg',
        inputPlaceholder: 'Ex: 01.234.567-0',
        isInput: true,
        inputMax: 12,
        defaultValue: row ? row.rg : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.rg?.message : '',
      },
      {
        labelTitle: 'Cargo',
        required: true,
        inputName: 'roleId',
        inputPlaceholder: 'Selecione um cargo',
        isInput: !!disabledInputs,
        defaultValue: row ? row.user.role.description : '',
        disable: disabledInputs,
        selectOptions: !disabledInputs ? rolesOptions : [],
        errorWatcher: row ? form.formState.errors.roleId?.message : '',
      },
      {
        labelTitle: 'Gênero',
        required: true,
        inputName: 'gender',
        inputPlaceholder: 'Selecione um gênero',
        isInput: !!disabledInputs,
        defaultValue: row ? row.gender : '',
        disable: disabledInputs,
        selectOptions: !disabledInputs ? genderOptions : [],
        errorWatcher: row ? form.formState.errors.gender?.message : '',
      },
      {
        labelTitle: 'Estado Civil',
        required: true,
        inputName: 'maritalStatus',
        inputPlaceholder: 'Selecione um estado civil',
        isInput: !!disabledInputs,
        defaultValue: row ? row.maritalStatus : '',
        disable: disabledInputs,
        selectOptions: !disabledInputs ? maritalStatusOptions : [],
        errorWatcher: row ? form.formState.errors.maritalStatus?.message : '',
      },
      {
        labelTitle: 'Telefone',
        required: true,
        inputName: 'telephoneNumber',
        inputPlaceholder: 'Ex: (00) 91234-5678',
        isInput: true,
        defaultValue: row ? row.telephone.telephoneNumber : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.telephoneNumber?.message : '',
      },
      {
        labelTitle: 'Data de Nascimento',
        required: true,
        inputName: 'birthDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        isInput: true,
        inputMax: 10,
        defaultValue: row ? row.birthDate : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.birthDate?.message : '',
      },
      {
        labelTitle: 'Data de Admissão',
        required: true,
        inputName: 'hireDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        isInput: true,
        inputMax: 10,
        defaultValue: row ? row.hireDate : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.hireDate?.message : '',
      },
      {
        labelTitle: 'CEP',
        required: true,
        inputName: 'postalCode',
        inputPlaceholder: 'Ex: 12345-678',
        isInput: true,
        inputMax: 9,
        defaultValue: row ? row.address.postalCode : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.postalCode?.message : '',
      },
      {
        labelTitle: 'Estado',
        required: true,
        inputName: 'state',
        className: 'disabled:text-gray-900',
        inputPlaceholder: 'Ex: Paraná',
        isInput: true,
        defaultValue: row ? row.address.state : '',
        disable: true,
        errorWatcher: row ? form.formState.errors.state?.message : '',
      },
      {
        labelTitle: 'Cidade',
        required: true,
        inputName: 'city',
        inputPlaceholder: 'Ex: Curitiba',
        className: 'disabled:text-gray-900',
        isInput: true,
        defaultValue: row ? row.address.city : '',
        disable: true,
        errorWatcher: row ? form.formState.errors.city?.message : '',
      },
      {
        labelTitle: 'Rua',
        inputName: 'street',
        required: true,
        inputPlaceholder: 'Ex: Rua das flores',
        isInput: true,
        defaultValue: row ? row.address.street : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.street?.message : '',
      },
      {
        labelTitle: 'Número',
        inputName: 'number',
        required: true,
        inputPlaceholder: 'Ex: 1001',
        isInput: true,
        defaultValue: row ? row.address.number : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.number?.message : '',
      },
      {
        labelTitle: 'Bairro',
        inputName: 'district',
        required: true,
        inputPlaceholder: 'Ex: Centro',
        isInput: true,
        defaultValue: row ? row.address.district : '',
        disable: disabledInputs,
        errorWatcher: row ? form.formState.errors.district?.message : '',
      },
    ]
  }, [
    disabledInputs,
    form.formState.errors,
    genderOptions,
    maritalStatusOptions,
    rolesOptions,
    row,
  ])

  useEffect(() => {
    if (!row) return

    setRoleSelect({
      value: String(row.user.roleId),
      description: row.user.role.description,
    })
    setGenderSelect({
      value: row.gender,
      description: row.gender,
    })
    setMaritalStatusSelect({
      value: row.maritalStatus,
      description: row.maritalStatus,
    })

    inputsRequire.map((input) => {
      form.setValue(input.inputName, input.defaultValue ?? '')
      return input
    })
  }, [form, inputsRequire, row])
  return (
    <Form {...form}>
      <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : () => null}>
        <div className="grid grid-cols-3 gap-5 py-4">
          {inputsRequire &&
            inputsRequire.map((input, index) =>
              input.isInput ? (
                <FormField
                  key={index}
                  control={form.control}
                  name={input.inputName}
                  render={({ field }) => (
                    <FormItem className={input?.className}>
                      <FormLabel required>{input.labelTitle}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name={input.inputName}
                          value={
                            disabledInputs
                              ? input.defaultValue || field.value
                              : field.value || input.defaultValue
                          }
                          disabled={input.disable ?? false}
                          maxLength={input.inputMax}
                          placeholder={input.inputPlaceholder}
                          className={cn(
                            'w-full',
                            input.errorWatcher
                              ? 'border-red-400 focus:border-red-400'
                              : '',
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  key={index}
                  control={form.control}
                  name={input.inputName}
                  render={({ field }) => (
                    <FormItem className={input?.className}>
                      <FormLabel required>{input.labelTitle}</FormLabel>
                      <Select
                        name={input.inputName}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger
                            disabled={input.disable}
                            value={field.value}
                            className={cn(
                              input.errorWatcher
                                ? 'border-red-400 focus:border-red-400'
                                : '',
                            )}
                          >
                            <SelectValue
                              className="w-full text-slate-500"
                              placeholder={
                                row
                                  ? handlerSelectedOption(input.inputName)
                                  : input.inputPlaceholder
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent className="w-full">
                          <SelectGroup>
                            {input.selectOptions &&
                              input.selectOptions
                                .filter((option) => option)
                                .map((option, index) => (
                                  <SelectItem
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
              ),
            )}
        </div>
        {!disabledInputs && (
          <DialogFooter className="flex w-full items-center justify-center">
            <Button type="submit" className="w-48">
              Salvar
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  )
}

export default memo(FormEmployee)
