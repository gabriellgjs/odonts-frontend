'use client'

import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog'
import { Eye } from 'lucide-react'
import { memo, useRef, useState } from 'react'

import { StyledDiv } from '../ui/styledDiv'
import FormEmployee from './formEmployee'
import { ModalProps, RefFormProps } from './types/employeeTypes'

const ModalViewEmployee = ({ row }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const refFormView = useRef<RefFormProps | null>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) refFormView.current?.reset()
      }}
    >
      <DialogTrigger asChild>
        <div>
          <StyledDiv className={'py-0 hover:bg-gray-100'} icon={<Eye />} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:min-w-fit">
        <FormEmployee
          row={row}
          disabledInputs={true}
          formRef={(ref) => {
            refFormView.current = ref
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalViewEmployee)
