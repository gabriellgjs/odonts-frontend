'use client'

import { FilterX } from 'lucide-react'
import { Table } from '@tanstack/react-table'

import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ReactElement } from 'react'
import { statusUser } from '@components/shared/table/tableToolBar/statusUser'
import { DataTableFacetedFilter } from '@components/shared/table/tableToolBar/filterStatus'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  trigger?: ReactElement
}

export function DataTableToolbar<TData>({
  table,
  trigger,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center sm:space-x-4 lg:space-x-8">
        <Input
          variant="ghost"
          name="finder"
          inputSize="lg"
          className={'dark:border-gray-800'}
          placeholder="Procure por nomes..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statusUser}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="dark:hover:bg-stone-800/50 lg:p-4"
          >
            <FilterX className="h-5 w-5" />
            limpar
          </Button>
        )}
      </div>
      {trigger}
    </div>
  )
}
