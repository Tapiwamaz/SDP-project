import { TicketContainer, TicketImage, TextContainer, TicketTitle, DetailItem, Total, RightContainer, StyledButton, DownloadLink, ModalContent, ModalWrapper, Overlay } from "./Ticket.styles";
import { useState } from 'react';
import { getFirestore, doc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebase_config";
import download from '../../Images/download.svg';
import html2pdf from 'html2pdf.js';

export const Ticket = ({ title, date, time, venue, total, url, qrcode, id, onClick })  => {

  const cancel = async (event) => {
    event.stopPropagation();
    const docRef = doc(db, "Tickets", id);

    const userResponse = window.confirm("Are you sure you want to cancel this booking? You will be refunded in full");
    if (userResponse) {
      try {
        await updateDoc(docRef, {
          cancelled: true
        });
        alert("Booking has been cancelled. You will receive a full refund");
        window.location.reload();
      } catch (e) {
        alert("An error occurred. Please try again later");
      }
    }
  }

    const downloadOnClick = (event) => {
      event.stopPropagation();
      const container = document.createElement('div');
      const img = document.createElement('img');
      container.innerHTML = `
          <h1>${title}</h1>
          <p>Date: ${date}</p> 
          <p>Time: ${time}</p>
          <p>Venue: ${venue}</p>
          <p>Total: R${total}</p>
          <img src=${qrcode} alt="QRcode" />
          <p>${id}</p>
        `;
      
      html2pdf(container, {
        margin: 20,
        filename: id+'.pdf'
      });
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
          <StyledButton onClick={cancel}>Cancel Booking</StyledButton>
        </RightContainer>
      </TicketContainer>
 
    );
  };