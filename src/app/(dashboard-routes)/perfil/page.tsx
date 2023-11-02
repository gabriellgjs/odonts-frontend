'use client'

import { Employee } from '@components/funcionarios/types/employeeTypes'
import ProfilePage from '@components/profile/page'
import api from '@lib/axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Profile = () => {
  const { data } = useSession()
  const [employeeT, setEmployeeT] = useState<Employee | undefined>(undefined)

  useEffect(() => {
    const employee = async () => {
      const id = data?.user.id
      try {
        const employees = await api.get(`/employees/${id}`).then((response) => {
          setEmployeeT(response.data)
        })
        return employees
      } catch (error) {
        console.log(error)
      }
    }
    if (data?.user.id) {
      employee()
    }
  }, [data?.user.id])

  return <ProfilePage />
}

export default Profile
