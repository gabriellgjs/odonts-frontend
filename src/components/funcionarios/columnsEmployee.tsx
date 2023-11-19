import { ColumnDef } from '@tanstack/react-table'
import { Employee } from './types/employeeTypes'
import { statusUser } from '@components/shared/table/tableToolBar/statusUser'

export const columnsEmployee: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="text-left">Nome completo</span>,
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
    header: () => <span className="text-left">Status</span>,

    cell: ({ row }) => {
      const status = statusUser.find(
        (status) => status.value === row.original.user.status,
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-5 w-5" />
          )}
          <span className={'capitalize'}>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.user.status)
    },
  },
]
