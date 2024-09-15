import styled from "styled-components";

export const Aside = styled.div`
  /* position: fixed; */
  z-index: 100;
  top: 0;
  right: 0;
  height: 100;
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

  &:hover {
    text-decoration: underline;
  }
`;

export const navContainer=styled.div`

  /* position: fixed;
  display: flex;
  flex-direction: row;
  gap: 1rem; */

`;