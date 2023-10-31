'use client'
import { ReactNode } from 'react'

import { Header } from '@components/shared/header/header'

const NavigationLayout = ({ children }: { children: ReactNode }) => {
  return <Header>{children}</Header>
}

export default NavigationLayout
