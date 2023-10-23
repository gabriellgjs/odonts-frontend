import { ColumnDef } from '@tanstack/react-table'
import { Employee } from './types/employeeTypes'

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="text-left">Nome</span>,
    cell: ({ row }) => {
      const name = String(row.getValue('name'))
      return <div className="text-left ">{name}</div>
    },
  },
  {
    accessorKey: 'telephone',
    header: () => (
      <div className="w-32">
        <span className="text-left">Telefone</span>
      </div>
    ),
    cell: ({ row }) => {
      const telephone = String(row.getValue('telephone'))
      return <div className="text-left">{telephone}</div>
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <div className="w-32">
        <span className="text-left">Status</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = String(row.getValue('status'))
      return <div className="text-left capitalize">{status}</div>
    },
  },
]
