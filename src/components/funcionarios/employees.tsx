'use client'

import { useEffect, useState } from 'react'

import { EmployeesProps } from './types/employeesProps'
import { People } from '../shared/types/people'
import TablePeople from '../shared/tablePeople/tablePeople'

const Employees = ({ employees }: EmployeesProps) => {
  const [peopleList, setPeopleList] = useState<People[]>([])

  useEffect(() => {
    if (employees) setPeopleList(employees)
  }, [employees])

  return (
    <div className="sm:mx-60 sm:flex">
      <TablePeople people={peopleList} />
    </div>
  )
}

export default Employees
