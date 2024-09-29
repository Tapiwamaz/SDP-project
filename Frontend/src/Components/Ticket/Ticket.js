import { TicketContainer, TicketImage, TextContainer, TicketTitle, DetailItem, Total, RightContainer, QRCode, DownloadLink } from "./Ticket.styles";
import download from '../../Images/download.svg';
import html2pdf from 'html2pdf.js';

export const Ticket = ({ title, date, time, venue, total, url, qrcode, id, onClick })  => {

    const downloadOnClick = (event) => {
      event.stopPropagation();
      html2pdf(document.getElementById('ticket'));
    }

    return (
      <TicketContainer onClick={onClick} id="ticket">
        {/* Mobile: Image on the left, Larger screens: Image below title */}
        <TicketImage src={url} alt="Event Image" data-html2canvas-ignore/>
  
        <TextContainer>
          <TicketTitle>{title}</TicketTitle>
  
          {/* Mobile: Text in column, Larger screens: Inline next to the image */}
          <DetailItem>
            <strong>Date:</strong> <br/> {date}
          </DetailItem>
          <DetailItem>
            <strong>Time:</strong> <br/> {time}
          </DetailItem>
          <DetailItem>
            <strong>Venue:</strong> <br/> {venue}
          </DetailItem>
          
  
          {/* Bold total amount */}
          <Total>Total: R{total}</Total>
        </TextContainer>
  
        {/* QR code and Download link, same placement for all screen sizes */}
        <RightContainer>
          {qrcode}
          <p style={{fontSize: '8px', fontWeight:'bold'}}>{id}</p>
          <DownloadLink onClick={downloadOnClick} data-html2canvas-ignore>
            <img src={download}/>Download PDF 
          </DownloadLink>
        </RightContainer>
      </TicketContainer>
    );
  };
  
 