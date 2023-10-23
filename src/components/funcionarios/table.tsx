import { useRef } from 'react'
import { columns } from './columns'
import { DataTable } from './dataTable'
import { EmployeeProps, RefModalProps } from './types/employeeTypes'

const Table = ({ employees = [] }: EmployeeProps) => {
  const refModalCreateEmployee = useRef<RefModalProps | null>(null)
  const refModalEditEmployee = useRef<RefModalProps | null>(null)
  const refModalViewEmployee = useRef<RefModalProps | null>(null)
  const refModalStatusEmployee = useRef<RefModalProps | null>(null)

  return (
    <div className="pb-4 sm:w-full">
      <DataTable
        refModalCreate={refModalCreateEmployee}
        refModalEdit={refModalEditEmployee}
        refModalView={refModalViewEmployee}
        refModalStatus={refModalStatusEmployee}
        columns={columns}
        data={employees}
      />
    </div>
  )
}

export default Table
