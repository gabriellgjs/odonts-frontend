'use client'

import { useEffect, useState } from 'react'

import { EmployeeProps, Employee } from './types/employeeTypes'
import Table from './table'
import { Toaster } from '../ui/toaster'

const Employees = (props: EmployeeProps) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([])

  useEffect(() => {
    if (props.employees) setEmployeeList(props.employees)
  }, [props.employees])

  return (
    <div className="sm:mx-60 sm:flex">
      <Toaster />
      <Table employees={employeeList} />
    </div>
  )
}

export default Employees
