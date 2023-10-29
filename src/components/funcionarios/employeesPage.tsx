'use client'

import { useEffect, useState } from 'react'
import { Toaster } from '../ui/toaster'
import { columns } from './columns'
import { Employee } from './types/employeeTypes'
import { Table } from './table'

type EmployeesPageProps = {
  employees: Employee[] | undefined
}

const EmployeesPage = ({ employees }: EmployeesPageProps) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([])

  useEffect(() => {
    if (employees) setEmployeeList(employees)
  }, [employees])

  return (
    <div className="sm:mx-60 sm:flex sm:min-h-screen sm:overflow-y-visible">
      <Toaster />
      <div className="pb-4 sm:w-full">
        <Table columns={columns} data={employeeList} />
      </div>
    </div>
  )
}

export default EmployeesPage
