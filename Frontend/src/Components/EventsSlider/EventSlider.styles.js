import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';

export const Container = styled.div`
  width: 100%;
  max-width: 100%; /* Ensure it doesn't exceed the screen width */
  margin: 0 auto; 
  padding: 0 10px; 
  /* z-index: -1; */
`;

export const Card = styled.div`
  background-color: var(--primary);
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 250px;
  height: 300px;
  display: flex;
  
  display: flex;
  flex-direction: column;
  color: white;
  img{
    height: 100px;
    width: 180px;
    border-radius:inherit;
  }
  p{
    margin: 0;
    font-size: small;
  }
  h3{
    margin: 2;
  white-space: nowrap; /* Prevents the text from wrapping to the next line */
  overflow: hidden;    /* Hides the overflow text */
  text-overflow: ellipsis; /* Adds "..." at the end of the truncated text */
  max-width: 100%;     /* Optional: Set a max width as needed */

  }
  div{
    display: flex;
    flex-direction: column;
    
  }

`;

export const CustomCarousel = styled(Carousel)`
  .carousel .control-dots {
    display: none; /* Hide the dots for cleaner look */
  }

  .carousel .control-arrow {
    background: rgba(0, 0, 0, 0.5); /* Customize arrow background */
    border-radius: 50%;
  }

  .carousel .slide {
    padding: 10px;
  }

  .carousel .slide .card {
    margin: 0;
  }
`;