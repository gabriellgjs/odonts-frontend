'use client'

import { Input } from '@components/ui/input'
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRef, useState } from 'react'

import ButtonsPagination from './buttonsPagination'
import ModalCreateEmployee from './modalCreateEmployee'
import ModalEditEmployee from './modalEditEmployee'
import ModalViewEmployee from './modalViewEmployee'
import StatusEmployeeButton from './statusEmployeeButton'
import { DataTableProps, Employee, RefModalProps } from './types/employeeTypes'

export function Table<TData extends Employee, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  })

  const InputFinder = (
    <Input
      inputSize="sm"
      variant="boxFinder"
      name="finder"
      placeholder="Procure por nomes..."
      value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      onChange={(event) =>
        table.getColumn('name')?.setFilterValue(event.target.value)
      }
    />
  )
  const refModalCreateEmployee = useRef<RefModalProps | null>(null)
  const refModalEditEmployee = useRef<RefModalProps | null>(null)

  return (
    <div className="relative w-full overflow-auto">
      <div className="rounded-md border">
        <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between">
          {InputFinder}
          <ModalCreateEmployee
            dialogRef={(ref) => {
              refModalCreateEmployee.current = ref
            }}
          />
        </div>

        <ButtonsPagination
          getCanNextPage={table.getCanNextPage()}
          getCanPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          previousPage={table.previousPage}
        />

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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <td className="mr-4 flex items-center justify-end gap-4 py-4">
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
      </div>
    </div>
  )
}
