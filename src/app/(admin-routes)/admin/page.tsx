import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/components/shared/butttonLogout'
import { getServerSession } from 'next-auth'

const Admin = async () => {
  const session = await getServerSession(nextAuthOptions)
  return (
    <div>
      <h1>Admin, {session?.user.email}</h1>
      <ButtonLogout />
    </div>
  )
}

export default Admin
