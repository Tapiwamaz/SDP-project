import React from 'react'
import { AsideNavItem,Aside,navContainer } from './AsideDesktop.styles'
import { useNavigate } from 'react-router'
import { auth } from '../../firebase_config'
import { signOut } from 'firebase/auth'
import { useEffect,useState } from 'react'

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

  const [log,setLog]=useState(false);
  useEffect(() => {
    // Listener to check auth state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
     
        setLog(true); // Set user data when auth is true
      } else {
        setLog(false); // Clear user data when auth is false
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
  <>
      <Aside >
        {/* <navContainer> */}
        {log?
        <>
         <AsideNavItem onClick={()=>navigate('/')} >Home</AsideNavItem>
         <AsideNavItem href="#myEvents" >My Events </AsideNavItem>
         <AsideNavItem href="#bookings" >My Bookings</AsideNavItem>
         {/* <AsideNavItem onClick={()=>navigate('/calendar')} >Calander</AsideNavItem> */}
         <AsideNavItem onClick={()=>navigate('/createEvent')} >Create Event</AsideNavItem>
         <AsideNavItem onClick={logout} >Logout</AsideNavItem>
         </>
        :
        <AsideNavItem onClick={()=>navigate('/welcome')} >Login</AsideNavItem>


        }

           

            

            {/* <AsideNavItem href="#contact" >Notifications</AsideNavItem> */}
            {/* </navContainer> */}


      </Aside>
  </>
  )
}

export default AsideDesktop
