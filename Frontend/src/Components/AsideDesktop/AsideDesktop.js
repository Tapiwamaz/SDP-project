import React from 'react'
import { AsideNavItem,Aside } from './AsideDesktop.styles'
import { useNavigate } from 'react-router'

const AsideDesktop = () => {
  const navigate=useNavigate();
  return (
  <>
      <Aside >
            <AsideNavItem href="#home" >My Events </AsideNavItem>
            <AsideNavItem href="#about" >My Bookings</AsideNavItem>
            <AsideNavItem onClick={()=>navigate('/calendar')} >Calander</AsideNavItem>
            <AsideNavItem href="#contact" >Notifications</AsideNavItem>
            <AsideNavItem onClick={()=>navigate('/')} >Home</AsideNavItem>


      </Aside>
  </>
  )
}

export default AsideDesktop
