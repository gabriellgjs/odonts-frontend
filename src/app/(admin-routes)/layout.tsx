import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

import { PrivateLayoutProps } from '@/types/privateLayoutProps'

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    // redirect('/login')
  }

  return <>{children}</>
}

export default PrivateLayout
