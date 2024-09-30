import styled from "styled-components";

// Calendar Wrapper (if needed for specific layout control)
export const CalendarWrapper = styled.div`
  padding: 0.5vh;
  height: 100%;
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
    flex-wrap: nowrap;

    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
    }
  }

  .rbc-toolbar select {
    margin-left: 10px;
    height: 35px;
    border-radius: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }

  .rbc-toolbar-label {
    font-size: 2rem;
    font-weight: 700;
  }

  .rbc-btn-group {
    background-color: var(--primary);
    color: white;
    border-radius: 10px;
    //make it flex coloumn for mobile
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
    &:hover {
      background-color: "#36454F";
    }
  }

  .rbc-month-view {
    border: none;
  }

  .rbc-event {
    height: 1.5vh;
    color: white;
    font-size: small;
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
