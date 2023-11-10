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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { CreateEmployeeSchema } from '@components/funcionarios/schema/createEmployeeSchema'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@lib/axios'
import { toast } from '@components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { SettingsProps } from '@components/settings/types/settingsTypes'

const userFormSchema = CreateEmployeeSchema.pick({ email: true })

type UserFormValues = z.infer<typeof userFormSchema>

const UserEmailForm = ({ employee }: SettingsProps) => {
  const router = useRouter()
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: employee.user.email,
    },
  })

  const onSubmit = (dataForm: UserFormValues) => {
    const request = async () => {
      await api
        .put(`/employees/email/${employee.user.id}`, dataForm)
        .then(() => {
          toast({
            title: 'Sucesso',
            description: 'Email atualizado com sucesso',
          })
          router.refresh()
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
          router.refresh()
        })
    }

    request()
  }

  return (
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Altere seu email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'flex w-full flex-col items-center gap-y-8'}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={'w-full px-4 sm:px-12 lg:px-16'}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className={'w-full'}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className={'my-4 flex w-full justify-center'}>
                <Button type="submit" className={'w-full px-12 lg:w-fit'}>
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

export default UserEmailForm
