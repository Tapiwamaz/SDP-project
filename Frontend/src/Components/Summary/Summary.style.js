import styled from "styled-components";
import {
  MapPinIcon,
  CalendarIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
export const SummaryPages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding-bottom: 5em; */
  /* border: 3px solid #d9d9d9; */
  /* margin-top: -20px; */
  position: relative;
  background-color: #fff;
  z-index: 0;
`;

export const CostSummary = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  border: 2px solid #d9d9d9;
  border-radius: 1.35rem;
  background: #18336c;
  color: #fff;
  margin-bottom: 1em;
`;

export const LocationIcon = styled(MapPinIcon)`
  height: 45%;
  /* height: 20%;/ */
`;

export const DateIcon = styled(CalendarIcon)`
  height: 45%;
`;
export const TicketI = styled(TicketIcon)`
  height: 45%;
`;

export const CardSummary = styled.section`
  display: grid;
  border: 2px solid #d9d9d9;
  border-radius: 1.35rem;
  margin: 1em 0.7em 1em 0.7em;
  grid-template-columns: 1fr 1fr;
  padding: 1em;
  gap: 1em;
  font-size: 1em;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "image text"
    "image text"
    "image text"
    "image text";

  > div {
    grid-area: image;
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      width: 100%; /* Adjust as needed */
      height: auto; /* Adjust as needed */
      border-radius: 1.35rem; /* Adjust as needed */
      padding: 0;
    }
  }

  > div.textContainer {
    grid-area: text;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* gap: 0.5em; Adjust as needed */
  }

  > div.textContainer > p,
  h3 {
    margin: 0; /* Remove default margins */
    padding: 0; /* Remove default padding */
    line-height: 1; /* Adjust as needed */
  }
`;

export const EventDate = styled.section`
  display: flex;
  width: 100%;
  height: 2.25rem;
  align-items: center;
  /* padding-bottom: 1em; */
  gap: .5em;
`;

export const BookButton = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  height: 3.25em;
  gap: 0.625em;
  border-radius: 1.35rem;
  background: "#18336c";
  border: none;
  margin-top: 1em;
  padding: 1em;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  &:hover {
    filter: brightness(80%);
  }
`;
