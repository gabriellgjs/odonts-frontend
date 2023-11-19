'use client'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useRef, useState } from 'react'

import CreateDialogEmployee from './createDialogEmployee'
import ModalEditEmployee from './modalEditEmployee'
import ModalViewEmployee from './modalViewEmployee'
import StatusEmployeeButton from './statusEmployeeButton'
import { Employee } from '@components/funcionarios/types/employeeTypes'
import { DataTableProps } from '@components/shared/table/types/tableProps'
import { RefModalProps } from '@components/shared/dialog/types/dialogTypes'
import { DataTablePagination } from '@components/shared/table/tablePaggination'
import { cn } from '@lib/utils'
import { DataTableToolbar } from '@components/shared/table/tableToolBar/tableToolBar'

export function TableEmployee<TData extends Employee, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const CreateModal = (
    <CreateDialogEmployee
      dialogRef={(ref) => {
        refModalCreateEmployee.current = ref
      }}
    />
  )
  const refModalCreateEmployee = useRef<RefModalProps | null>(null)
  const refModalEditEmployee = useRef<RefModalProps | null>(null)

  return (
    <div className="w-full px-12 py-8 md:px-20">
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-between p-4 sm:flex-row">
          <DataTableToolbar table={table} trigger={CreateModal} />
        </div>

        <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    'hover:bg-neutral-200/70 dark:hover:bg-gray-950/10',
                    Number(row.id) % 2 > 0
                      ? 'bg-neutral-100  dark:bg-stone-800/50'
                      : '',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <td className="mr-4 flex h-full items-center justify-end ">
                    <ModalViewEmployee row={row.original} />
                    <ModalEditEmployee
                      row={row.original}
                      dialogRef={(ref) => {
                        refModalEditEmployee.current = ref
                      }}
                    />
                    <StatusEmployeeButton row={row.original} />
                  </td>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
