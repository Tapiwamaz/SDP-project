import styled from 'styled-components';

// Navbar container
export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;  /* Evenly distribute the items */
  align-items: center;
  padding: 10px 0;
  width: 100%;  /* Full viewport width */
  
  @media (max-width: 768px) {
    justify-content: space-between; /* Make sure items are spaced evenly */
  }
`;

// Individual Navbar item with no background and hover/active effects
export const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'black' : 'gray')};  /* Darker color if active, otherwise normal blue */
  font-weight: bold;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid' : 'none')};  /* Underline if active */
  transition: color 0.3s, border-bottom 0.3s;  /* Smooth transition for color and underline */

  &:hover {
    color: black;  /* Darker blue on hover */
  }

  &:focus {
    outline: none;  /* Remove default focus outline */
  }

    /* Medium screens (tablets, smaller laptops) */
  @media (max-width: 1024px) {
    font-size: 16px;
    padding: 8px 15px;
  }

  /* Small screens (mobile) */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }

  /* Extra small screens (very small mobile devices) */
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px 8px;
  }
`;