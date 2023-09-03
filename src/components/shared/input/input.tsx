import { InputProps } from './types/login'

const Input = ({ placeholder, className, type }: InputProps) => {
  return (
    <input
      className="flex-1 rounded-lg border-2 border-solid border-gray-100 p-4 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:placeholder:text-gray-800"
      type={type}
      placeholder={placeholder}
    />
  )
}

export default Input
