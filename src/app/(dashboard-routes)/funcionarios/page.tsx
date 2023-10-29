import EmployeesPage from '@components/funcionarios/employeesPage'
import getEmployees from './api/getEmployees'

const Employees = async () => {
  const employees = await getEmployees()

  return <EmployeesPage employees={employees} />
}

export default Employees
