'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ButtonLogout = () => {
  const router = useRouter()

  const logout = async () => {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }
  return <button onClick={logout}>Logout</button>
}

export default ButtonLogout
