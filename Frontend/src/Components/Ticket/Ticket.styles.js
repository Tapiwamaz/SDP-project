import styled from 'styled-components';

// Ticket container with responsive design
export const TicketContainer = styled.div`
  width: 80vw;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  justify-content: space-between;
  cursor: pointer;
  

  @media (min-width: 868px) {
    flex-direction: row;
    align-items: center; /* Align items in the center for larger screens */
  }

  @media (max-width: 450px) {
    padding: 10px; /* Further reduce padding for very small screens */
  }
`;

// Ticket image, adjusts size and placement depending on screen size
export const TicketImage = styled.img`
  width: 35vw;
  height: 20vw;
  margin-right: 10px;
  border-radius: 15px;
  

  @media (min-width: 868px) {
    width: 150px;
    height: auto;
    margin-right: 20px;
  }
`;

// Text container that holds title, details, and total
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 20px;

  @media (min-width: 868px) {
    flex-direction: row;
    margin-top: 10px;
  }

`;

// Title at the top
export const TicketTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;

  @media (min-width: 868px) {
    font-size: 1.5rem;
    margin-right: 40px; /* Add some spacing between title and details */
  }

  @media (max-width: 450px) {
    font-size: 1rem; /* Further reduce font size */
    margin-right: 0; /* Remove margin */
  }
`;

// Detail items like date, venue, and quantity
export const DetailItem = styled.div`
  font-size: 0.75rem;
  margin-top: 10px;

  @media (min-width: 868px) {
    font-size: 1rem;
    margin-right: 30px; /* Details next to each other */
    margin-bottom: 0;
  }

  

  @media (max-width: 450px) {
    font-size: 0.65rem; /* Further reduce font size */
    margin-top: 5px; /* Adjust margin for smaller screens */
  }
`;

// Total price bold and at the bottom for smaller screens, inline on larger screens
export const Total = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;

  @media (min-width: 868px) {
    font-size: 1.25rem;
  }

  @media (max-width: 450px) {
    font-size: 0.75rem; /* Further reduce font size */
    margin-top: 5px; /* Further reduce margin */
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically and horizontally */
  

  @media (min-width: 868px) {
    margin-left: 0; /* Remove margin for larger screens */
  }
`;

// QR code styling
export const QRCode = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;

  @media (max-width: 450px) {
    width: 40px; /* Further reduce QR code size */
    height: 40px; /* Maintain aspect ratio */
  }
`;

// Download link styling with icon on the left
export const DownloadLink = styled.a`
  display: flex;
  align-items: center; /* Align icon and text vertically */
  
  font-size: 0.75rem;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  
  img {
    width: 1em;
    height: 1em;
    margin-right: 5px;
  }

  svg {
    width: 1em; /* Icon will have the same height as the text */
    height: 1em;
    margin-right: 5px; /* Adjust margin to place icon to the left of text */
  }

  @media (max-width: 450px) {
    font-size: 0.6rem; /* Further reduce font size */
  }
`;


export const StyledButton = styled.button`
  width: 80%;              /* 75% of the viewport width */
  height: auto;              /* Auto-adjust height */
  padding: 10px;             /* Padding inside the button */
  margin: 15px;
  background-color: #d22b2b; /* Darkish blue background */
  color: white;              /* White text */
  border: none;              /* No border */
  border-radius: 15px;       /* Rounded edges */
  font-size: 14px;           /* Font size matching the input */
  cursor: pointer;           /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: red; /* Slightly lighter blue on hover */
  }

  &:active {
    background-color: #880808; /* Darker blue when button is pressed */
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  
`;