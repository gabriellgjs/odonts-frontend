import Image from 'next/image'
import AvatarSVG from '@/assets/avatar.svg'
import { AvatarProps } from './types/avatarProps'

export const Avatar = ({ height, width }: AvatarProps) => {
  return (
    <Image
      src={AvatarSVG}
      alt="Avatar padrão"
      width={width}
      height={height}
      priority={true}
    />
  )
}
