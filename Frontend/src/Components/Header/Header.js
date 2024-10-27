import React, { useState, useEffect, useRef } from "react";
import logo from "../../Images/NewLogo.svg.svg";
import {
  HeaderContainer,
  Xicon,
  Profile,
  ProfileIcon,
  Burger,
  Aside,
  AsideNavItem,
  Logo,
} from "./Header.styles";
import { auth } from "../../firebase_config";
import { useNavigate } from "react-router";
import ProfilePage from "../Profile/ProfilePage";
import { signOut } from "firebase/auth";
import {
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
  TicketIcon,
  PlusCircleIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(null);
  const [profileCllicked, setProfileClicked] = useState(false);
  const [log, setLog] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  const asideRef = useRef(); // Create a ref for the Aside component
  const profileRef = useRef();

  useEffect(() => {
    const updateSlidePercentage = () => {
      const screenWidth = window.innerWidth; // Adjust slide percentage based on screen size
      if (screenWidth <= 768) {
        setScreen("phone");
      } else {
        setScreen("desktop");
      }
    };

    window.addEventListener("resize", updateSlidePercentage);
    updateSlidePercentage(); // Initial check

    return () => {
      window.removeEventListener("resize", updateSlidePercentage);
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
    if (screen === "desktop") {
      setProfileClicked(!profileCllicked);
    } else {
      navigate("/profile");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (route) => {
    navigate(route);
    setIsOpen(false); // Close the aside menu on navigation
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

  // Close the aside if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        profileRef.current &&
        !profileCllicked.current.contains(event.target)
      ) {
        setProfileClicked(false);
      }
    };

    if (isOpen || profileCllicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [isOpen, profileCllicked]);

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
    <>
      <HeaderContainer>
        <Logo src={logo} onClick={() => handleNavClick("/")} />

        {auth?.currentUser && userData ? (
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

        <Burger onClick={toggleMenu} data-testid="burger">
          <span></span>
          <span></span>
          <span></span>
        </Burger>

        <Aside ref={asideRef} open={isOpen}>
          {/* <Xicon onClick={toggleMenu} data-testid="close-icon"></Xicon> */}
          {log ? (
            <>
              <AsideNavItem onClick={() => handleNavClick("/")}>
                <HomeIcon style={{ height: "20px", width: "20px" }} />
                <p>Home</p>
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/myEvents")}>
                <UserGroupIcon style={{ height: "20px", width: "20px" }} />
                <p>My Events</p>
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/myBooking")}>
                <TicketIcon style={{ height: "20px", width: "20px" }} />
                <p>My Bookings</p>
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/createEvent")}>
                <PlusCircleIcon style={{ height: "20px", width: "20px" }} />
                <p>Create Event</p>
              </AsideNavItem>
              {auth?.currentUser?.uid === process.env.REACT_APP_ADMIN_ID && (
                <AsideNavItem onClick={() => handleNavClick("/adminDashboard")}>
                  <CheckBadgeIcon style={{ height: "20px", width: "20px" }} />
                  <p>Approvals</p>
                </AsideNavItem>
              )}
              <AsideNavItem onClick={logout}>
                <ArrowLeftStartOnRectangleIcon
                  style={{ height: "20px", width: "20px" }}
                />

                <p>Logout</p>
              </AsideNavItem>
            </>
          ) : (
            <AsideNavItem onClick={() => handleNavClick("/welcome")}>
              <ArrowRightEndOnRectangleIcon
                style={{ height: "20px", width: "20px" }}
              />
              <p>Login</p>
            </AsideNavItem>
          )}
        </Aside>
      </HeaderContainer>
      {profileCllicked ? <ProfilePage ref={profileRef} /> : null}
    </>
  );
};

export default Header;
