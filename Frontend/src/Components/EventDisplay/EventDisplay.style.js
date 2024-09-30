import styled, { keyframes } from "styled-components";
import {
  MapPinIcon,
  BanknotesIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export const EventDate = styled.section`
  display: flex;
  width: 100%;
  height: 2.25rem;
  align-items: center;
  padding-bottom: 1em;
  gap: 1em;
`;

export const Price = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.25rem;
  gap: 1em;
`;

export const PriceIcon = styled(BanknotesIcon)`
  height: 100%;
`;

export const DateIcon = styled(CalendarIcon)`
  height: 100%;
`;

export const Location = styled.section`
  display: flex;
  width: 100%;
  height: 2.25rem;
  align-items: center;
  gap: 1em;
  padding-bottom: 1em;
`;

export const LocationIcon = styled(MapPinIcon)`
  height: 100%;
  /* height: 20%;/ */
`;
export const Time = styled.section`
  display: flex;
  width: 100%;
  height: 2.25rem;
  align-items: center;
  gap: 1em;
  /* padding-left: 7em; */
  padding-bottom: 1em;
`;

export const TimeIcon = styled(ClockIcon)`
  height: 100%;
  /* height: 20%;/ */
`;

export const EventPages = styled.div`
  border: 1px solid #d9d9d9;
  font-family: "Khula";
  display: flex;
  width: 91%;
  flex-direction: column;
  padding-bottom: 5em;
  font-size: 1em;
  z-index: 0;
  padding: 1em;
  > *:not(.EventImage) {
    /* padding-left: 1rem; */
    /* padding-right: 1rem; */
  }

  @media (min-width: 768px) {
    width: 450px;
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
  background: ${props => { 
    return props.full ? 'gray' : '#18336c'}};
  border: none;
  margin-top: 1em;
  padding: 1em;
  margin-bottom: 1em;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    filter: ${(props) => (props.full ? "brightness(80%)" : "brightness(200%)")};
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
  .top-right {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
`;

export const RatingStars = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 7%;
  margin-top: -1em;
  padding-bottom: 1em;

  /* padding-bottom: 1em; */
  @media (max-width: 400px) {
    column-gap: 8%;
  }
`;
export const Star = styled.span.attrs(({ hover, selected, ...props }) => props)`
  cursor: pointer;
  display: inline-block;
  font-size: 225%;
  @media (min-width: 400px) {
    font-size: 300%;
  }
  color: ${(props) =>
    props.hover ? "#997300" : props.selected ? "gold" : "gray"};

  &:hover {
    color: "#997300";
  }
`;
const loading = keyframes`
  0% { background-position: 125% 50%; }
  100% { background-position: -25 50%; }
`;

export const TitlePlaceHolder = styled.h1`
  background: linear-gradient(90deg, #ccc 25%, #ddd 50%, #ccc 75%);
  background-size: 200% 100%;
  animation: ${loading} 0.8s ease-in-out infinite;
  height: 40px;
  width: 100%;
  border-radius: 50px;
`;

export const EventImagePlaceholder = styled.img`
  background: linear-gradient(90deg, #ccc 25%, #ddd 50%, #ccc 75%);
  background-size: 200% 100%;
  animation: ${loading} 0.8s ease-in-out infinite;
  width: 100%;
  height: 300px;
  border-radius: 50px;
`;

export const PlaceHolderText = styled.p`
  background: linear-gradient(90deg, #ccc 25%, #ddd 50%, #ccc 75%);
  background-size: 200% 100%;
  animation: ${loading} 0.8s ease-in-out infinite;
  height: 20px;
  width: 50%;
  border-radius: 50px;
  margin: 10px 0;
`;

export const Email = styled.p`
  font-weight: lighter;
  margin-top: -2px;

  @media (max-width: 400px) {
    margin-top: -0.7em;
  }
`;

export const SubmitedRating = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
`;

export const SubmitedRatingTick = styled(CheckBadgeIcon)`
  width: 2.5em;
  color: green;
`;
