import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';

export const Container = styled.div`
  width: 100%;
  max-width: 100%; /* Ensure it doesn't exceed the screen width */
  margin: 0 auto; 
  padding: 0 10px; 
  /* z-index: -1; */
`;

export const Card = styled.button`
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
  transition: all 0.5s ease;

  color: white;
  &:hover {
    color: black;
    background-color: #72A0C1;
    transform: scale(1.05);
  }


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
    align-items: flex-start;
    margin-bottom: 20px;
    
  }

`;

export const LoadingCard = styled.div`
  background: linear-gradient(90deg, grey 25%, lightgrey 50%, grey 75%);
  background-size: 200% 100%;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 250px;
  height: 300px;
  animation: loading 1.5s infinite;
  

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;