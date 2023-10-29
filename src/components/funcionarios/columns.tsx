import { ColumnDef } from '@tanstack/react-table'
import { Employee } from './types/employeeTypes'

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="text-left">Nome</span>,
    cell: ({ row }) => {
      const name = row.original.name
      return <div className="text-left ">{name}</div>
    },
  },
  {
    accessorKey: 'telephone',
    header: () => (
      <div className=" sm:w-32">
        <span className="sm:text-left">Telefone</span>
      </div>
    ),
    cell: ({ row }) => {
      const telephone = row.original.telephone.telephoneNumber
      return <div className=" sm:text-left">{telephone}</div>
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <div className=" sm:w-32">
        <span className=" sm:text-left">Status</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.user.status
      return <div className=" sm:text-left sm:capitalize">{status}</div>
    },
  },
]
