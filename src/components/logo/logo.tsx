import LogoSvg from '../../assets/Logo.svg'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={LogoSvg} alt="Logo" />

      <p className="mt-8 text-5xl font-bold text-orange-500">ODONTS</p>
    </div>
  )
}

export default Logo
