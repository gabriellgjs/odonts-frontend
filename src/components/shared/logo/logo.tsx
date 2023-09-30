import Image from 'next/image'
import LogoSVG from '@assets/logo.svg'
import { LogoProps } from './types/logoProps'

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Image
      src={LogoSVG}
      priority
      alt="Logo do aplicativo ODONTS"
      width={width}
      height={height}
    />
  )
}
