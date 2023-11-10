import { cookies } from 'next/headers'

export async function signOut() {
  cookies().delete('access-token')
}

// TODO NUUKIES
