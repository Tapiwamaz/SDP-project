import styled from "styled-components";
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

export const SearchContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 20px;
    width: 60%;
    

    @media (max-width: 768px) {
        width: 80%;
    }

`;

export const StyledSearchIcon = styled(MagnifyingGlassCircleIcon)`
  width: 20px;
  height: 20px;
  color: black;
  margin-right: 8px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 16px;

`;

export const Body=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fade-in 300ms forwards;
    width: 85%;



    @media (max-width: 769px) {
      
    width: 100%;
  }
    

`
export const TagsStyle=styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  button{
    border: none;
    border-radius: 20px;
    height: fit;
    margin: 2px;
  }




`;

export const EventsStyle=styled.div`
  
  /* margin-right: 20px; */




`;
export const SearchBack = styled.div`
  height: 400px;
  width: 100%;
  background: linear-gradient(to bottom, white, var(--primary));
  border-radius: 20px;

`;



export const Page=styled.div`
display: flex;
flex-direction: row;
overflow: hidden;
font-family: "Khula";
@media (max-width: 769px) {
    flex-direction: column;
  }



`

export const EventRight=styled.div`
position: fixed; /* Keeps the element fixed to the right */
  right: 0; /* Aligns it to the right edge */
  top: 0; /* Aligns it to the top */
  /* width: 30%; You can adjust this width based on your preference */
  height: 100vh; /* Ensures it takes up the full height of the viewport */
  background-color: white; /* You can set the background color as needed */
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow for depth */
  z-index: 1000; /* Ensures it appears above other elements */
  padding: 1em; /* Adds some padding inside the element */
  width:350px;
  overflow-y: auto; /* Allows scrolling if the content overflows */
`

