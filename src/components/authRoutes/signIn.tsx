'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef, useState } from 'react'

import Input from '@components/shared/input/input'
import Logo from '@components/shared/logo/logo'
import { Button } from '@components/ui/button'
import InputPassword from './inputPassword'

const SignIn = () => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email: emailInputRef.current?.value,
      password,
      redirect: false,
    })

    if (result?.error) {
      return
    }

    router.push('/')
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96">
        <div className="flex flex-col items-center justify-center">
          <Logo />

          <p className="mt-8 text-5xl font-bold uppercase text-orange-500">
            odonts
          </p>
        </div>

        <form
          className="mx-8 mt-8 flex flex-col gap-8 sm:mx-0"
          onSubmit={handleSubmit}
        >
          <Input ref={emailInputRef} placeholder="E-mail" type="email" />
          <InputPassword setState={setPassword} />

          <div className="flex justify-end">
            <p className="mt-4 cursor-pointer font-medium text-orange-500 hover:text-orange-600">
              Esqueceu a senha?
            </p>
          </div>

          <Button variant={'outline'} type="submit">entrar</Button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
