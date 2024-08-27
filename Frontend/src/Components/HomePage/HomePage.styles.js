import styled from "styled-components";
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

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

export const Body=styled.body`
    display: flex;
    flex-direction: column;
    align-items: center;
    

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
    height: 25px;
    margin: 2px;
  }

  .education{
    background-color: yellow;
  }
  .Political{
    background-color: red;
  }
  .Gaming{
    background-color: blue;
  }
  .Sports{
    background-color: pink;
  }
  .IT{
    background-color: rebeccapurple;
  }
  .Other{
    background-color: grey;
  }
  .Entertainment{
    background-color:green;
  }
  .Religious{
    background-color: brown;
  }



`;