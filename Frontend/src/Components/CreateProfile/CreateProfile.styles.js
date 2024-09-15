import styled from 'styled-components';
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, ClickableText, StyledLink, ErrorMessage , StyledText } from "../Universal Styles/Universal.styles.js";


export  const Field=styled.div`
/* background-color: red; */
width: 80%;
/* margin-bottom: 20px; */
input{
    width: 100%;
}
.bottom{
    /* margin-bottom:40px; */
}

`

export const backgroundCard=styled.div`
     width: 100%; /* Full width */
   height: 100%; /*Full viewport height */
  background-color: white; /* White background color */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:10px;

  @media (min-width: 768px) {
    width: 30%;           /* 30% of the viewport width */
    height: auto;          /* 80% of the viewport height */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add some shadow for the card */
    border-radius: 15px;  /* Add rounded corners */
  }

`
