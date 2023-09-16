import { ReactNode } from 'react'

import './globals.css'
import { Roboto } from 'next/font/google'
import NextAuthProviderSession from '@/providers/sessionProviders'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
})

export const metadata = {
  title: 'Odonts',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="pt-BR">
    <body
      className={`${roboto.variable} bg-neutral-50 font-sans`}
      suppressHydrationWarning={true}
    >
      <NextAuthProviderSession>{children}</NextAuthProviderSession>
    </body>
  </html>
)

export default RootLayout
