import Image from 'next/image'
import Logosvg from '@/assets/logo.svg'
import { LogoProps } from './types/logoProps'

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Image
      src={Logosvg}
      alt="Logo do aplicativo ODONTS"
      width={width}
      height={height}
      priority={true}
    />
  )
}
