import Logo from '../logo/logo'
import Button from '../shared/button/button'
import Input from '../shared/input/input'
import InputPassword from '../shared/input/inputPassword'

const Login = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96">
        <Logo />

        <form className="mt-8 flex flex-col gap-8 ">
          <Input placeholder="E-mail" type="email" />
          <InputPassword />
          <Button title="Acessar" />
        </form>
      </div>
    </div>
  )
}

export default Login
