import React from 'react'
import { AsideNavItem,Aside } from './AsideDesktop.styles'

const AsideDesktop = () => {
  return (
  <>
      <Aside >
            <AsideNavItem href="#home" >My Events </AsideNavItem>
            <AsideNavItem href="#about" >My Bookings</AsideNavItem>
            <AsideNavItem href="#services" >Calander</AsideNavItem>
            <AsideNavItem href="#contact" >Notifications</AsideNavItem>

      </Aside>
  </>
  )
}

export default AsideDesktop