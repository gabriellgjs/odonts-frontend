import { Button } from '../ui/button'
import { ButtonsPagination } from './types/employeeTypes'

const ButtonsPagination = ({
  getCanNextPage,
  getCanPreviousPage,
  nextPage,
  previousPage,
}: ButtonsPagination) => {
  return (
    <div className="flex items-center justify-end space-x-2 px-6 sm:px-4">
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:bg-stone-200"
        onClick={previousPage}
        disabled={!getCanPreviousPage}
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:bg-stone-200"
        onClick={nextPage}
        disabled={!getCanNextPage}
      >
        Próxima
      </Button>
    </div>
  )
}

export default ButtonsPagination
