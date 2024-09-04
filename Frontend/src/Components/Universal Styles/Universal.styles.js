import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
`;

const StyledImage = styled.img`
  width: 75vw;  /* 75% of the viewport width */
  height: auto; /* height scales automatically */
  margin-top: 0; /* no margin at the top */
`;

const App = () => {
  return (
    <ImageContainer>
      <StyledImage src="your-image-url-here.jpg" alt="Example" />
    </ImageContainer>
  );
};

export default App;