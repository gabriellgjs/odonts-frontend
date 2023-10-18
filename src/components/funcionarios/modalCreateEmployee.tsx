'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { memo, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { cn } from '@lib/utils'
import { findByCEP } from '@services/findByCEP/findByCEP'
import {
  normalizeCEP,
  normalizeCPF,
  normalizeDate,
  normalizePhoneNumber,
  normalizeRG,
} from '@utils/functions/normalizeInputs'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { CreateEmployeeSchema } from './schema/createEmployeeSchema'
import {
  InputsProps,
  ModalCreateProps,
  RefModalProps,
  createEmployeeFormData,
} from './types/employeeTypes'

const ModalCreateEmployee = ({ dialogRef }: ModalCreateProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      }
      dialogRef(ref)
    }
  }, [dialogRef])

  const form = useForm<createEmployeeFormData>({
    resolver: zodResolver(CreateEmployeeSchema),
  })

  const onSubmit = (data: createEmployeeFormData) => {
    // const datesplit = data.birthDate.split('/')
    // const dateRight = String().concat(
    //   datesplit[1],
    //   '-',
    //   datesplit[0],
    //   '-',
    //   datesplit[2],
    // )
    // console.log(dayjs(dateRight).locale('pt-br'), 'teste', dateRight)
    console.log(data)
  }

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

  const inputsRequire: InputsProps[] = useMemo(() => {
    return [
      {
        labelTitle: 'Nome',
        required: true,
        inputName: 'name',
        inputPlaceholder: 'Ex: Maria Silva',
        errorWatcher: form.formState.errors.name?.message,
        className: 'col-span-3',
        isInput: true,
      },
      {
        labelTitle: 'E-mail',
        required: true,
        inputName: 'email',
        inputPlaceholder: 'Ex: joao@gmail.com',
        className: 'col-span-2',
        errorWatcher: form.formState.errors.email?.message,
        isInput: true,
      },
      {
        labelTitle: 'CPF',
        required: true,
        inputName: 'cpf',
        inputPlaceholder: 'Ex: 123.456.789-10',
        errorWatcher: form.formState.errors.cpf?.message,
        isInput: true,
        inputMax: 14,
      },
      {
        labelTitle: 'RG',
        required: true,
        inputName: 'rg',
        inputPlaceholder: 'Ex: 01.234.567-0',
        errorWatcher: form.formState.errors.rg?.message,
        isInput: true,
        inputMax: 12,
      },
      {
        labelTitle: 'Gênero',
        required: true,
        inputName: 'gender',
        inputPlaceholder: 'Selecione um gênero',
        errorWatcher: form.formState.errors.gender?.message,
        isInput: false,
        selectOptions: genderOptions,
      },
      {
        labelTitle: 'Estado Civil',
        required: true,
        inputName: 'maritalStatus',
        inputPlaceholder: 'Selecione um estado civil',
        errorWatcher: form.formState.errors.maritalStatus?.message,
        isInput: false,
        selectOptions: maritalStatusOptions,
      },
      {
        labelTitle: 'Telefone',
        required: true,
        inputName: 'telephoneNumber',
        inputPlaceholder: 'Ex: (00) 91234-5678',
        errorWatcher: form.formState.errors.telephoneNumber?.message,
        isInput: true,
      },
      {
        labelTitle: 'Data de Nascimento',
        required: true,
        inputName: 'birthDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        errorWatcher: form.formState.errors.birthDate?.message,
        isInput: true,
        inputMax: 10,
      },
      {
        labelTitle: 'Data de Admissão',
        required: true,
        inputName: 'hireDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        errorWatcher: form.formState.errors.hireDate?.message,
        isInput: true,
        inputMax: 10,
      },
      {
        labelTitle: 'CEP',
        required: true,
        inputName: 'postalCode',
        inputPlaceholder: 'Ex: 12345-678',
        errorWatcher: form.formState.errors.postalCode?.message,
        isInput: true,
        inputMax: 9,
      },
      {
        labelTitle: 'Estado',
        required: true,
        inputName: 'state',
        disable: true,
        inputPlaceholder: 'Ex: Paraná',
        errorWatcher: form.formState.errors.state?.message,
        isInput: true,
      },
      {
        labelTitle: 'Cidade',
        required: true,
        inputName: 'city',
        disable: true,
        inputPlaceholder: 'Ex: Curitiba',
        errorWatcher: form.formState.errors.city?.message,
        isInput: true,
      },
      {
        labelTitle: 'Rua',
        inputName: 'street',
        required: true,
        inputPlaceholder: 'Ex: Rua das flores',
        errorWatcher: form.formState.errors.street?.message,
        isInput: true,
      },
      {
        labelTitle: 'Número',
        inputName: 'number',
        required: true,
        inputPlaceholder: 'Ex: 1001',
        errorWatcher: form.formState.errors.number?.message,
        isInput: true,
      },
      {
        labelTitle: 'Bairro',
        inputName: 'district',
        required: true,
        inputPlaceholder: 'Ex: Centro',
        errorWatcher: form.formState.errors.district?.message,
        isInput: true,
      },
    ]
  }, [
    form.formState.errors.name?.message,
    form.formState.errors.email?.message,
    form.formState.errors.cpf?.message,
    form.formState.errors.rg?.message,
    form.formState.errors.gender?.message,
    form.formState.errors.maritalStatus?.message,
    form.formState.errors.telephoneNumber?.message,
    form.formState.errors.birthDate?.message,
    form.formState.errors.hireDate?.message,
    form.formState.errors.postalCode?.message,
    form.formState.errors.state?.message,
    form.formState.errors.city?.message,
    form.formState.errors.street?.message,
    form.formState.errors.number?.message,
    form.formState.errors.district?.message,
    genderOptions,
    maritalStatusOptions,
  ])

  const cpfValueWatch = form.watch('cpf')
  const rgValueWatch = form.watch('rg')
  const phoneValueWatch = form.watch('telephoneNumber')
  const birthDateValueWatch = form.watch('birthDate')
  const hireDateValueWatch = form.watch('hireDate')
  const postalCodeValueWatch = form.watch('postalCode')

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
          console.log('deu erro aqui mlk')
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
        console.log(response)
      }

      cep()
    }
  }, [postalCodeValueWatch, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button icon={<Plus />} variant="outline" size="sm">
          Criar Funcionário
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:min-w-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mt-20 sm:mt-0">
              <DialogTitle>Criar novo funcionário</DialogTitle>
              <DialogDescription>Crie um novo funcionário</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-5 py-4">
              {inputsRequire.map((input, index) =>
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
                            disabled={input.disable}
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                input.errorWatcher
                                  ? 'border-red-400 focus:border-red-400'
                                  : '',
                              )}
                            >
                              <SelectValue
                                className="w-full text-slate-500"
                                placeholder={input.inputPlaceholder}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <FormMessage />
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {input.selectOptions &&
                                input.selectOptions.map((option, index) => (
                                  <SelectItem key={index} value={option.value}>
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

            <DialogFooter className="flex w-full items-center justify-center">
              <Button type="submit" className="w-48">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalCreateEmployee)
