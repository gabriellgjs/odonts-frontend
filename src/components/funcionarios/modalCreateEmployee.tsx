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
import FormEmployee from './formEmployee'
import {
  ModalProps,
  RefFormProps,
  RefModalProps,
  createEmployeeFormData,
} from './types/employeeTypes'

const ModalCreateEmployee = ({ dialogRef }: ModalProps) => {
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
              description: 'Error ao criar funcionário',
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
        <div>
          <StyledDiv icon={<Plus />}>Criar Funcionário</StyledDiv>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:min-w-fit">
        <DialogHeader className="mt-20 sm:mt-0">
          <DialogTitle>Criar novo funcionário</DialogTitle>
          <DialogDescription>Crie um novo funcionário</DialogDescription>
        </DialogHeader>
        <FormEmployee
          disabledInputs={false}
          formRef={(ref) => {
            refFormCreate.current = ref
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalCreateEmployee)
