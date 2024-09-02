import styled from "styled-components";

// Main Calendar Container Style
export const CalendarContainer = styled.div`
  height: 100vh;
  border: none;
  .rbc-header {
    background-color: transparent;
    text-align: left;
    border: none;
    padding-left: 1vh;
  }

  .rbc-toolbar-label {
    font-size: 2rem;
    font-weight: 700;
  }

  .rbc-active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }

  .rbc-month-view {
    border: none;

    .rbc-date-cell {
      border: none;
      text-align: left;
      padding-left: 1vh;
      padding-top: 0.5vh;
      border-radius: 10px;
      cursor: pointer;
      height: 100vh;
      transition: background-color 0.5s ease;

      &:hover {
        background-color: #159eb7; /* Light blue background on hover */
      }
    }
  }

  /* Remove border around the entire calendar */
`;

// Calendar Event Style (Remove borders for events)
export const EventStyle = styled.div`
  border: none; /* Remove event borders */
  box-shadow: none;
  // background-color: black; /* Default event background */

  border: none;
  border-radius: 4px;
  padding: 2px;
  font-size: 14px;
  text-align: center;
  //background-color: red;
  /* Remove event shadows */
`;

// Remove grid cell borders for month view
export const DateCellWrapper = styled.div`
  //this is the view of each cell when your on month view, this has the hover effect
  border: none;
  text-align: left;

  padding-left: 1vh;
  padding-top: 0.5vh;
  border-radius: 10px;
  cursor: pointer;
  height: 100vh;
  width: 100vw;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: rgba(82, 81, 81, 0.17);
    /* Light blue background on hover */
  }

  /* Remove borders around date cells */
`;

// Style to target each event cell specifically in week/day views
export const DaySlot = styled.div`
  border: none;
  border: none; /* Remove event borders */
  box-shadow: none;
  overflow: hidden;
  padding: 0.3vh;

  /* Default event background */

  border: none;
  border-radius: 4px;
  padding: 2px;
  font-size: 14px;
  text-align: center;

  //this is the actual event within the block of time in the day view
  /* &:hover {
    background-color: #159eb7; /* Light blue background on hover */
  /* } Remove borders from day slots */
`;

// Calendar Wrapper (if needed for specific layout control)
export const CalendarWrapper = styled.div`
  padding: 2vh;
  height: 100vh;
  border: none;
  font-family: "Khula";
  .rbc-header {
    background-color: transparent;
    text-align: right;
    border: none;
    padding-left: 1vh;
  }

  .rbc-toolbar-label {
    font-size: 2rem;
    font-weight: 700;
  }

  .rbc-month-row {
    border: none;
  }

  .rbc-month-view {
    border: none;
  } /* Remove outer calendar border */

  .rbc-event {
    height: 1.5vh;
    color: white;
    font-size: small;
    //background-color: var(--);
  }

  .rbc-row-segment {
    padding-top: 0.2vh;
  }
`;

export const EventTitle = styled.strong`
  display: block;
  font-weight: bold;
  color: #333; /* Customize title color */
`;

// Location Style
export const EventLocation = styled.div`
  font-size: 12px;
  color: #666; /* Optional: Location text color */
`;

// Description Style
export const EventDescription = styled.div`
  font-size: 11px;
  margin-top: 3px;
  color: #999; /* Optional: Description text color */
`;

export const TagsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  button {
    border: none;
    border-radius: 20px;
    height: 25px;
    margin: 2px;
  }
`;

export const Body = styled.div`
  width: 85%;
`;

export const Page = styled.div`
  display: flex;
  flex-direction: row;
`;
