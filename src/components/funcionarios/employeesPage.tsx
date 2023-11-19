'use client'

import { useEffect, useState } from 'react'
import { Toaster } from '../ui/toaster'
import { columnsEmployee } from './columnsEmployee'
import { Employee } from './types/employeeTypes'
import { TableEmployee } from '@components/funcionarios/tableEmployee'

type EmployeesPageProps = {
  employees: Employee[] | undefined
}

const EmployeesPage = ({ employees }: EmployeesPageProps) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([])

  useEffect(() => {
    if (employees) setEmployeeList(employees)
  }, [employees])

  return (
    <div className="h-full w-full">
      <Toaster />
      <TableEmployee columns={columnsEmployee} data={employeeList} />
    </div>
  )
}

export default EmployeesPage
