import styled from "styled-components";

export const CreateNotificationWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;
export const SelectEventsInput = styled.select`
  border-radius: 0.25rem;
  padding: 0.1rem 0.3rem;
  font-family: inherit;
  font-size: 1rem;
`;
export const MessageInput = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  border: 2px solid black;
  max-lines: 2;
  :focus,
  :active {
    border-color: white;
    border: none;
    outline: none;
  }
`;
export const ChrLeftLabel = styled.label`
  font-size: 1rem;
  font-family: inherit;
`;
