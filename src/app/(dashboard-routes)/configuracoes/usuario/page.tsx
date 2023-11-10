import { Metadata } from 'next'
import UserPage from '@components/settings/user/userPage'

export const metadata: Metadata = {
  title: 'Usuário - Odonts',
  description: 'Configure suas informações de perfil',
}
const User = () => {
  return <UserPage />
}

export default User
