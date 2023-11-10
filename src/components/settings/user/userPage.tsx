'use client'

import { Employee } from '@components/funcionarios/types/employeeTypes'
import api from '@lib/axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Skeleton } from '@components/ui/skeleton'
import UserTabs from '@components/settings/user/userTabs'

const UserPage = () => {
  const { data } = useSession()
  const [employee, setEmployee] = useState<Employee>()

  useEffect(() => {
    const employee = async () => {
      const id = data?.user.id
      try {
        await api.get(`/employees/${id}`).then((response) => {
          setEmployee(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    if (data?.user.id) {
      employee()
    }
  }, [data?.user.id])

  if (!employee) {
    return <Skeleton className="h-4 w-[200px]" />
  }

  return (
    <div className="flex w-full items-center justify-center">
      <UserTabs employee={employee} />
    </div>
  )
}

export default UserPage
