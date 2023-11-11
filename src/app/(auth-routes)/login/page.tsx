import { SignIn } from '@components/authRoutes/signIn'
import { Metadata } from 'next'
import { Toaster } from '@components/ui/toaster'

export const metadata: Metadata = {
  title: 'Login - Odonts',
  description: 'Configure suas informações de perfil',
}
const SigInLogin = () => {
  return (
    <>
      <Toaster />
      <SignIn />
    </>
  )
}

export default SigInLogin
