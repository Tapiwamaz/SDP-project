// import React from "react";
// import { useState, useEffect } from "react";

// import logo from "../../Images/Logo.svg.svg";
// import {
//   HeaderContainer,
//   Xicon,
//   Profile,
//   ProfileIcon,
//   Burger,
//   Aside,
//   AsideNavItem,
//   Logo,
// } from "./Header.styles";
// import { auth, signOut } from "../../firebase_config";
// import { useNavigate } from "react-router";
// import ProfilePage from "../Profile/ProfilePage";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [screen, setScreen] = useState(null);
//   const [profileCllicked, setProfileClicked] = useState(false);
//   const [log, setLog] = useState(false);

//   const [userData, setUserData] = useState(null); // State to store user data
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateSlidePercentage = () => {
//       const screenWidth = window.innerWidth; // Adjust slide percentage based on screen size
//       if (screenWidth <= 768) {
//         setScreen("phone");
//       } else {
//         setScreen("desktop");
//       }
//     };

//     window.addEventListener("resize", updateSlidePercentage);
//     updateSlidePercentage(); // Initial check

//     return () => {
//       window.removeEventListener("resize", updateSlidePercentage);
//     };
//   }, []);

//   useEffect(() => {
//     // Listener to check auth state change
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         const storedUserData = localStorage.getItem("userData");
//         const parsedUserData = JSON.parse(storedUserData);
//         setUserData(parsedUserData); // Set user data when auth is true
//       } else {
//         setUserData(null); // Clear user data when auth is false
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on component unmount
//   }, []);

//   const openProfile = () => {
//     if (screen === "desktop") {
//       setProfileClicked(!profileCllicked);
//     } else {
//       navigate("/profile");
//     }
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

 
//   const handleNavClick = (route) => {
//     navigate(route);
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     // Listener to check auth state change
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setLog(true); // Set user data when auth is true
//       } else {
//         setLog(false); // Clear user data when auth is false
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on component unmount
//   }, []);

//   return (
//     <>
//       <HeaderContainer>
//         <Logo src={logo} />

      
        
//         {(auth?.currentUser && userData) ? (
//           <Profile>
//             <img
//               src={`${userData.imageURL}`}
//               style={{ height: "40px" }}
//               alt="profileImg"
//               onClick={openProfile}
//               data-testid="profileImg"
//             />
//             <p>Hello {userData.name}</p>
//           </Profile>
//         ) : (
//           <Profile>
//             <ProfileIcon></ProfileIcon>
//             <p>Hello User</p>
//           </Profile>
//         )}

//         {/* </Profile>
//         ) : (
//           <Profile>
//             <ProfileIcon></ProfileIcon>
//             <p>Hello User</p>
//           </Profile>
//         )} */}
//           <Burger onClick={toggleMenu} data-testid="burger">
//           <span></span>
//           <span></span>
//           <span></span>
//         </Burger>

//         <Aside open={isOpen}>
//           <Xicon onClick={toggleMenu} data-testid="close-icon"></Xicon>
//           {/* <AsideNavItem href="#home" onClick={toggleMenu}>
//             Home
//           </AsideNavItem>
//           <AsideNavItem href="#about" onClick={toggleMenu}>
//             About
//           </AsideNavItem>
//           <AsideNavItem href="#services" onClick={toggleMenu}>
//             Services
//           </AsideNavItem>
//           <AsideNavItem href="#contact" onClick={toggleMenu}>
//             Contact
//           </AsideNavItem> */}
//           {log ? (
//             <>
//               <AsideNavItem onClick={() => handleNavClick("/")}>
//                 Home
//               </AsideNavItem>
//               <AsideNavItem onClick={() => handleNavClick("/myEvents")}>
//                 My Events
//               </AsideNavItem>
//               <AsideNavItem onClick={() => handleNavClick("/myBooking")}>
//                 My Bookings
//               </AsideNavItem>
//               <AsideNavItem onClick={() => handleNavClick("/createEvent")}>
//                 Create Event
//               </AsideNavItem>
//               {auth?.currentUser?.uid === process.env.REACT_APP_ADMIN_ID && (
//                 <AsideNavItem onClick={() => handleNavClick("/adminDashboard")}>
//                   Approvals
//                 </AsideNavItem>
//               )}
//               {/* <AsideNavItem onClick={logout}>Logout</AsideNavItem> */}
//             </>
//           ) : (
//             <AsideNavItem onClick={() => handleNavClick("/welcome")}>
//               Login
//             </AsideNavItem>
//           )}
//         </Aside>
//       </HeaderContainer>
//       {profileCllicked? <ProfilePage/>:null}
    
//     </>
//   );
// };

// export default Header;
import React, { useState, useEffect, useRef } from "react";
import logo from "../../Images/Logo.svg.svg";
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
import { auth, signOut } from "../../firebase_config";
import { useNavigate } from "react-router";
import ProfilePage from "../Profile/ProfilePage";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(null);
  const [profileCllicked, setProfileClicked] = useState(false);
  const [log, setLog] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  const asideRef = useRef(); // Create a ref for the Aside component

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
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [isOpen]);

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} />

        {(auth?.currentUser && userData) ? (
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
          <Xicon onClick={toggleMenu} data-testid="close-icon"></Xicon>
          {log ? (
            <>
              <AsideNavItem onClick={() => handleNavClick("/")}>
                Home
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/myEvents")}>
                My Events
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/myBooking")}>
                My Bookings
              </AsideNavItem>
              <AsideNavItem onClick={() => handleNavClick("/createEvent")}>
                Create Event
              </AsideNavItem>
              {auth?.currentUser?.uid === process.env.REACT_APP_ADMIN_ID && (
                <AsideNavItem onClick={() => handleNavClick("/adminDashboard")}>
                  Approvals
                </AsideNavItem>
              )}
            </>
          ) : (
            <AsideNavItem onClick={() => handleNavClick("/welcome")}>
              Login
            </AsideNavItem>
          )}
        </Aside>
      </HeaderContainer>
      {profileCllicked ? <ProfilePage /> : null}
    </>
  );
};

export default Header;
