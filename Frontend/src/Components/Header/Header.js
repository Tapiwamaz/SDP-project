import React from 'react'
import { useState } from 'react';
import { HeaderContainer,Xicon,Profile,ProfileIcon,NavItem,Nav,Burger,Aside,AsideNavItem,Logo } from './Header.styles';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <HeaderContainer>
        <Logo>MySite</Logo>
        <Nav>
          <NavItem href="#home">Home</NavItem>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#services">Services</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </Nav>
        <Burger onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Burger>
        <Profile>
            <ProfileIcon></ProfileIcon>
            <p>Hello</p>

        </Profile>
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
