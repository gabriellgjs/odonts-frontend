import { ColumnDef } from '@tanstack/react-table'
import { MutableRefObject, ReactNode } from 'react'
import { z } from 'zod'
import { CreateEmployeeSchema } from '../schema/createEmployeeSchema'
import { type } from 'os'

export interface Employee {
  id: string
  name: string
  telephone: string
  status: string
}

export type GetEmployee = {
  id: number
  name: string
  birthDate: string
  cpf: string
  gender: string
  email: string
  role: string
  hireDate: string
  maritalStatus: string
  rg: string
  telephone: {
    id: number
    telephoneNumber: string
  }
  address: {
    id: number
    city: string
    district: string
    number: string
    postalCode: string
    state: string
    street: string
  }
}

export interface EmployeeProps {
  employees?: Employee[]
}
export type RefModalProps = {
  open: (id?: string | number, isActive?: boolean) => void
  close: () => void
}

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  refModalCreate?: MutableRefObject<RefModalProps | null>
  refModalEdit?: MutableRefObject<RefModalProps | null>
  refModalView?: MutableRefObject<RefModalProps | null>
  refModalStatus?: MutableRefObject<RefModalProps | null>
}

export type ModalProps = {
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

export type InputsProps = {
  labelTitle: string
  required: boolean
  disable?: boolean
  defaultValue?: string
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
  errorWatcher?: string | undefined
  className?: string
  isInput: boolean
  inputMax?: number
  selectOptions?: SelectOptionsProps
}[]
