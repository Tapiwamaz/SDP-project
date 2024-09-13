import React from 'react'
import { AsideNavItem,Aside,navContainer } from './AsideDesktop.styles'
import { useNavigate } from 'react-router'
import { auth } from '../../firebase_config'
import { signOut } from 'firebase/auth'

const AsideDesktop = () => {
  const navigate=useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userData');

      navigate('/welcome')
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <>
      <Aside >
        {/* <navContainer> */}

            <AsideNavItem onClick={()=>navigate('/')} >Home</AsideNavItem>
            <AsideNavItem href="#myEvents" >My Events </AsideNavItem>
            <AsideNavItem href="#bookings" >My Bookings</AsideNavItem>
            {/* <AsideNavItem onClick={()=>navigate('/calendar')} >Calander</AsideNavItem> */}
            <AsideNavItem onClick={()=>navigate('/createEvent')} >Create Event</AsideNavItem>
            <AsideNavItem onClick={logout} >Logout</AsideNavItem>

            

            {/* <AsideNavItem href="#contact" >Notifications</AsideNavItem> */}
            {/* </navContainer> */}


      </Aside>
  </>
  )
}

export default AsideDesktop
