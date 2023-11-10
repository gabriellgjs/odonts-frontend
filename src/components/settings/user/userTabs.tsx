import { cn } from '@lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import UserEmailForm from '@components/settings/user/userEmailForm'
import UserPasswordForm from '@components/settings/user/userPasswordForm'
import { SettingsProps } from '@components/settings/types/settingsTypes'

const UserTabs = ({ employee }: SettingsProps) => {
  const styleTabsTrigger =
    'rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:data-[state=active]:bg-stone-900 data-[state=active]:bg-gray-200 w-full px-8 text-base w-full flex'
  return (
    <Tabs
      defaultValue="account"
      className="flex h-1/2 w-full flex-col items-center justify-center"
    >
      <TabsList className=" mb-2 w-full bg-neutral-100 px-2 py-1 dark:bg-stone-800 lg:w-3/6">
        <TabsTrigger
          className={cn(styleTabsTrigger, 'flex w-full')}
          value="account"
        >
          Email
        </TabsTrigger>
        <TabsTrigger className={styleTabsTrigger} value="password">
          Senha
        </TabsTrigger>
      </TabsList>
      <UserEmailForm employee={employee} />
      <UserPasswordForm id={employee.user.id} />
    </Tabs>
  )
}

export default UserTabs
