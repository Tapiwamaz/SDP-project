import styled from 'styled-components';
import { MapPinIcon,BanknotesIcon,CalendarIcon } from '@heroicons/react/24/outline';

export const EventDate = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1em;
    /* padding-left: 5em; */

`;

export const Price = styled.section`
    display: flex; 
    align-items: center;
    width: 100%;
    /* padding-left: 5em; */

    gap: 1em;
`;

export const PriceIcon = styled(BanknotesIcon)`
    width: 10%;
`;

export const DateIcon = styled(CalendarIcon)`
    width: 10%;
    /* height: 20%; */
`;

export const Location = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1em;
    /* padding-left: 5em; */
`

export const LocationIcon = styled(MapPinIcon)`
   width: 10%;
    /* height: 20%;/ */
`;

export const EventPages = styled.div`
  display: flex;
  width: 387px;
  flex-direction: column;
  /* align-items: center; */
  padding-bottom: 5em;
  border: 3px solid #d9d9d9;
  margin-top: -20px;
  position: relative;
  background-color: #FFF;
  z-index: 0;
  
`;

export const BookButton = styled.button`
    color: #FFF;
    text-align: center;
    font-size: 1em;
    font-weight: 600;
    display: flex;
    height: 3.25em;
    padding: 0.625em 1.25em;
    justify-content: center;
    align-items: center;
    gap: 0.625em;
    border-radius: 0.625em;
    background: #18336C;
    border: none;
`;

export const EventImage = styled.img`
  display: flex;
  width: 390px;
  height: 50%;
  justify-content: center;
  align-items: center;
  gap: 0.625em;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat, #d9d9d9;
  border-radius: 30px;
  position: relative;
  z-index: 1;
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
    background: #18336C;
    border: none;
    color: #FFF;
    font-size: 1em;
    font-weight: 600;
`;