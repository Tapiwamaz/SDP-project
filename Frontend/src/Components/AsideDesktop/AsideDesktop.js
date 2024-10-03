
import React, { useEffect, useState } from 'react';
import { AsideNavItem, Aside } from './AsideDesktop.styles';
import { useNavigate, useLocation } from 'react-router';
import { auth } from '../../firebase_config';

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

  return (
    <Aside>
      {log ? (
        <>
          <AsideNavItem
            isActive={location.pathname === '/'}
            onClick={() => handleNavClick('/')}
          >
            Home
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/myEvents'}
            onClick={() => handleNavClick('/myEvents')}
          >
            My Events
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/myBooking'}
            onClick={() => handleNavClick('/myBooking')}
          >
            My Bookings
          </AsideNavItem>
          <AsideNavItem
            isActive={location.pathname === '/createEvent'}
            onClick={() => handleNavClick('/createEvent')}
          >
            Create Event
          </AsideNavItem>
          {auth?.currentUser?.uid === process.env.REACT_APP_ADMIN_ID && (
            <AsideNavItem
              isActive={location.pathname === '/adminDashboard'}
              onClick={() => handleNavClick('/adminDashboard')}
            >
              Approvals
            </AsideNavItem>
          )}

          {/* <AsideNavItem onClick={logout}>Logout</AsideNavItem> */}
        </>
      ) : (
        <AsideNavItem
          isActive={location.pathname === '/welcome'}
          onClick={() => handleNavClick('/welcome')}
        >
          Login
        </AsideNavItem>
      )}
    </Aside>
  );
};

export default AsideDesktop;
