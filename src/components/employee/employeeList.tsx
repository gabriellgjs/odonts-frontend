'use client'

import { api } from '@/lib/axios'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { People } from '../shared/people/people'
import { EmployeesListResponse } from './types/employeesList'

export const EmployeesList = () => {
  const [employees, setEmployees] = useState<EmployeesListResponse[]>([])
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = await getSession()
      const res = await api.get('employees', {
        headers: { Authorization: `Bearer ${token?.user.token}` },
      })
      setEmployees(res.data.results)
    }
    fetchEmployees()
  }, [])
  return (
    <div className="flex min-h-screen justify-center">
      {/* barra de pesquisa */}
      <div className="space-x-80">
        <div className="mx-5 h-full items-center justify-center">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <People key={employee.id} id={employee.id} name={employee.name} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
