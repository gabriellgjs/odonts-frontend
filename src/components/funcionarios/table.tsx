import { columns } from './columns'
import { DataTable } from './dataTable'
import { EmployeeProps } from './types/employeeTypes'

const Table = ({ employees = [] }: EmployeeProps) => {
  return (
    <div className="sm:w-full">
      <DataTable columns={columns} data={employees} />
    </div>
  )
}

export default Table
