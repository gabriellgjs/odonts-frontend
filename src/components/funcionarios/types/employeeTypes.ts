import { ColumnDef } from '@tanstack/react-table'

export interface Employee {
  id: string
  name: string
  telephone: string
}

export interface EmployeeProps {
  employees?: Employee[]
}
export interface RefModalProps {
  open: () => void
  close: () => void
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}