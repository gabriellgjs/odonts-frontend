'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import Logo from '../logo/logo'
import Button from '../shared/button/button'
import Input from '../shared/input/input'
import InputPassword from '../shared/input/inputPassword'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return
    }

    router.replace('/admin')
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96">
        <Logo />

        <form className="mt-8 flex flex-col gap-8 " onSubmit={handleSubmit}>
          <Input placeholder="E-mail" type="email" setState={setEmail} />
          <InputPassword setState={setPassword} />
          <Button type="submit" title="Acessar" />
        </form>
      </div>
    </div>
  )
}
