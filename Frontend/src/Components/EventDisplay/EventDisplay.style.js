import styled from "styled-components";
import {
  MapPinIcon,
  BanknotesIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const EventDate = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1em;
`;

export const Price = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1em;
`;

export const PriceIcon = styled(BanknotesIcon)`
  width: 7%;
`;

export const DateIcon = styled(CalendarIcon)`
  width: 5%;
  /* height: 20%; */
`;

export const Location = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1em;
  /* padding-left: 7em; */
`;

export const LocationIcon = styled(MapPinIcon)`
  width: 7%;
  /* height: 20%;/ */
`;
export const Time = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1em;
  /* padding-left: 7em; */
`;

export const TimeIcon = styled(ClockIcon)`
  width: 7%;
  /* height: 20%;/ */
`;

export const EventPages = styled.div`
  border: 1px solid #d9d9d9;
  
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 5em;
  z-index: 0;
  padding: 1em;
  > *:not(.EventImage) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 768px) {
    width: 620px;
    font-size: 1.25em;
  }
`;
export const BookButton = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  height: 3.25em;
  gap: 0.625em;
  border-radius: 0.625em;
  background: #18336c;
  border: none;
  margin-right: 1em;
  margin-left: 1em;
  margin-top: 1em;
  padding: 1em 1.25em 1em 1em;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out; /* Add this for a smooth transition */

  &:hover {
    filter: brightness(200%);
    /* transform: scale(1.1); Increase this to make the text bigger on hover */
  }
`;

export const EventImage = styled.img`
  width: 100%;
  height: 50%;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat, #d9d9d9;
  border-radius: 50px;
`;

export const NumberofTickets = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding-bottom: 1em;
`;

export const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625em;
  padding: 0.625em 1.25em;
  border-radius: 0.625em;
  background: #18336c;
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: 600;
`;

export const EveOCard = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-rows: 70px 1fr; // Change this from 1fr 70px to 70px 1fr
  grid-gap: 1em;
  padding: 1em;
  border: 1px solid #d9d9d9;
  border-radius: 25px;
  background-color: #fff;
  margin-right:1em;
  margin-left: 1em;
  .top-right {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
`;

export const RatingStars = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10%;
  margin-top: -1em;
  /* padding-bottom: 1em; */
  @media (max-width: 400px) {
    column-gap: 10%;
  }
`;

export const Star = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 5rem;
  @media (max-width: 400px) {
    font-size: 3rem;
  }
  color: ${(props) =>
    props.hover ? "#997300" : props.selected ? "gold" : "gray"};

  &:hover {
    /* color: "#997300"; */
  }
`;
