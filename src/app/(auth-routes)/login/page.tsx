import { SignIn } from '@components/authRoutes/signIn'
import { signOut } from './singOut'

const SigInLogin = () => {
  signOut()
  return <SignIn />
}

export default SigInLogin
