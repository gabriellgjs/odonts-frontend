import { ColumnDef } from '@tanstack/react-table'
import { number, object, string, z } from 'zod'
import { CreateEmployeeSchema } from '../schema/createEmployeeSchema'

export interface Employee {
  id: string
  name: string
  telephone: string
}

export interface EmployeeProps {
  employees?: Employee[]
}
export interface RefModalProps {
  open: () => void
  close: () => void
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export interface ModalCreateProps {
  dialogRef: (ref: RefModalProps) => void | undefined
}

export type createEmployeeFormData = z.infer<typeof CreateEmployeeSchema>

export type RoleOption = {
  id: number
  name: string
  description: string
}[]

export type SelectOptionsProps = {
  value: string | number
  selectValue: string
}[]

export interface InputsProps {
  labelTitle: string
  required: boolean
  disable?: boolean
  inputName:
    | 'name'
    | 'email'
    | 'rg'
    | 'cpf'
    | 'roleId'
    | 'gender'
    | 'maritalStatus'
    | 'telephoneNumber'
    | 'birthDate'
    | 'hireDate'
    | 'postalCode'
    | 'street'
    | 'state'
    | 'number'
    | 'district'
    | 'city'
  inputPlaceholder: string
  errorWatcher: string | undefined
  className?: string
  isInput: boolean
  inputMax?: number
  selectOptions?: SelectOptionsProps
}
