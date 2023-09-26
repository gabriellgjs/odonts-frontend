'use client'

import { ReactNode } from 'react'

import { Header } from '@components/shared/header/header'
import SideBarProvider from '@/providers/sideBarProvider'

const Layout = ({ children }: { children: ReactNode }) => {
  const [sideBarActive, setSideBarActive] = useState(false)

  const toggleOpenSideBar = () => setSideBarActive((prevState) => !prevState)
  return (
    <SideBarProvider>
      <Header />
      {children}
    </SideBarProvider>
  )
}

export default Layout
