import styled from "styled-components";

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

  .rbc-month-row {
    .rbc-row-bg {
      .rbc-day-bg {
        border: none;
      }
    }
  }
  .rbc-toolbar {
    display: flex;
    flex-direction: row;
  }

  .rbc-toolbar-label {
    font-size: 2rem;
    font-weight: 700;
  }

  .rbc-btn-group {
    background-color: var(--primary);
    color: white;
    border-radius: 10px;

    button {
      color: white;
      border-color: transparent;

      .rbc-active {
        background-color: var(--primaryGrey);
      }
    }
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
  .rbc-row-button-link {
    width: 100%;
    height: 100%;
  }
`;

export const Body = styled.div`
  width: 100%;
`;
