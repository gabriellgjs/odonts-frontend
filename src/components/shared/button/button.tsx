import DefaultButton from './defaultButton'
import OutlineButton from './outlineButton'
import { ButtonProps } from './types/ButtonProps'

const Button = (props: ButtonProps) => {
  const { variant } = props

  const baseStyle =
    'justify-center flex items-center rounded-lg font-bold capitalize gap-3  p-2 sm:p-3 text-lg'

  switch (variant) {
    case 'outline':
      return <OutlineButton baseStyle={baseStyle} {...props} />
    default:
      return <DefaultButton baseStyle={baseStyle} {...props} />
  }
}

export default Button
