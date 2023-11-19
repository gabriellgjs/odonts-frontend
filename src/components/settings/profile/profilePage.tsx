'use client'

import { Employee } from '@components/funcionarios/types/employeeTypes'

import api from '@lib/axios'
import { useSession } from 'next-auth/react'
import { cache, useEffect, useState } from 'react'
import { ProfileForm } from '@components/settings/profile/profileForm'
import { Skeleton } from '@components/ui/skeleton'

const ProfilePage = () => {
  const { data } = useSession()
  const [employee, setEmployee] = useState<Employee>()

  useEffect(() => {
    const employee = cache(async () => {
      const id = data?.user.id
      try {
        await api.get(`/employees/${id}`).then((response) => {
          setEmployee(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    })
    if (data?.user.id) {
      employee()
    }
  }, [data?.user.id])

  if (!employee) {
    return <Skeleton className="h-4 w-[200px]" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-center text-lg font-medium lg:text-left">
          Dados pessoais
        </h3>
      </div>

      <ProfileForm employee={employee} />
    </div>
  )
}

export default ProfilePage
