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
    @media (min-width: 769px) {
    max-width: 85%;
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
@media (max-width: 769px) {
    flex-direction: column;
  }



`

