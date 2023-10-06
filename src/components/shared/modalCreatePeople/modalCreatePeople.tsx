import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Plus } from 'lucide-react'

const ModalCreatePerson = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<Plus />} variant="outline" size="sm">
          Criar Funcionário
        </Button>
      </DialogTrigger>

      <DialogContent className=" sm:min-w-fit">
        <div className="">
          <DialogHeader>
            <DialogTitle>Criar novo funcionário</DialogTitle>
            <DialogDescription>Crie um novo funcionário</DialogDescription>
          </DialogHeader>
          <div className="sm:grid-col-2 sm:grid sm:gap-4 sm:py-4">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex w-full items-center justify-center">
            <Button type="submit" className="w-48">
              Salvar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreatePerson
