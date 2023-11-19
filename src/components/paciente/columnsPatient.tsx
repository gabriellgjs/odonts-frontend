import { ColumnDef } from '@tanstack/react-table'
import { Patient } from './types/patientTypes'
import { statusUser } from '@components/shared/table/tableToolBar/statusUser'

export const columnsPatient: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: (header) => (
      <span className="text-left capitalize">
        {header.column.id === 'name' ? 'Nome' : ''}
      </span>
    ),
    cell: ({ row }) => {
      const name = row.original.name
      return <div className="text-left ">{name}</div>
    },
  },
  {
    accessorKey: 'Telefone',
    header: (header) => (
      <div className=" sm:w-32">
        <span className="capitalize sm:text-left">{header.column.id}</span>
      </div>
    ),
    cell: ({ row }) => {
      const telephone = row.original.telephone.telephoneNumber
      return <div className=" sm:text-left">{telephone}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ header }) => (
      <div className=" sm:w-32">
        <span className="capitalize sm:text-left">{header.column.id}</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = statusUser.find(
        (status) => status.value === row.original.patient.status,
      )

      if (!status) {
        return null
      }

      return (
        <div className="">
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.patient.status)
    },
  },
]
