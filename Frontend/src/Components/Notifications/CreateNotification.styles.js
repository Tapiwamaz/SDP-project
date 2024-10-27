import styled from "styled-components";

export const CreateNotificationWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  transition: all 300ms ease-in-out;
  font-family: "Khula";
`;
export const SelectEventsInput = styled.select`
  border-radius: 0.25rem;
  padding: 0.1rem 0.3rem;
  font-family: inherit;
  height: 5vh;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  border-width: 2px;

  &:hover {
    border-color: var(--primary);
  }
`;
export const MessageInput = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  height: 15vh;
  border: 2px solid black;
  max-lines: 2;
  border-color: gray;
  &:focus,
  &:active {
    border-color: var(--primary);
    outline: none;
  }
`;
export const ChrLeftLabel = styled.label`
  font-size: 1rem;
  font-family: inherit;
  text-align: right;
`;

export const SendButton = styled.button`
  font-size: inherit;
  font-family: inherit;
  background-color: var(--primary);
  border: none;
  color: white;
  padding: 0.6rem;
  border-radius: 1.35rem;
  width: 40%;
  align-self: center;
  cursor: pointer;
  transition: all 100ms ease-in-out;

  &:hover {
    background-color: #647eb4;
  }
`;
