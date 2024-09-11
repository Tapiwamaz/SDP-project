import React from 'react'
import { useState } from 'react';
import { HeaderContainer,Xicon,Profile,ProfileIcon,Burger,Aside,AsideNavItem,Logo } from './Header.styles';
import logo from '../../Images/Logo.svg.svg'

import { auth } from '../../firebase_config';
import { useNavigate } from 'react-router';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const storedUserData = localStorage.getItem("userData");//
    const userData = JSON.parse(storedUserData);
    const navigate=useNavigate();


  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <HeaderContainer>
        
        <Logo src={logo}/>
        {/* <Nav>
          <NavItem href="#home">Home</NavItem>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#services">Services</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </Nav> */}
        <Burger onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Burger>
        {(auth?.currentUser && storedUserData)?   
          <Profile>
            <img src={`${userData.imageURL}`} style={{height:"40px"}} alt='profileImg' onClick={()=>navigate('/profile')}/>
            <p>Hello {userData.name}</p>

           </Profile>
            :
            <Profile>
              <ProfileIcon></ProfileIcon>
              <p>Hello User</p>

            </Profile>
        
        }
        
        <Aside open={isOpen}>
            <Xicon onClick={toggleMenu}></Xicon>
          <AsideNavItem href="#home" onClick={toggleMenu}>Home</AsideNavItem>
          <AsideNavItem href="#about" onClick={toggleMenu}>About</AsideNavItem>
          <AsideNavItem href="#services" onClick={toggleMenu}>Services</AsideNavItem>
          <AsideNavItem href="#contact" onClick={toggleMenu}>Contact</AsideNavItem>
        </Aside>
      </HeaderContainer>
    );
  };

export default Header
