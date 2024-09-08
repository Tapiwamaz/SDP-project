import styled from 'styled-components';
import ticket from '../../Images/ticket.webp';


export const TicketContainer = styled.div`
  width: 80vw;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  margin-left: 175px;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

// Image on the left for mobile, below title for larger screens
export const TicketImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 15px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 150px;
    margin-right: 20px;
  }
`;

// Text container for ticket details
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

// Ticket title (larger font size)
export const TicketTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0;
    text-align: left;
  }
`;

// Text details (Date, Venue, Quantity)
export const DetailItem = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    margin-right: 30px;
    margin-bottom: 0;
  }
`;

// Bold total amount
export const Total = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: auto;
  }
`;

// QR code and Download button on the right
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

export const QRCode = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`;

export const DownloadLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 5px;
  }
`;


