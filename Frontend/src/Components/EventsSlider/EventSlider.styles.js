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
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  /* max-width: 300px; */
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: relative;
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