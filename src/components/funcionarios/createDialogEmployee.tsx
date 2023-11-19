'use client'

import { Plus } from 'lucide-react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { StyledDiv } from '../ui/styledDiv'
import { useToast } from '../ui/use-toast'
import { createEmployeeFormData } from './types/employeeTypes'
import FormCreateEmployee from '@components/funcionarios/create/formCreateEmployee'
import {
  ModalProps,
  RefFormProps,
  RefModalProps,
} from '@components/shared/dialog/types/dialogTypes'

const CreateDialogEmployee = ({ dialogRef }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const refFormCreate = useRef<RefFormProps | null>(null)

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      }
      dialogRef(ref)
    }
  }, [dialogRef])

  const onSubmit = useCallback(
    (dataForm: createEmployeeFormData) => {
      const data = {
        name: dataForm.name,
        birthDate: dataForm.birthDate,
        rg: dataForm.rg,
        cpf: dataForm.cpf,
        maritalStatus: dataForm.maritalStatus,
        gender: dataForm.gender,
        hireDate: dataForm.hireDate,
        email: dataForm.email,
        roleId: Number(dataForm.roleId),
        address: {
          street: dataForm.street,
          number: dataForm.number,
          district: dataForm.district,
          city: dataForm.city,
          postalCode: dataForm.postalCode,
          state: dataForm.state,
        },
        telephone: {
          telephoneNumber: dataForm.telephoneNumber,
        },
      }

      const request = async () => {
        await api
          .post('/employees', data)
          .then(() => {
            toast({
              title: 'Sucesso',
              description: 'Funcionário criado com sucesso',
            })
            setOpen(false)
          })
          .catch((error) => {
            console.log(error)
            toast({
              title: 'Atenção',
              variant: 'destructive',
              description: error.response.data.message,
            })
          })
          .finally(() => {
            router.refresh()
          })
      }

      request()
    },
    [router, toast],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) refFormCreate.current?.reset()
      }}
    >
      <DialogTrigger asChild>
        <div className={'w-full sm:max-w-fit'}>
          <StyledDiv
            className="cursor-pointer bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:bg-gray-800"
            icon={<Plus />}
          >
            <span className="text-gray-700 dark:text-neutral-100">
              Criar Funcionário
            </span>
          </StyledDiv>
        </div>
      </DialogTrigger>

      <DialogContent className="flex h-screen max-h-[90svh] w-full flex-col px-4 py-8">
        <DialogHeader className="">
          <DialogTitle>Criar novo funcionário</DialogTitle>
          <DialogDescription>Crie um novo funcionário</DialogDescription>
        </DialogHeader>
        <FormCreateEmployee onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default memo(CreateDialogEmployee)
