import { TicketContainer, TicketImage, TextContainer, TicketTitle, DetailItem, Total, RightContainer, QRCode, DownloadLink } from "./Ticket.styles";
import ticket from '../../Images/ticket.webp';
import download from '../../Images/download.svg';
import qrcode from '../../Images/QR_code.svg';
import sample from '../../Images/images.jfif';


export const Ticket = () => {
    return (
      <TicketContainer>
        {/* Mobile: Image on the left, Larger screens: Image below title */}
        <TicketImage src={sample} alt="Event Image" />
  
        <TextContainer>
          <TicketTitle>Event Title</TicketTitle>
  
          {/* Mobile: Text in column, Larger screens: Inline next to the image */}
          <DetailItem>
            <strong>Date:</strong> Sept 8, 2024
          </DetailItem>
          <DetailItem>
            <strong>Venue:</strong> WITS
          </DetailItem>
          <DetailItem>
            <strong>Quantity:</strong> 2
          </DetailItem>
  
          {/* Bold total amount */}
          <Total>Total: R150</Total>
        </TextContainer>
  
        {/* QR code and Download link, same placement for all screen sizes */}
        <RightContainer>
          <QRCode src={qrcode} alt="QR Code" />
          <DownloadLink href="#">
            Download PDF 
          </DownloadLink>
        </RightContainer>
      </TicketContainer>
    );
  };
  
 