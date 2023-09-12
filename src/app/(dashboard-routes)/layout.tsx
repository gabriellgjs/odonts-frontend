import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

import SideBar from '@/components/ui/sideBar'
import { PrivateLayoutProps } from '@/types/privateLayoutProps'

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    // redirect('/login')
  }

  return (
    <>
      <SideBar />
      {children}
    </>
  )
}

export default PrivateLayout
