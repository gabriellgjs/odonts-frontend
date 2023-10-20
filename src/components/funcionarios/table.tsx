import { columns } from './columns'
import { DataTable } from './dataTable'
import { EmployeeProps } from './types/employeeTypes'

const Table = ({ employees = [] }: EmployeeProps) => {
  return (
    <div className="pb-16 sm:w-full">
      <DataTable columns={columns} data={employees} />
    </div>
  )
}

export default Table
