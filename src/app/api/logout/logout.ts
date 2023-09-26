'use server'
import { cookies } from 'next/headers'

export async function Logout() {
  const cookieStorage = cookies()

  cookieStorage.delete('next-auth.session-token')
}
