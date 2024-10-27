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
        cursor: pointer;
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
      flex-direction: column;
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
  .toolbar-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  .navigation-group,
  .view-change-group {
    display: flex;
  }
  .rbc-btn-group button {
    background-color: var(--primary);
    color: white;
    border-color: transparent;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    min-width: 30px; /* Ensure buttons don't get too small */
    height: 30px;

    &:hover {
      background-color: #eaeef5;
      color: var(--primaryDark);
      transform: scale(1.1);
    }
    @media (max-width: 480px) {
      width: 100%;
      padding: 8px;
      font-size: 12px;
    }

    .rbc-active {
      background-color: var(--primaryGrey);
    }
  }

  .rbc-month-row {
    border: none;
    &:hover {
      //background-color: #36454f;
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

  .custom-toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
  }
`;

export const Body = styled.div`
  width: 100%;
`;
