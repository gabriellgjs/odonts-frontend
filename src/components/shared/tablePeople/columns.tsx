import { ColumnDef } from '@tanstack/react-table'
import { People } from '@components/shared/types/people'
import { Eye, Pen, Trash2 } from 'lucide-react'

export const columns: ColumnDef<People>[] = [
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
    accessorKey: 'actions',
    header: () => <></>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-4">
          <Eye />
          <Pen />
          <Trash2 />
        </div>
      )
    },
  },
]
