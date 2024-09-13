
import React, { useState, useEffect } from 'react';
import { HeaderContainer, Xicon, Profile, ProfileIcon, Burger, Aside, AsideNavItem, Logo } from './Header.styles';
import logo from '../../Images/Logo.svg.svg';
import { auth } from '../../firebase_config';
import { useNavigate } from 'react-router';
import ProfilePage from '../Profile/ProfilePage';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(null);
  const [profileCllicked, setProfileClicked] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const updateSlidePercentage = () => {
      const screenWidth = window.innerWidth; // Adjust slide percentage based on screen size
      if (screenWidth <= 768) {
        setScreen('phone');
      } else {
        setScreen('desktop');
      }
    };

    window.addEventListener('resize', updateSlidePercentage);
    updateSlidePercentage(); // Initial check

    return () => {
      window.removeEventListener('resize', updateSlidePercentage);
    };
  }, []);

  useEffect(() => {
    // Listener to check auth state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const storedUserData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData); // Set user data when auth is true
      } else {
        setUserData(null); // Clear user data when auth is false
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const openProfile = () => {
    if (screen === 'desktop') {
      setProfileClicked(!profileCllicked);
    } else {
      navigate('/profile');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} />

        <Burger onClick={toggleMenu} data-testid="burger">
          <span></span>
          <span></span>
          <span></span>
        </Burger>
        
        {(auth?.currentUser && userData) ? (
          <Profile>
            <img
              src={`${userData.imageURL}`}
              style={{ height: '40px' }}
              alt="profileImg"
              onClick={openProfile}
              data-testid="profileImg"
            />
            <p>Hello {userData.name}</p>
          </Profile>
        ) : (
          <Profile>
            <ProfileIcon></ProfileIcon>
            <p>Hello User</p>
          </Profile>
        )}

        <Aside open={isOpen}>
          <Xicon onClick={toggleMenu} data-testid="close-icon"></Xicon>
          <AsideNavItem href="#home" onClick={toggleMenu}>
            Home
          </AsideNavItem>
          <AsideNavItem href="#about" onClick={toggleMenu}>
            About
          </AsideNavItem>
          <AsideNavItem href="#services" onClick={toggleMenu}>
            Services
          </AsideNavItem>
          <AsideNavItem href="#contact" onClick={toggleMenu}>
            Contact
          </AsideNavItem>
        </Aside>
      </HeaderContainer>
      {profileCllicked ? <ProfilePage /> : null}
    </>
  );
};

export default Header;
