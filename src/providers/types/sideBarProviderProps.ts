import { Dispatch, SetStateAction } from 'react'

export interface setSideBarActivatedState {
  sideBarActivated: boolean
  setSideBarActivated: Dispatch<SetStateAction<boolean>>
  toggleOpenSideBar: () => void
}
