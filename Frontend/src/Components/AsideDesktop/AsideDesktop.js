import React, { useEffect, useState } from 'react';
import { AsideNavItem, Aside } from './AsideDesktop.styles';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase_config';
import { signOut } from 'firebase/auth';

const AsideDesktop = () => {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(''); // Track active nav item

  

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
    setActiveNavItem(route);
    navigate(route);
  };

  return (
    <Aside>
      {log ? (
        <>
          <AsideNavItem
            isActive={activeNavItem === '/'}
            onClick={() => handleNavClick('/')}
          >
            Home
          </AsideNavItem>
          <AsideNavItem
            isActive={activeNavItem === '/myEvents'}
            onClick={() => handleNavClick('/myEvents')}
          >
            My Events
          </AsideNavItem>
          <AsideNavItem
            isActive={activeNavItem === '/myBooking'}
            onClick={() => handleNavClick('/myBooking')}
          >
            My Bookings
          </AsideNavItem>
          <AsideNavItem
            isActive={activeNavItem === '/createEvent'}
            onClick={() => handleNavClick('/createEvent')}
          >
            Create Event
          </AsideNavItem>
          {auth?.currentUser?.uid===process.env.REACT_APP_ADMIN_ID &&
                    <AsideNavItem onClick={() => handleNavClick('/adminDashboard')}>Approvals</AsideNavItem>


          
        }

          {/* <AsideNavItem onClick={logout}>Logout</AsideNavItem> */}
        </>
      ) : (
        <AsideNavItem onClick={() => handleNavClick('/welcome')}>
          Login
        </AsideNavItem>
      )}
    </Aside>
  );
};

export default AsideDesktop;
