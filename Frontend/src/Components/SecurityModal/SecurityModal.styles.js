// SecurityModal.styles.js (or wherever you define your styles)
import styled, { keyframes } from 'styled-components';

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
  color: ${(props) => (props.status === 'success' ? 'green' : 'red')};
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

// Main modal box
export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 90%;
  height: 90%;
  max-width: 600px;
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

// Container for image upload area
export const DropFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ hasImage }) =>
    hasImage ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 255, 0.3)"}; // Blue background if no image
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 300ms ease-in-out;
  cursor: pointer;
  z-index: 1;

  // When image is uploaded, hide the container until hover
  opacity: ${({ hasImage }) => (hasImage ? 0 : 1)};
`;
// Wrapper that controls hover behavior for visibility
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden; // Ensures no content spills outside the wrapper

  &:hover ${DropFileContainer} {
    opacity: 1; // Show DropFileContainer when hovered
  }
`;


// Hidden file input for image upload
export const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  position: relative;
  z-index: 0; // Ensures image is behind the DropFileContainer
`;

export const UploadMediaLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  pointer-events: none; /* Prevents clicking on label instead of input */
  text-align: center;
  z-index: 3; // Ensures label is on top
`;



export const IconsMediaUpload = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
`;

export const DescriptionInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  border-radius: 0.75rem;
  border: none;
  padding: 1rem;
  font-family: inherit;
  font-weight: 600;
  background-color: rgba(54, 69, 79, 0.1);
  margin-top: 1rem;

  &:focus,
  &:active {
    outline: 2px solid var(--primary);
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

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
