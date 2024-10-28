import styled from "styled-components";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid"; // or '@heroicons/react/outline' for an outlined version

export const HeaderContainer = styled.header`
  /* position: static; */
  /* width: 100%; */
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 1rem 0px;
  border-bottom: black 2px solid;
  color: black;
  overflow-y: hidden;
  font-family: "Khula", sans-serif;

  @media (max-width: 768px) {
    font-size: smaller;
    flex-direction: row;
  }
`;

export const Logo = styled.img`
  font-size: 1.5rem;
  margin: 0;
  height: 80px;
  @media (max-width: 768px) {
    //margin-right: 40px;
  }
  &:hover {
    cursor: pointer;
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
  background-color: var(--primary);

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const AsideNavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  /* height: 50px; */
  margin: 10px;
  gap: 5px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
  p {
    padding-top: 2px;
    margin: 0;
  }
`;

export const Profile = styled.div`
  /* @media (min-width: 769px) {
    display: none;
  } */
  /* border-radius: 100px; */
  width: fit-content;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;

  /* object-fit: cover; */

  img {
    border-radius: 50%;
    /* width: fit-content; */
    width: 40px;
    border: 2px solid var(--primary);
    &:hover {
      transform: scale(1.2);
      border: 2px solid var(--primary);
      /* border-radius: 50%; */
    }
  }
  p {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const ProfileIcon = styled(UserIcon)`
  border: black 2px solid;
  border-radius: 100%;
  width: 40px;
  height: 30px;
  color: black;
  cursor: pointer;
`;

export const Xicon = styled(XMarkIcon)`
  color: white;
  width: 40px;
  height: 30px;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 121px; /* Just below the header */
  right: 0;
  width: 100%; /* Full width dropdown */
  background-color: white;
  height: fit-content;
  z-index: 999; /* Ensure it stays above the content */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  transition: max-height 0.4s ease-in-out;
  max-height: ${({ isOpen }) => (isOpen ? "250px" : "0")}; /* Smooth dropdown */
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (min-width: 768px) {
    /* width: ; Limit width for larger screens */
  }
`;
