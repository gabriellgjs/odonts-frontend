'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import * as colors from 'tailwindcss/colors'

const InputPassword = ({ setState }: InputPasswordProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState)

  return (
    <div>
      <div className="relative">
        <input
          className="w-full rounded-lg border-2 border-solid border-gray-100 p-4 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:placeholder:text-gray-800"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Senha"
          onChange={(e) => setState(e.target.value)}
        />

        <button
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-4 "
          type="button"
        >
          {isPasswordVisible ? (
            <Eye className="h-5 w-5" color={colors.gray[700]} />
          ) : (
            <EyeOff className="h-5 w-5" color={colors.gray[500]} />
          )}
        </button>
      </div>
      <div className="flex justify-end">
        <p className="mt-4 cursor-pointer font-medium text-orange-500 hover:text-orange-600">
          Esqueceu a senha?
        </p>
      </div>
    </div>
  )
}

export default InputPassword
