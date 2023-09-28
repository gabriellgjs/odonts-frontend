import { ChevronRight } from 'lucide-react'
import { Avatar } from '../avatar/avatar'
import { PeopleProps } from './types/peopleProps'

export const People = ({ name }: PeopleProps) => {
  return (
    <div className="mx-10 flex items-center py-12">
      <div className="h-12 w-12 rounded-full">
        <Avatar width={48} height={48} />
      </div>

      <div className="flex cursor-pointer items-center">
        <div className="pl-6 pr-3">
          <span className="text-lg font-normal text-gray-800">{name}</span>
        </div>
        <div className="">
          <ChevronRight width={20} height={20} />
        </div>
      </div>
    </div>
  )
}
