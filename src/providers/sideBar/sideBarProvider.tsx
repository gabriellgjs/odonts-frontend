import SideBar from '@components/shared/sideBar/sideBar'
import { ReactNode, createContext, useCallback, useMemo, useState } from 'react'
import { setSideBarActivatedState } from './types/sideBarProviderProps'

export const SideBarContext = createContext({} as setSideBarActivatedState)

const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [sideBarActivated, setSideBarActivated] = useState<boolean>(false)

  const toggleOpenSideBar = useCallback(() => {
    setSideBarActivated((prevState) => !prevState)
  }, [])

  const value = useMemo(() => {
    return {
      sideBarActivated,
      setSideBarActivated,
      toggleOpenSideBar,
    }
  }, [sideBarActivated, toggleOpenSideBar])

  return (
    <SideBarContext.Provider value={value}>
      <SideBar>{children}</SideBar>
    </SideBarContext.Provider>
  )
}

export default SideBarProvider
