import { Table } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@components/ui/button'
import colors from 'tailwindcss/colors'
import { useTheme } from 'next-themes'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { resolvedTheme } = useTheme()
  return (
    <div className="flex w-full items-center justify-end overscroll-x-auto px-4 py-4 pt-4">
      <div className="flex items-end space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 dark:bg-stone-800 dark:hover:bg-gray-800 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para primeira página</span>
            <ChevronsLeftIcon
              className="h-4 w-4"
              color={
                resolvedTheme === 'dark' ? colors.gray[100] : colors.gray[800]
              }
            />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 dark:bg-stone-800 dark:hover:bg-gray-800"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para ultima página</span>
            <ChevronLeftIcon
              className="h-4 w-4"
              color={
                resolvedTheme === 'dark' ? colors.gray[100] : colors.gray[800]
              }
            />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 dark:bg-stone-800 dark:hover:bg-gray-800"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para próxima página</span>
            <ChevronRightIcon
              className="h-4 w-4"
              color={
                resolvedTheme === 'dark' ? colors.gray[100] : colors.gray[800]
              }
            />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 dark:bg-stone-800 dark:hover:bg-gray-800 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Voltar para página anterior</span>
            <ChevronsRightIcon
              className="h-4 w-4"
              color={
                resolvedTheme === 'dark' ? colors.gray[100] : colors.gray[800]
              }
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
