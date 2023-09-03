import { ButtonProps } from './types/button'

const Button = ({ title, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      className="rounded-lg bg-orange-500 py-3 font-bold text-white hover:bg-orange-600"
      type={type}
    >
      {title}
    </button>
  )
}

export default Button
