'use client'

import { ReactNode, useState } from 'react'

import SideBar from '@components/shared/sideBar/sideBar'
import { Header } from '@components/shared/header/header'

const Layout = ({ children }: { children: ReactNode }) => {
  const [sideBarActive, setSideBarActive] = useState(false)

  const toggleOpenSideBar = () => setSideBarActive((prevState) => !prevState)
  return (
    <>
      <div>
        <Header openSheet={toggleOpenSideBar} />
        <SideBar active={sideBarActive} toggleSideBar={toggleOpenSideBar} />
      </div>
      <div>{children}</div>
    </>
  )
}

export default Layout
