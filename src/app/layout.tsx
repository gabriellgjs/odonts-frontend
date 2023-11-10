import { ReactNode } from 'react'

import './globals.css'
import { Roboto } from 'next/font/google'
import NextAuthProviderSession from '@providers/session/sessionProviders'
import { ThemeProvider } from '@providers/theme/themeProviders'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  preload: false,
})

export const revalidate = 0

export const metadata = {
  title: 'Odonts',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="pt-BR" suppressHydrationWarning>
    <body
      className={`${roboto.variable} bg-neutral-50 font-sans dark:bg-stone-900`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextAuthProviderSession>{children}</NextAuthProviderSession>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
