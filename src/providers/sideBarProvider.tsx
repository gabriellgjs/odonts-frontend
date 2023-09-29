'use client'

import SideBar from '@components/shared/sideBar/sideBar'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface setSideBarActivatedState {
  sideBarActivated: boolean
  setSideBarActivated: Dispatch<SetStateAction<boolean>>
  toggleOpenSideBar: () => void
}

export const SideBarContext = createContext({} as setSideBarActivatedState)

const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [sideBarActivated, setSideBarActivated] = useState<boolean>(false)

  const toggleOpenSideBar = () => {
    setSideBarActivated((prevState) => !prevState)
  }
  return (
    <SideBarContext.Provider
      value={{ sideBarActivated, setSideBarActivated, toggleOpenSideBar }}
    >
      <SideBar>{children}</SideBar>
    </SideBarContext.Provider>
  )
}

export default SideBarProvider
