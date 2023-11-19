import api from '@lib/axios'
import { cache } from 'react'
import { Patient } from '@components/paciente/types/patientTypes'

const getPatients = cache(async () => {
  try {
    const patients = await api
      .get('/patients')
      .then((response): Patient[] => response.data)
    return patients
  } catch (error) {
    console.log(error)
  }
})

export default getPatients
