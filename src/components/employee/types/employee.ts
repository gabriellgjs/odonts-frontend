export interface EmployeeProps {
  employee: {
    id: number | string
    status: string
    hire_date: string
    termination_date: string
    pis_pasep: string
    user_id: number | string
  }
  people: {
    id: number | string
    name: string
    birth_date: string
    rg: string
    cpf: string
    gender: string
  }
  address: {
    id: number | string
    street: string
    district: string
    city: string
    postal_code: string
    state: string
  }
  telephone: {
    id: string
    number: string
  }
  patient: {
    id: string
    marital_status: string
    career: string
  }
}
