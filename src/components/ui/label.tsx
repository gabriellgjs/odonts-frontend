'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)
interface LabelProps {
  required?: boolean
}

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> &
    LabelProps
>(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {children}
    {required ? <span className="text-red-500">*</span> : <></>}
  </LabelPrimitive.Root>
))

Label.displayName = 'Label'

export { Label }
