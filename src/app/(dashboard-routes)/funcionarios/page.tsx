import Employees from '@components/funcionarios/employees'
import getEmployees from './api/getEmployees'

const EmployeesPage = async () => {
  const employees = await getEmployees()

  return <Employees employees={employees} />
}

export default EmployeesPage
