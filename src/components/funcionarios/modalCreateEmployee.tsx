import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateEmployeeSchema,
  createEmployeeFormData,
} from './schema/CreateEmployeeSchema'
import { useEffect, useState } from 'react'
import { RefModalProps } from './types/employeeTypes'

interface ModalCreate {
  dialogRef: (ref: RefModalProps) => void | undefined
}

const ModalCreateEmployee = ({ dialogRef }: ModalCreate) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      }
      dialogRef(ref)
    }
  }, [dialogRef])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createEmployeeFormData>({
    resolver: zodResolver(CreateEmployeeSchema),
  })

  console.log(errors)
  const onSubmit = (data: any) => {
    console.log(data, 'aqui')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button icon={<Plus />} variant="outline" size="sm">
          Criar Funcionário
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:min-w-fit">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mt-20 sm:mt-0">
            <DialogTitle>Criar novo funcionário</DialogTitle>
            <DialogDescription>Crie um novo funcionário</DialogDescription>
          </DialogHeader>
          <div className="flex grid-cols-3 flex-col gap-5 py-4">
            <div className="relative col-span-3 mb-1 flex w-full flex-col items-start gap-2">
              <Label htmlFor="name" required>
                Nome
              </Label>

              <Input
                {...register('name')}
                placeholder="Ex: Maria Silva"
                className="w-full"
              />
              {errors.name?.message && (
                <span
                  className=" absolute -bottom-6
                   text-xs"
                >
                  {errors.name?.message}
                </span>
              )}
            </div>

            {/* <div className="relative flex flex-col items-start gap-4">
              <div className="absolute">
                <Label htmlFor="cpf" required>
                  CPF
                </Label>
                <Input placeholder="Ex: 123.456.789-10" />
                {errors.cpf?.message && (
                  <span className="bottom-2 text-xs">
                    {errors.cpf?.message}
                  </span>
                )}
              </div>
            </div> */}

            {/* <div className="flex flex-col items-start gap-4">
              <Label htmlFor="rg" required>
                RG
              </Label>
              <Input placeholder="Ex: 12.345.678-9" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="pisPasep" required>
                PIS/PASEP
              </Label>
              <Input placeholder="Ex: 000.00000.00-0" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="genero" required>
                Gênero
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue
                    className="text-slate-500"
                    placeholder="Selecione um gênero"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="dataAdmissao" required>
                Estado Civil
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    className="text-slate-500"
                    placeholder="Selecione um estado civil"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Solteiro (a)">Solteiro (a)</SelectItem>
                    <SelectItem value="Casado (a)">Casado (a)</SelectItem>
                    <SelectItem value="Divorciado (a)">
                      Divorciado (a)
                    </SelectItem>
                    <SelectItem value="Viúvo (a)">Viúvo (a)</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="celular" required>
                Celular
              </Label>
              <Input placeholder="Ex: (00) 91234-5678" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="dataNascimento" required>
                Data de Nascimento
              </Label>
              <Input placeholder="Ex: 01/01/1991" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="dataAdmissao" required>
                Data de Admissão
              </Label>
              <Input placeholder="Ex: 01/01/1991" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="dataDesligamento" required>
                Data de Desligamento
              </Label>
              <Input placeholder="Ex: 01/01/1991" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="cep" required>
                CEP
              </Label>
              <Input placeholder="Ex: 12345-678" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="estado" required>
                Estado
              </Label>
              <Input
                placeholder="Ex: Paraná"
                disabled
                className="cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="cidade" required>
                Cidade
              </Label>
              <Input
                placeholder="Ex: Curitiba"
                disabled
                className="cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="rua" required>
                Rua
              </Label>
              <Input placeholder="Ex: Rua da Liberdade" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="numero" required>
                Número
              </Label>
              <Input placeholder="Ex: 1000" />
            </div>

            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="bairro" required>
                Bairro
              </Label>
              <Input placeholder="Ex: Centro" />
            </div> */}
          </div>

          <DialogFooter className="flex w-full items-center justify-center">
            <Button type="submit" className="w-48">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateEmployee
