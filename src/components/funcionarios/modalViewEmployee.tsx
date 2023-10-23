'use client'

import { Dialog, DialogContent } from '@components/ui/dialog'
import { cn } from '@lib/utils'

import api from '@/lib/axios'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Select, SelectTrigger, SelectValue } from '@components/ui/select'
import { useEffect, useMemo, useState } from 'react'
import {
  GetEmployee,
  InputsProps,
  ModalProps,
  RefModalProps,
} from './types/employeeTypes'

const ModalViewEmployee = ({ dialogRef }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string | undefined | number>()
  const [employee, setEmployee] = useState<GetEmployee>()

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: (id) => {
          setId(id)
          setOpen(true)
        },
        close: () => setOpen(false),
      }
      dialogRef(ref)
    }
  }, [dialogRef])

  useEffect(() => {
    const employee = async () => {
      const response = await api
        .get(`/employees/${id}`)
        .then((response): GetEmployee => {
          return response.data
        })
      setEmployee(response)
    }
    if (id) {
      employee()
    }
  }, [id])

  const inputsRequire: InputsProps = useMemo(
    () => [
      {
        labelTitle: 'Nome',
        required: true,
        inputName: 'name',
        inputPlaceholder: 'Ex: Maria Silva',
        className: 'col-span-2',
        isInput: true,
        disable: true,
        defaultValue: employee?.name,
      },
      {
        labelTitle: 'CPF',
        required: true,
        inputName: 'cpf',
        inputPlaceholder: 'Ex: 123.456.789-10',
        isInput: true,
        inputMax: 14,
        disable: true,
        defaultValue: employee?.cpf,
      },
      {
        labelTitle: 'E-mail',
        required: true,
        inputName: 'email',
        inputPlaceholder: 'Ex: joao@gmail.com',
        className: 'col-span-2',
        isInput: true,
        disable: true,
        defaultValue: employee?.email,
      },
      {
        labelTitle: 'RG',
        required: true,
        inputName: 'rg',
        inputPlaceholder: 'Ex: 01.234.567-0',
        isInput: true,
        inputMax: 12,
        disable: true,
        defaultValue: employee?.rg,
      },
      {
        labelTitle: 'Cargo',
        required: true,
        inputName: 'roleId',
        inputPlaceholder: 'Selecione um cargo',
        isInput: false,
        disable: true,
        defaultValue: employee?.role,
      },
      {
        labelTitle: 'Gênero',
        required: true,
        inputName: 'gender',
        inputPlaceholder: 'Selecione um gênero',
        isInput: false,
        disable: true,
        defaultValue: employee?.gender,
      },
      {
        labelTitle: 'Estado Civil',
        required: true,
        inputName: 'maritalStatus',
        inputPlaceholder: 'Selecione um estado civil',
        isInput: false,
        disable: true,
        defaultValue: employee?.maritalStatus,
      },
      {
        labelTitle: 'Telefone',
        required: true,
        inputName: 'telephoneNumber',
        inputPlaceholder: 'Ex: (00) 91234-5678',
        isInput: true,
        disable: true,
        defaultValue: employee?.telephone.telephoneNumber,
      },
      {
        labelTitle: 'Data de Nascimento',
        required: true,
        inputName: 'birthDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        isInput: true,
        inputMax: 10,
        disable: true,
        defaultValue: employee?.birthDate,
      },
      {
        labelTitle: 'Data de Admissão',
        required: true,
        inputName: 'hireDate',
        inputPlaceholder: 'Ex: 01/01/2000',
        isInput: true,
        inputMax: 10,
        disable: true,
        defaultValue: employee?.hireDate,
      },
      {
        labelTitle: 'CEP',
        required: true,
        inputName: 'postalCode',
        inputPlaceholder: 'Ex: 12345-678',
        isInput: true,
        inputMax: 9,
        disable: true,
        defaultValue: employee?.address.postalCode,
      },
      {
        labelTitle: 'Estado',
        required: true,
        inputName: 'state',
        disable: true,
        className: 'disabled:text-gray-900',
        inputPlaceholder: 'Ex: Paraná',
        isInput: true,
        defaultValue: employee?.address.state,
      },
      {
        labelTitle: 'Cidade',
        required: true,
        inputName: 'city',
        disable: true,
        inputPlaceholder: 'Ex: Curitiba',
        className: 'disabled:text-gray-900',
        isInput: true,
        defaultValue: employee?.address.city,
      },
      {
        labelTitle: 'Rua',
        inputName: 'street',
        required: true,
        inputPlaceholder: 'Ex: Rua das flores',
        isInput: true,
        disable: true,
        defaultValue: employee?.address.street,
      },
      {
        labelTitle: 'Número',
        inputName: 'number',
        required: true,
        inputPlaceholder: 'Ex: 1001',
        isInput: true,
        disable: true,
        defaultValue: employee?.address.number,
      },
      {
        labelTitle: 'Bairro',
        inputName: 'district',
        required: true,
        inputPlaceholder: 'Ex: Centro',
        isInput: true,
        disable: true,
        defaultValue: employee?.address.district,
      },
    ],
    [
      employee?.address.city,
      employee?.address.district,
      employee?.address.number,
      employee?.address.postalCode,
      employee?.address.state,
      employee?.address.street,
      employee?.birthDate,
      employee?.cpf,
      employee?.email,
      employee?.gender,
      employee?.hireDate,
      employee?.maritalStatus,
      employee?.name,
      employee?.rg,
      employee?.role,
      employee?.telephone.telephoneNumber,
    ],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) console.log(isOpen)
      }}
    >
      <DialogContent className="sm:min-w-fit">
        <form>
          <div className="grid grid-cols-3 gap-5 py-4">
            {inputsRequire.map((input, index) =>
              input.isInput ? (
                <div
                  className={cn(
                    'relative mb-2 flex flex-col items-start gap-2',
                    input.className,
                  )}
                  key={index}
                >
                  <Label required={input.required}>{input.labelTitle}</Label>
                  <Input
                    defaultValue={input.defaultValue}
                    name={input.inputName}
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
                </div>
              ) : (
                <div
                  className={cn(
                    'relative mb-2 flex flex-col items-start gap-2',
                    input.className,
                  )}
                  key={index}
                >
                  <Label required={input.required}>{input.labelTitle}</Label>
                  <Select name={input.inputName} disabled={input.disable}>
                    <SelectTrigger
                      className={cn(
                        input.errorWatcher
                          ? 'border-red-400 focus:border-red-400'
                          : '',
                      )}
                    >
                      <SelectValue placeholder={input.defaultValue} />
                    </SelectTrigger>
                  </Select>
                </div>
              ),
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalViewEmployee
