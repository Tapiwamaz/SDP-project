import styled from 'styled-components';

// Navbar container
export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: center;
  padding: 10px 20px; /* Adequate padding on left and right */
  width: 90%;  /* Full viewport width */
  max-width: 1200px; /* Optional: Set a max width to prevent stretching on large screens */
  margin: 0 auto; /* Center the navbar within its container */

  @media (max-width: 768px) {
    padding: 10px 15px; /* Adjust padding for smaller screens */
  }
`;

// Individual Navbar item with no background and hover/active effects
export const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'black' : 'gray')};  /* Darker color if active, otherwise normal gray */
  font-weight: bold;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid' : 'none')};  /* Underline if active */
  transition: color 0.3s, border-bottom 0.3s;  /* Smooth transition for color and underline */

  &:hover {
    color: black;  /* Darker color on hover */
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
    font-size: 14px;
    padding: 6px 12px;
  }

  /* Extra small screens (very small mobile devices) */
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 5px 8px;
  }
`;