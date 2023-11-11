'use client'

import { TabsContent } from '@components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import * as z from 'zod'
import { useCallback, useState } from 'react'
import api from '@lib/axios'
import { toast } from '@components/ui/use-toast'

const userFormPasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Senha atual é obrigatória' })
      .trim()
      .min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string({ required_error: 'Nova senha é obrigatória' })
      .trim()
      .min(4, 'Senha tem que ser maior que 4 caracteres'),
    confirmNewPassword: z
      .string({ required_error: 'Nova senha é obrigatória' })
      .trim()
      .min(4, 'Senha tem que ser maior que 4 caracteres'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não conferem',
    path: ['confirmNewPassword'], // path of error
  })
type UserFormPasswordValues = z.infer<typeof userFormPasswordSchema>

type UserFormProps = {
  id: string | number
}

const UserPasswordForm = ({ id }: UserFormProps) => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false)

  const form = useForm<UserFormPasswordValues>({
    resolver: zodResolver(userFormPasswordSchema),
  })
  const { isSubmitting } = form.formState

  const onSubmit = (dataForm: UserFormPasswordValues) => {
    const bodyRequest = {
      currentPassword: dataForm.currentPassword,
      newPassword: dataForm.confirmNewPassword,
    }
    const request = async () => {
      await api
        .put(`/employees/password/${id}`, bodyRequest)
        .then(() => {
          toast({
            title: 'Sucesso',
            description: 'Senha atualizada com sucesso',
          })
        })
        .catch((error) => {
          console.log(error.message)
          toast({
            title: 'Atenção',
            variant: 'destructive',
            description: error.response.data.message,
          })
        })
        .finally(() => {
          form.setValue('currentPassword', '')
          form.setValue('newPassword', '')
          form.setValue('confirmNewPassword', '')
        })
    }

    request()
    form.reset()
  }

  const handleToggleCurrentPasswordVisibility = useCallback(
    () => setIsCurrentPasswordVisible((prevState) => !prevState),
    [],
  )

  const handleToggleNewPasswordVisibility = useCallback(
    () => setIsNewPasswordVisible((prevState) => !prevState),
    [],
  )

  const handleToggleConfirmNewPasswordVisibility = useCallback(
    () => setIsConfirmNewPasswordVisible((prevState) => !prevState),
    [],
  )

  return (
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Senha</CardTitle>
          <CardDescription>Altere sua senha</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'flex w-full flex-col items-center gap-y-8'}
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className={'w-full px-4  sm:px-12 lg:px-16'}>
                    <FormLabel>Senha Atual</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          className={'w-full'}
                          {...field}
                          variant="password"
                          togglePasswordVisibility={
                            handleToggleCurrentPasswordVisibility
                          }
                          isPasswordVisible={isCurrentPasswordVisible}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className={'w-full px-4 sm:px-12 lg:px-16'}>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          className={'w-full'}
                          {...field}
                          variant="password"
                          togglePasswordVisibility={
                            handleToggleNewPasswordVisibility
                          }
                          isPasswordVisible={isNewPasswordVisible}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem className={'w-full px-4 sm:px-12 lg:px-16'}>
                    <FormLabel>Repetir nova senha</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          className={'w-full'}
                          {...field}
                          variant="password"
                          togglePasswordVisibility={
                            handleToggleConfirmNewPasswordVisibility
                          }
                          isPasswordVisible={isConfirmNewPasswordVisible}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className={'my-4 flex w-full justify-center'}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={'w-full px-12 lg:w-fit'}
                >
                  Salvar
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default UserPasswordForm
