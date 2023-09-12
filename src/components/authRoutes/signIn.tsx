'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import Image from 'next/image'

import LogoOdontsSvg from '../../assets/logoOdonts.svg'
import Button from '@/components/shared/button/button'
import Input from '@/components/shared/input/input'
import InputPassword from './inputPassword'

const SignIn = () => {
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
      console.log(result)
      return
    }

    router.replace('/')
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96">
        <div className="flex flex-col items-center justify-center">
          <Image src={LogoOdontsSvg} alt="Logo" />

          <p className="mt-8 text-5xl font-bold text-orange-500">ODONTS</p>
        </div>

        <form className="mt-8 flex flex-col gap-8 " onSubmit={handleSubmit}>
          <Input placeholder="E-mail" type="email" setState={setEmail} />
          <InputPassword setState={setPassword} />
          <Button type="submit" title="Acessar" />
        </form>
      </div>
    </div>
  )
}

export default SignIn
