import { GenerateInitialNameForAvatar } from '@utils/functions/generateInitialName'
import { useSession } from 'next-auth/react'
import { ReactNode, memo } from 'react'
import SideBar from '../sideBar/sideBar'
import AvatarProfile from './avatarProfile'

const Header = ({ children }: { children: ReactNode }) => {
  const { data } = useSession()
  const name = GenerateInitialNameForAvatar(data?.user.name)
  return (
    <>
      <div className="border-1 flex w-full items-center justify-between px-6 py-2 shadow-md dark:shadow-sm dark:shadow-neutral-700">
        <SideBar />
        <AvatarProfile name={name} />
      </div>
      {children}
    </>
  )
}

export default memo(Header)
