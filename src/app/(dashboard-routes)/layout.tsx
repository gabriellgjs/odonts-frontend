import SideBar from '@/components/shared/sideBar/sideBar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <SideBar />
      </div>
      <div>{children}</div>
    </>
  )
}

export default Layout
