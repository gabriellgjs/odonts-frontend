'use client'

import { Form } from '@components/ui/form'
import { createEmployeeFormData } from '@components/funcionarios/types/employeeTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEmployeeSchema } from '@components/funcionarios/schema/createEmployeeSchema'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { memo, useEffect } from 'react'
import {
  normalizeCEP,
  normalizeCPF,
  normalizeDate,
  normalizePhoneNumber,
} from '@utils/functions/normalizeInputs'
import { findByCEP } from '@services/findByCEP/findByCEP'
import SelectRoleId from '@components/shared/selects/selectRoleId'
import SelectGender from '@components/shared/selects/selectGender'
import SelectMaritalStatus from '@components/shared/selects/selectMaritalStatus'
import InputForm from '@components/shared/inputForm/inputForm'
import { Button } from '@components/ui/button'

type FormCreateProps = {
  onSubmit?: (dataForm: createEmployeeFormData) => void
}
const FormCreateEmployee = ({ onSubmit }: FormCreateProps) => {
  const form = useForm<createEmployeeFormData>({
    resolver: zodResolver(CreateEmployeeSchema),
  })
  const { data } = useSession()

  const cpfValueWatch = form.watch('cpf')

  useEffect(() => {
    form.setValue('cpf', normalizeCPF(cpfValueWatch))
  }, [cpfValueWatch, form])

  const birthDateValueWatch = form.watch('birthDate')

  useEffect(() => {
    form.setValue('birthDate', normalizeDate(birthDateValueWatch))
  }, [birthDateValueWatch, form])

  const hireDateValueWatch = form.watch('hireDate')
  useEffect(() => {
    form.setValue('hireDate', normalizeDate(hireDateValueWatch))
  }, [hireDateValueWatch, form])

  const phoneValueWatch = form.watch('telephoneNumber')

  useEffect(() => {
    form.setValue('telephoneNumber', normalizePhoneNumber(phoneValueWatch))
  }, [phoneValueWatch, form])

  const postalCodeValueWatch = form.watch('postalCode')
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
        form.setValue('street', response?.logradouro ?? '')
      }

      cep()
    }
  }, [postalCodeValueWatch, form])

  return (
    <Form {...form}>
      <form
        className={'h-full w-full overflow-y-auto px-6 pb-6'}
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : () => null}
      >
        <div className={'flex flex-col gap-2 gap-y-3 lg:grid lg:grid-cols-3'}>
          <InputForm
            control={form.control}
            name="name"
            className="col-span-2"
            title="Nome completo"
            placeholder="Ex: Maria Silva"
          />

          <InputForm
            control={form.control}
            name="cpf"
            title="CPF"
            placeholder="Ex: 123.456.789-10"
            maxLength={14}
          />

          <InputForm
            control={form.control}
            name="email"
            className="col-span-2"
            title="Email"
            placeholder="Ex: maria@gmail.com"
          />

          <InputForm
            control={form.control}
            name="rg"
            title="RG"
            placeholder="Digite seu RG"
            maxLength={15}
          />

          <SelectRoleId
            control={form.control}
            tokenApi={data?.user.token ?? ''}
          />

          <SelectGender control={form.control} />

          <SelectMaritalStatus control={form.control} />

          <InputForm
            control={form.control}
            name="telephoneNumber"
            title="Telefone"
            placeholder="Ex: (00) 12345-6789"
            maxLength={15}
          />

          <InputForm
            control={form.control}
            name="birthDate"
            title="Data de aniversário"
            placeholder="Ex: 01/01/2000"
            maxLength={10}
          />

          <InputForm
            control={form.control}
            name="hireDate"
            title="Data de admissão"
            placeholder="Ex: 01/01/2000"
            maxLength={10}
          />

          <InputForm
            control={form.control}
            name="postalCode"
            title="CEP"
            placeholder="Ex: 12345-678"
            maxLength={9}
          />

          <InputForm
            control={form.control}
            name="city"
            title="Cidade"
            disabled
            placeholder="Ex: Curitiba"
          />

          <InputForm
            control={form.control}
            name="state"
            title="UF"
            disabled
            placeholder="Ex: PR"
          />

          <InputForm
            control={form.control}
            name="street"
            title="Rua"
            placeholder="Ex: Rua das flores"
          />

          <InputForm
            control={form.control}
            name="number"
            title="Número"
            placeholder="Ex: 1000"
          />

          <InputForm
            control={form.control}
            name="district"
            title="Bairro"
            placeholder="Ex: Centro"
          />

          <div className={'col-span-3 flex justify-center '}>
            <Button type="submit" className="w-full sm:w-48">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default memo(FormCreateEmployee)
