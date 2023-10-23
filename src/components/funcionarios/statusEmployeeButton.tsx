import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { ModalProps, RefModalProps } from './types/employeeTypes'

const StatusEmployeeButton = ({ dialogRef }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string | undefined | number>()
  const [isActive, setIsActive] = useState<boolean>()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: (id, isEmployeeActive) => {
          setId(id)
          setOpen(true)
          setIsActive(isEmployeeActive)
        },
        close: () => setOpen(false),
      }
      dialogRef(ref)
    }
  }, [dialogRef])

  const statusEmployee = () => {
    const employee = async () => {
      await api
        .patch(`/employees/${id}`)
        .then(() => {
          toast({
            title: `Sucesso`,
            description: `Funcionário ${
              isActive ? 'inativado' : 'ativado'
            } com sucesso`,
          })
          setOpen(false)
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: 'Atenção',
            variant: 'destructive',
            description: `Error ao ${
              isActive ? 'inativar' : 'ativar'
            } o funcionário`,
          })
        })
        .finally(() => {
          router.refresh()
        })
    }
    if (id) {
      employee()
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) console.log(isOpen)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja {isActive ? 'inativar' : 'ativar'} este funcionário?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive ? (
              <span>
                As informações desse usuário
                <strong> não serão perdidas ou removidas. </strong>
                Mas o funcionário
                <strong> não irá poder acessar ao sistema.</strong>
              </span>
            ) : (
              <span>
                O usuário será
                <strong>
                  {' '}
                  ativado e poderá ter acesso novamente ao sistema
                </strong>
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full flex-col justify-center gap-3 pt-4 sm:justify-end">
          <AlertDialogAction onClick={statusEmployee}>
            Confirmar
          </AlertDialogAction>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default StatusEmployeeButton
