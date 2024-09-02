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
  /* Remove event shadows */
`;

// Remove grid cell borders for month view
export const DateCellWrapper = styled.div`
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

  /* Remove borders around date cells */
`;

// Style to target each event cell specifically in week/day views
export const DaySlot = styled.div`
  border: none;
  border: none; /* Remove event borders */
  box-shadow: none;
  /* Default event background */

  border: none;
  border-radius: 4px;
  padding: 2px;
  font-size: 14px;
  text-align: center;
  &:hover {
    background-color: #159eb7; /* Light blue background on hover */
  } /* Remove borders from day slots */
`;

// Calendar Wrapper (if needed for specific layout control)
export const CalendarWrapper = styled.div`
  height: 100vh;
  border: none; /* Remove outer calendar border */
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
