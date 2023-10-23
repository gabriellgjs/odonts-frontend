'use client'

import { Input } from '@components/ui/input'
import {
  Table,
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
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Eye, Pen, UserCheck2, UserX2 } from 'lucide-react'
import { Button } from '../ui/button'
import ModalCreateEmployee from './modalCreateEmployee'
import ModalEditEmployee from './modalEditEmployee'
import ModalViewEmployee from './modalViewEmployee'
import { DataTableProps, Employee } from './types/employeeTypes'
import StatusEmployeeButton from './statusEmployeeButton'

export function DataTable<TData extends Employee, TValue>({
  columns,
  data,
  refModalCreate,
  refModalEdit,
  refModalView,
  refModalStatus,
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
        pageSize: 7,
      },
    },
  })

  const ModalCreate = (
    <ModalCreateEmployee
      dialogRef={(ref) => {
        if (refModalCreate) refModalCreate.current = ref
      }}
    />
  )

  const ModalEdit = (
    <ModalEditEmployee
      dialogRef={(ref) => {
        if (refModalEdit) refModalEdit.current = ref
      }}
    />
  )

  const ModalView = (
    <ModalViewEmployee
      dialogRef={(ref) => {
        if (refModalView) refModalView.current = ref
      }}
    />
  )
  const ModalStatus = (
    <StatusEmployeeButton
      dialogRef={(ref) => {
        if (refModalStatus) refModalStatus.current = ref
      }}
    />
  )

  return (
    <div className="relative w-full overflow-auto">
      <div className="rounded-md border">
        <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between">
          <div>
            <Input
              inputSize="sm"
              variant="boxFinder"
              placeholder="Procure por nomes..."
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
            />
          </div>
          <div>
            {ModalCreate}
            {ModalView}
            {ModalEdit}
            {ModalStatus}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end space-x-2 px-6 sm:px-4">
            <Button
              variant="outline"
              size="sm"
              className="sm:bg-stone-200"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="sm:bg-stone-200"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </Button>
          </div>
          <Table>
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
                      <Button
                        onClick={() => {
                          refModalView?.current?.open(row.original.id)
                        }}
                        variant="outline"
                        icon={<Eye />}
                      />

                      <Button variant="outline" icon={<Pen />} />

                      <Button
                        variant="outline"
                        icon={
                          row.original.status === 'ativo' ? (
                            <UserX2 />
                          ) : (
                            <UserCheck2 />
                          )
                        }
                        onClick={() => {
                          refModalStatus?.current?.open(
                            row.original.id,
                            row.original.status === 'ativo',
                          )
                        }}
                      />
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
          </Table>
        </div>
      </div>
    </div>
  )
}
