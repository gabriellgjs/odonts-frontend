import { Metadata } from 'next'
import getPatients from '@/app/(dashboard-routes)/pacientes/api/getPatients'
import PatientsPage from '@components/paciente/patientsPage'

export const metadata: Metadata = {
  title: 'Pacientes - Odonts',
  description: 'Configure suas informações de perfil',
}
const Patients = async () => {
  const patients = await getPatients()

  return <PatientsPage patients={patients} />
}

export default Patients
