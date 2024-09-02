import styled from "styled-components"
import { UserIcon,XMarkIcon } from '@heroicons/react/24/solid'; // or '@heroicons/react/outline' for an outlined version


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: black 2px solid;
  color: black;
  
  @media (max-width: 768px) {
    font-size: smaller;
    flex-direction: row-reverse;
    
  }
`;

export const Logo = styled.img`
  font-size: 1.5rem;
  margin: 0;
  height: 80px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Burger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background-color: black;
    margin-bottom: 5px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Aside = styled.aside`
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  height: 100vh;
  width: 190px;
  background-color: var(--primaryGrey);

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const AsideNavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Profile=styled.div`
  /* @media (min-width: 769px) {
    display: none;
  } */
    /* border-radius: 100px; */
    width: fit-content;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:1.5rem;
    align-items: center;
    

`;

export const ProfileIcon = styled(UserIcon)`
border: black 2px solid;
 border-radius: 10px;
  width: 40px;
  height: 30px;
  color: black;
  cursor: pointer;


`;

export const Xicon=styled(XMarkIcon)`
color: white;
width: 40px;
  height: 30px;

`