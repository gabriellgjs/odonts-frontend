'use client'

import { ReactNode } from 'react'

import { Header } from '@components/shared/header/header'
import SideBarProvider from '@/providers/sideBarProvider'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SideBarProvider>
      <Header />
      {children}
    </SideBarProvider>
  )
}

export default Layout
