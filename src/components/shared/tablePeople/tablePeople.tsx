import { Input } from '@/components/ui/input'
import { cva } from 'class-variance-authority'
import { columns } from './columns'
import { DataTable } from './dataTable'
import { TablePeopleProps } from './types/tablePeopleProps'

export const tablePeopleVariants = cva('', {
  variants: {
    variant: {
      patients: '',
      employees: '',
    },
    size: {
      patients: '',
      employees: '',
    },
  },
  defaultVariants: {
    variant: 'patients',
    size: 'patients',
  },
})

const TablePeople = ({ people = [] }: TablePeopleProps) => {
  return (
    <div className="w-full">
      <div>
        <DataTable columns={columns} data={people} />
      </div>
    </div>
  )
}

export default TablePeople
