import * as z from 'zod'
import { CreateEmployeeSchema } from '@components/funcionarios/schema/createEmployeeSchema'

export type Patient = {
  id: number
  name: string
  birthDate: string
  cpf: string
  gender: string
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
  patient: {
    status: string
  }
}

export const PatientSchema = CreateEmployeeSchema.omit({
  email: true,
  hireDate: true,
  roleId: true,
})

export type PatientFormValues = z.infer<typeof PatientSchema>
