import React from "react";
import { useState, useEffect } from "react";
import {
  HeaderContainer,
  Xicon,
  Profile,
  ProfileIcon,
  Burger,
  Aside,
  AsideNavItem,
  Logo,
  ProfileDropdown,
} from "./Header.styles";
import logo from "../../Images/Logo.svg.svg";

import { auth } from "../../firebase_config";
import { useNavigate } from "react-router";

import ProfilePage from "../Profile/ProfilePage";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(null);
  const [profileCllicked, setProfileClicked] = useState(false);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const screenWidth = window.innerWidth; // need to adjust the slide percentage based on screen size
      if (screenWidth <= 768) {
        // setSlidePercentage(70); // Closer to full width on small screens
        setScreen("phone");
      } else {
        // setSlidePercentage(20); // Default for larger screens
        setScreen("desktop");
      }
    };

    window.addEventListener("resize", updateSlidePercentage);
    updateSlidePercentage(); // Initial check

    return () => {
      window.removeEventListener("resize", updateSlidePercentage);
    };
  }, []);

  const storedUserData = localStorage.getItem("userData"); //
  const userData = JSON.parse(storedUserData);
  const navigate = useNavigate();

  const openProfile = () => {
    if (screen === "desktop") {
      setProfileClicked(!profileCllicked);
    } else {
      navigate("/profile");
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
        {auth?.currentUser && storedUserData ? (
          <Profile>
            <img
              src={`${userData.imageURL}`}
              style={{ height: "40px" }}
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
      {/* {profileCllicked? <ProfilePage/>:null} */}
      {/* Profile Dropdown */}
      {screen === "desktop" && (
        <ProfileDropdown isOpen={profileCllicked}>
          <ProfilePage />
        </ProfileDropdown>
      )}
    </>
  );
};

export default Header;
