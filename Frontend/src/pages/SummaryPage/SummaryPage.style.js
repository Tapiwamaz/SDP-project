import styled from "styled-components";

export const SummaryPages = styled.div`
  display: flex;
  flex-direction: column;
  width: 387px;
  padding-bottom: 5em;
  border: 3px solid #d9d9d9;
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
  border-radius: 5px;
  background: #18336c;
    color: #fff;
`;
export const PayButton = styled.button`
  color: #fff;
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
  background: #18336c;
  border: none;
`;