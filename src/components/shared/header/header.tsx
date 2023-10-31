import { Avatar, AvatarFallback } from '@components/ui/avatar'
import { ReactNode } from 'react'
import SideBar from '../sideBar/sideBar'
import { useSession } from 'next-auth/react'
import { GenerateInitialNameForAvatar } from '@/utils/functions/generateInitialName'
import AvatarProfile from './avatarProfile'

export const Header = ({ children }: { children: ReactNode }) => {
  const { data } = useSession()
  const name = GenerateInitialNameForAvatar(data?.user.name)
  return (
    <>
      <div className="border-1 flex w-full items-center justify-between px-6 py-2 shadow-sm">
        <SideBar />
        <AvatarProfile name={name} />
      </div>
      {children}
    </>
  )
}
