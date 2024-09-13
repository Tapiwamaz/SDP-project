import React, { useEffect, useState } from 'react';
import { AsideNavItem, Aside } from './AsideDesktop.styles';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase_config';
import { signOut } from 'firebase/auth';

const AsideDesktop = () => {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(''); // Track active nav item

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userData');
      navigate('/welcome');
    } catch (err) {
      console.error(err);
    }
  };

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
            isActive={activeNavItem === '#myEvents'}
            onClick={() => handleNavClick('#myEvents')}
          >
            My Events
          </AsideNavItem>
          <AsideNavItem
            isActive={activeNavItem === '#bookings'}
            onClick={() => handleNavClick('#bookings')}
          >
            My Bookings
          </AsideNavItem>
          <AsideNavItem
            isActive={activeNavItem === '/createEvent'}
            onClick={() => handleNavClick('/createEvent')}
          >
            Create Event
          </AsideNavItem>
          <AsideNavItem onClick={logout}>Logout</AsideNavItem>
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
