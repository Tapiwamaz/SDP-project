import styled from 'styled-components';

// Header Container
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: center;
  height: 10vh;
  padding: 15px 20px; /* Adequate padding */
  width: 100%; /* Ensure full width */
  box-sizing: border-box; /* Include padding in width calculation */

  /* Container adjustments for different screen sizes */
  @media (max-width: 768px) {
    padding: 15px 10px; /* Adjust padding for smaller screens */
  }
`;

// Image button styles (back & search buttons)
export const ImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Circular shadow effect */
  padding: 15px; /* Increased padding for better touch area */
  margin-right: 30px; /* Space between buttons */
  margin-left: 30px; /* Space between buttons */
  margin-top: 30px; /* Space between buttons */
  
  img {
    width: 40px; /* Default size */
    height: 40px; /* Default size */
    border-radius: 50%; /* Ensure the image inside is circular */
  }

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
  }

  @media (max-width: 768px) {
    img {
      width: 25px;
      height: 25px;
    }
    padding: 12px; /* Adjust padding for smaller screens */
  }

  @media (max-width: 480px) {
    img {
      width: 15px; /* Smaller size for very small screens */
      height: 15px; /* Smaller size for very small screens */
    }
    padding: 10px; /* Adjust padding for very small screens */
  }
`;

// Title styling
export const Title = styled.h1`
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Adjust font size for very small screens */
  }
`;

// Search Input styling
export const SearchInput = styled.input`
  width: 20%; /* Default width of search input */
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 15px;
  outline: none;
  transition: width 0.3s ease;
  box-sizing: border-box; /* Include padding in width calculation */

  &:focus {
    width: 250px; /* Expands when focused */
  }

  @media (max-width: 768px) {
    
    font-size: 14px;
  }

  @media (max-width: 480px) {
    
    font-size: 12px;
    padding: 4px 8px; /* Adjust padding */
  }
`;


