'use client'

import { useEffect, useState } from 'react'
import { Toaster } from '../ui/toaster'
import { Patient } from '@components/paciente/types/patientTypes'
import { TablePatient } from '@components/paciente/tablePatient'
import { columnsPatient } from '@components/paciente/columnsPatient'

type PatientsPageProps = {
  patients: Patient[] | undefined
}

const PatientsPage = ({ patients }: PatientsPageProps) => {
  const [patientList, setPatientList] = useState<Patient[]>([])

  useEffect(() => {
    if (patients) setPatientList(patients)
  }, [patients])

  return (
    <div className="h-full w-full">
      <Toaster />
      <TablePatient columns={columnsPatient} data={patientList} />
    </div>
  )
}

export default PatientsPage
