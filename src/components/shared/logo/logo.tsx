import Image from 'next/image'
import Logosvg from '@/assets/Logo.svg'
import { LogoProps } from './types/logoProps'

const Logo = ({ height, width }: LogoProps) => {
  return (
    <Image
      src={Logosvg}
      alt="Logo do aplicativo ODONTS"
      width={width}
      height={height}
    />
  )
}

export default Logo
