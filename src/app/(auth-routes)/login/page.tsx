import { SignIn } from '@components/authRoutes/signIn'
import { signOut } from './singOut'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Odonts',
  description: 'Configure suas informações de perfil',
}
const SigInLogin = () => {
  signOut()
  return <SignIn />
}

export default SigInLogin
