import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';

export const Container = styled.div`
  width: 100%;
  min-width: 100%; /* Ensure it doesn't exceed the screen width */
  margin: 0 auto; 
  padding: 0 10px; 
  /* z-index: -1; */
`;

export const Card = styled.button`
  background-color: white;
  border-radius: 10px 0px 10px 0px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 225px;
  height: 290px;
  display: flex;
  font-family: "Khula", sans-serif;
  border: 1px var(--primary) solid;

  
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;

  color: black;
  &:hover {
    color: white;
    background-color: cornflowerblue;
    transform: scale(1.05);
  }


  img{
    height: 100px;
    width: 180px;
    border-radius:inherit;
  }
  p{
    /* margin: 3px; */
    font-size: small;
    margin: 0;
    margin-left: 5px;
  }
  h3{
    margin: 5px;
  white-space: nowrap; /* Prevents the text from wrapping to the next line */
  overflow: hidden;    /* Hides the overflow text */
  text-overflow: ellipsis; /* Adds "..." at the end of the truncated text */
  max-width: 100%;     /* Optional: Set a max width as needed */
  font-size: larger;

  }
  .main{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-top: 10px;
    svg{
      height: 20px;
      width: 20px;
    }
    
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
  opacity: 0.2;
  

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
    background: var(--primary);
    @media (max-width: 769px) {
    display: none;
      }
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