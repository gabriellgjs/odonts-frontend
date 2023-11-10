import EmployeesPage from '@components/funcionarios/employeesPage'
import getEmployees from './api/getEmployees'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funcionários - Odonts',
  description: 'Configure suas informações de perfil',
}
const Employees = async () => {
  const employees = await getEmployees()

  return <EmployeesPage employees={employees} />
}

export default Employees
