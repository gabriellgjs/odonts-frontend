import { api } from '@lib/axios'
import { getServerSession } from 'next-auth'
import { cache } from 'react'

import nextAuthOptions from '@/app/api/auth/[...nextauth]/nextAuthOptions'
import { People } from '@components/shared/types/people'

const getEmployees = cache(async () => {
  try {
    const token = await getServerSession(nextAuthOptions).then(
      (result) => result?.user.token,
    )

    const employees = await api
      .get('/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response): People[] => response.data.response)
    return employees
  } catch (error) {
    console.log(error)
  }
})

export default getEmployees

// TODO REACT CACHE
