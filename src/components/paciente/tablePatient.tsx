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
import { Patient } from '@components/paciente/types/patientTypes'
import { DataTableProps } from '@components/shared/table/types/tableProps'
import { DataTablePagination } from '@components/shared/table/tablePaggination'
import { useRef, useState } from 'react'
import { RefModalProps } from '@components/shared/dialog/types/dialogTypes'
import CreateDialogPatient from '@components/paciente/createDIalogPatient'
import { DataTableToolbar } from '@components/shared/table/tableToolBar/tableToolBar'
import { cn } from '@lib/utils'

export function TablePatient<TData extends Patient, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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

  const refModalCreatePatient = useRef<RefModalProps | null>(null)
  const CreateModal = (
    <CreateDialogPatient
      dialogRef={(ref) => {
        refModalCreatePatient.current = ref
      }}
    />
  )
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
                  className={cn(
                    'hover:bg-neutral-200/70 dark:hover:bg-gray-950/10',
                    Number(row.id) % 2 > 0
                      ? 'bg-neutral-100  dark:bg-stone-800/50'
                      : '',
                  )}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((row) => (
                    <TableCell key={row.id}>
                      {flexRender(row.column.columnDef.cell, row.getContext())}
                    </TableCell>
                  ))}
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
