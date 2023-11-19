import { Employee } from '@components/funcionarios/types/employeeTypes'

export type RefModalProps = {
  open: (id?: string | number, isActive?: boolean) => void
  close: () => void
}

export type RefFormProps = {
  reset: () => void
}

export type ModalProps = {
  dialogRef?: (ref: RefModalProps) => void | undefined
  row?: Employee
}
