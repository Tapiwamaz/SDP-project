import styled from "styled-components";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const Top = styled.div`
  font-family: "Khula";
  width: 100%;
  /* height: 300px; */
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 5px;
  border-bottom: 2px solid lightgray;
  margin-bottom: 5px;

  @media (max-width: 769px) {
    justify-content: space-evenly;
  }

  /* 
  .backButtonCreateEvent {
    cursor: pointer;
    transition: all 200ms ease-in-out; */
  /* border-radius: 50%; */
  /* box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px; */
  /* } */
  /* .backButtonCreateEvent:hover {
    transform: scale(1.1);
  } */
`;

export const Card = styled.div`
  width: 100%;
  background-color: rgba(54, 69, 79, 0.1);
  padding: 11px;
  //border-radius: 20px;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  font-family: "khula";
  /* border-radius: 0px 10px 0px 40px; */

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  p {
    margin: 2;
  }
  .headerNoti {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .leftNoti {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h5 {
      margin: 0;
    }
    p {
      margin: 0;
      font-size: small;
    }
  }
`;

export const StyledPlus = styled(PlusCircleIcon)`
  width: 40px;
  cursor: pointer;
`;

export const LoadingCard = styled.div`
  background: linear-gradient(90deg, grey 25%, lightgrey 50%, grey 75%);
  background-size: 200% 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100px;
  animation: loading 1.5s infinite;
  padding: 11px;
  border-bottom: 2px solid black;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
