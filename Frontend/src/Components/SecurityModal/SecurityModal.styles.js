import styled, { keyframes } from "styled-components";

// Styled component for emergency information
export const EmergencyInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f2f2f2;
  border-radius: 10px;
  text-align: left;
  h4 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }
  p {
    margin: 5px 0;
    font-size: 16px;
  }
`;

// Animation for spinner
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Loader component
export const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Message component for displaying success/error messages
export const Message = styled.div`
  color: ${(props) => (props.status === "success" ? "green" : "red")};
  text-align: center;
  margin-top: 20px;
`;

// Container for the entire modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

// Main modal box (responsive)
export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 85%;
  overflow-y: auto;
`;

// Header of the modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 150ms ease-in-out;

  &:hover {
    color: red;
  }
`;

// Flex container for dropdowns (responsive layout)
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin-bottom: 1rem;
`;

// Dropdown Select with responsive width
export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  outline: none;

  &:focus {
    border-color: #0077cc;
  }
`;

// Label for dropdown and form elements
export const Label = styled.label`
  font-size: 14px;
  color: #333;
  display: block;
`;

// Description input (textarea)
export const DescriptionInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  padding: 1rem;
  font-family: inherit;
  font-size: 1rem;
  background-color: #f9f9f9;
  margin-top: 10px;

  &:focus {
    border-color: #0077cc;
  }
`;

// Footer container for buttons
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

// Cancel button styling
export const CancelButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border-radius: 2.5rem;
  font-family: inherit;
  font-size: inherit;
  height: 48px;
  width: 48%;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  border: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// Confirm button styling
export const ConfirmButton = styled.button`
  background-color: var(--primary);
  color: var(--background);
  border-radius: 2.5rem;
  font-family: inherit;
  font-size: inherit;
  height: 48px;
  width: 48%;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  border: none;

  &:hover {
    background-color: white;
    border: black solid 3px;
    color: black;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
