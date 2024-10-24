
import React, { useEffect, useState } from 'react';
import { AsideNavItem, Aside } from './AsideDesktop.styles';
import { useNavigate, useLocation } from 'react-router';
import { auth } from '../../firebase_config';
import { signOut } from 'firebase/auth';
import { HomeIcon,ArrowLeftStartOnRectangleIcon,TicketIcon,PlusCircleIcon,UserGroupIcon,CheckBadgeIcon,ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

const AsideDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  const [log, setLog] = useState(false);

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

  // Handler to track the active nav item
  const handleNavClick = (route) => {
    navigate(route);
  };
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Aside>
      {log ? (
        <>
          <AsideNavItem
            isActive={location.pathname === '/'}
            onClick={() => handleNavClick('/')}
          >
            <HomeIcon style={{height:"20px",width:"20px"}}/>
            <p>Home</p>
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/myEvents'}
            onClick={() => handleNavClick('/myEvents')}
          >
            <UserGroupIcon style={{height:"20px",width:"20px"}}/>
            <p>My Events</p> 
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/myBooking'}
            onClick={() => handleNavClick('/myBooking')}
          >
            <TicketIcon style={{height:"20px",width:"20px"}}/>
            <p>My Bookings</p> 
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/createEvent'}
            onClick={() => handleNavClick('/createEvent')}
          >
            <PlusCircleIcon style={{height:"20px",width:"20px"}}/>
            <p>Create Event</p> 
          </AsideNavItem>
          {auth?.currentUser?.uid === process.env.REACT_APP_ADMIN_ID && (
            <AsideNavItem
              isActive={location.pathname === '/adminDashboard'}
              onClick={() => handleNavClick('/adminDashboard')}
            >
              <CheckBadgeIcon style={{height:"20px",width:"20px"}}/>
              <p>Approvals</p>
            </AsideNavItem>
          )}

          <AsideNavItem onClick={logout}>
            <ArrowLeftStartOnRectangleIcon style={{height:"20px",width:"20px"}}/>
            
            <p>Logout</p> 
            </AsideNavItem>
        </>
      ) : (
        <AsideNavItem
          isActive={location.pathname === '/welcome'}
          onClick={() => handleNavClick('/welcome')}
        >
          <ArrowRightEndOnRectangleIcon style={{height:"20px",width:"20px"}}/>
          <p>Login</p>
        </AsideNavItem>
      )}
    </Aside>
  );
};

export default AsideDesktop;
