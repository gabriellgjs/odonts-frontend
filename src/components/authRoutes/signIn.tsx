'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef, useState } from 'react'

import { Input } from '@components/ui/input'
import { Logo } from '@components/shared/logo/logo'
import { Button } from '@components/ui/button'

export const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      redirect: false,
    })

    if (result?.error) {
      return
    }

    router.push('/')
  }

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState)

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
          <Input
            variant="email"
            ref={emailInputRef}
            placeholder="E-mail"
            type="email"
          />

          <Input
            variant="password"
            ref={passwordInputRef}
            placeholder="Senha"
            type="password"
            togglePasswordVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
          />

          <Button type="submit">entrar</Button>
        </form>
      </div>
    </div>
  )
}
