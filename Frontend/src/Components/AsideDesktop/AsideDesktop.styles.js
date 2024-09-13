import styled from "styled-components";
import { NavLink } from 'react-router-dom';


export const Aside = styled.div`
  /* position: fixed; */
  z-index: 100;
  top: 0;
  right: 0;
  /* height: 10; */
  width: 15%;
  background-color: var(--primaryGrey);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')}; */
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 769px) {
    display: none;
  }

`;


export const AsideNavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  cursor: pointer;
  /* background-color: red; */

  &:hover {
    text-decoration: underline;
  }
  /* &active {
    background-color: white; /* Background color for active link */
    /* color: black; Change text color for contrast */
   

`;

export const navContainer=styled.div`

  /* position: fixed;
  display: flex;
  flex-direction: row;
  gap: 1rem; */

`;