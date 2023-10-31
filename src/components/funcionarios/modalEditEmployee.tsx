'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Pen } from 'lucide-react'
import { memo, useCallback, useRef, useState } from 'react'

import { StyledDiv } from '../ui/styledDiv'
import FormEmployee from './formEmployee'
import {
  ModalProps,
  RefFormProps,
  createEmployeeFormData,
} from './types/employeeTypes'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import api from '@/lib/axios'

const ModalEditEmployee = ({ row }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const refFormView = useRef<RefFormProps | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = useCallback(
    (dataForm: createEmployeeFormData) => {
      const data = {
        id: row?.id,
        name: dataForm.name,
        birthDate: dataForm.birthDate,
        rg: dataForm.rg,
        cpf: dataForm.cpf,
        maritalStatus: dataForm.maritalStatus,
        gender: dataForm.gender,
        hireDate: dataForm.hireDate,
        user: {
          id: row?.user.id,
          email: dataForm.email,
          roleId:
            dataForm.roleId === row?.user.role.description
              ? row.user.roleId
              : dataForm.roleId,
        },
        address: {
          id: row?.address.id,
          street: dataForm.street,
          number: dataForm.number,
          district: dataForm.district,
          city: dataForm.city,
          postalCode: dataForm.postalCode,
          state: dataForm.state,
        },
        telephone: {
          id: row?.telephone.id,
          telephoneNumber: dataForm.telephoneNumber,
        },
      }

      const request = async () => {
        await api
          .put(`/employees/${row?.id}`, data)
          .then(() => {
            toast({
              title: 'Sucesso',
              description: 'Funcionário atualizado com sucesso',
            })
            setOpen(false)
          })
          .catch((error) => {
            console.log(error)
            toast({
              title: 'Atenção',
              variant: 'destructive',
              description: 'Error ao atualizar funcionário',
            })
          })
          .finally(() => {
            router.refresh()
          })
      }

      request()
    },
    [
      router,
      row?.address.id,
      row?.id,
      row?.telephone.id,
      row?.user.id,
      row?.user.role.description,
      row?.user.roleId,
      toast,
    ],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) refFormView.current?.reset()
      }}
    >
      <DialogTrigger asChild>
        <div>
          <StyledDiv icon={<Pen />} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:min-w-fit">
        <DialogHeader className="mt-20 sm:mt-0">
          <DialogTitle>Editar funcionário</DialogTitle>
        </DialogHeader>
        <FormEmployee
          disabledInputs={false}
          row={row}
          formRef={(ref) => {
            refFormView.current = ref
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalEditEmployee)
