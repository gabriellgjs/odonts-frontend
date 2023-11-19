import api from '@/lib/axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog'
import { UserCheck2, UserX2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { StyledDiv } from '../ui/styledDiv'
import { useToast } from '../ui/use-toast'
import { ModalProps } from '@components/shared/dialog/types/dialogTypes'

const StatusEmployeeButton = ({ row }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const status = row ? row.user.status : ''

  const statusEmployee = () => {
    const employee = async () => {
      await api
        .patch(`/employees/${row ? row.id : 0}`)
        .then(() => {
          toast({
            title: `Sucesso`,
            description: `Funcionário ${
              status === 'ativo' ? 'inativado' : 'ativado'
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
              status === 'ativo' ? 'inativar' : 'ativar'
            } o funcionário`,
          })
        })
        .finally(() => {
          router.refresh()
        })
    }

    employee()
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
      }}
    >
      <AlertDialogTrigger>
        <>
          <StyledDiv
            className={'p-8 hover:bg-gray-100'}
            icon={status === 'ativo' ? <UserX2 /> : <UserCheck2 />}
          />
        </>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja {status === 'ativo' ? 'inativar' : 'ativar'} este
            funcionário?
          </AlertDialogTitle>
          <AlertDialogDescription className={'dark:text-gray-100'}>
            {status === 'ativo' ? (
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
