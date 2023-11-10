import { SignIn } from '@components/authRoutes/signIn'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Odonts',
  description: 'Configure suas informações de perfil',
}
const SigInLogin = () => {
  return <SignIn />
}

export default SigInLogin
