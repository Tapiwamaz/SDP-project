import React from 'react'
import { AsideNavItem,Aside } from './AsideDesktop.styles'

const AsideDesktop = () => {
  return (
  <>
      <Aside >
            <AsideNavItem href="#home" >Home</AsideNavItem>
            <AsideNavItem href="#about" >About</AsideNavItem>
            <AsideNavItem href="#services" >Services</AsideNavItem>
            <AsideNavItem href="#contact" >Contact</AsideNavItem>

      </Aside>
  </>
  )
}

export default AsideDesktop
