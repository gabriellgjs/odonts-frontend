import { ColumnDef } from '@tanstack/react-table'
import { People } from '@components/shared/types/people'

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'telephone',
    header: 'Telephone',
  },
]
