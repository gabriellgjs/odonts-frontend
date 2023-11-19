import * as React from 'react'
import { CheckIcon, Filter } from 'lucide-react'
import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Button } from '@components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hidden p-4 dark:bg-transparent dark:hover:bg-stone-800/50 sm:block"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="center">
        <Command>
          <CommandList>
            <CommandGroup>
              {options &&
                options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }
                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined,
                        )
                      }}
                    >
                      <div
                        className={cn(
                          'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                      )}
                      <span>{option.label}</span>
                      {facets?.get(option.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
