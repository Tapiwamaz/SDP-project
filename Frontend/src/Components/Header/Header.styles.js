import styled from 'styled-components';


// Header Container
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 15px 50px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Image button styles (back & search buttons)
export const ImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Circular shadow effect */
  padding: 10px; /* Add padding for better click area */

  

  img {
    width: 40px; /* Default size */
    height: 40px; /* Default size *
    border-radius: 50%; /* Ensure the image inside is circular */
  }

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
  }

  @media (max-width: 768px) {
    img {
      width: 25px;
      height: 25px;
      padding: 10px;
    }
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
  }


  @media (max-width: 480px) {
    img {
        width: 15px; /* Smaller size for very small screens */
        height: 15px; /* Smaller size for very small screens */
        padding: 5px;
    }
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
`;