import { Metadata } from 'next'
import ProfilePage from '@components/settings/profile/profilePage'

export const metadata: Metadata = {
  title: 'Perfil - Odonts',
  description: 'Configure suas informações de perfil',
}
const Profile = () => {
  return <ProfilePage />
}

export default Profile
