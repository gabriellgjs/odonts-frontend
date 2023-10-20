import api from '@lib/axios'
import { cache } from 'react'
import { Employee } from '@components/funcionarios/types/employeeTypes'

const getEmployees = cache(async () => {
  try {
    const employees = await api
      .get('/employees')
      .then((response): Employee[] => response.data.response)
    return employees
  } catch (error) {
    console.log(error)
  }
})

export default getEmployees
