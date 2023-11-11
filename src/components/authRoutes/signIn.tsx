'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Logo } from '@components/shared/logo/logo'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@components/ui/use-toast'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .trim()
    .min(1, 'Email é obrigatório')
    .email(),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .trim()
    .min(4, 'Senha tem que ser maior que 4 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (dataForm: LoginFormValues) => {
    try {
      const result = await signIn('credentials', {
        email: dataForm.email,
        password: dataForm.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Atenção',
          variant: 'destructive',
          description: result.error,
        })
        return
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleTogglePasswordVisibility = useCallback(
    () => setIsPasswordVisible((prevState) => !prevState),
    [],
  )

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96">
        <div className="flex flex-col items-center justify-center">
          <Logo />

          <p className="mt-8 text-5xl font-bold uppercase text-orange-500 dark:text-blue-500">
            odonts
          </p>
        </div>
        <Form {...form}>
          <form
            className="mx-8 mt-8 flex flex-col gap-8 sm:mx-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={''}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex w-full">
                      <Input
                        {...field}
                        variant="email"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={'w-full'}>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        variant="password"
                        placeholder="Senha"
                        togglePasswordVisibility={
                          handleTogglePasswordVisibility
                        }
                        isPasswordVisible={isPasswordVisible}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
