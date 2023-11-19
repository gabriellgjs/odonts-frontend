import { z } from 'zod'
import { CreateEmployeeSchema } from '../schema/createEmployeeSchema'

export type Employee = {
  id: number
  name: string
  birthDate: string
  cpf: string
  gender: string
  role: string
  hireDate: string
  maritalStatus: string
  rg: string
  user: {
    id: number
    status: string
    email: string
    password?: string
    roleId: number
    role: {
      description: string
    }
  }
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

export type createEmployeeFormData = z.infer<typeof CreateEmployeeSchema>

export type RoleOption = {
  id: number
  name?: string
  description: string
}

export type InputsProps =
  | {
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
      selectOptions?:
        | {
            value: string | number
            selectValue: string
          }[]
        | undefined
    }[]
  | undefined
