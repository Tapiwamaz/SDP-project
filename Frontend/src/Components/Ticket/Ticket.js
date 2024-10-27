import { TicketContainer, Link, TicketImage, TextContainer, TicketTitle, DetailItem, Total, RightContainer, StyledButton, DownloadLink, ModalContent, ModalWrapper, Overlay } from "./Ticket.styles";
import { useState } from 'react';
import { getFirestore, doc, updateDoc, FieldValue } from "firebase/firestore"; 
import { db } from "../../firebase_config";
import download from '../../Images/download.svg';
import html2pdf from 'html2pdf.js';
import ReactDOM from "react-dom";
import React from "react";


export const Ticket = ({ title, date, time, venue, total, url, qrcode, id, onClick, type, event_id })  => {

  const cancel = async (event) => {
    event.stopPropagation();
    const docRef = doc(db, "Tickets", id);
    const eventDocRef = doc(db, "Events", event_id);

    const userResponse = window.confirm("Are you sure you want to cancel this booking? You will be refunded in full");
    if (userResponse) {
      try {
        await updateDoc(docRef, {
          cancelled: true
        });
        await updateDoc(eventDocRef, {
          tickets_count: FieldValue.increment(1)
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
      ReactDOM.render(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ color: 'black' }}>{title}</h1>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Venue: {venue}</p>
          <p>Total: R{total}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '30px' }}>
            {React.cloneElement(qrcode, { style: { margin: '0px' } })} {/* Adding margin for better spacing */}
            <p style={{ margin: '10px 0'}}>{id}</p> {/* Adding margin for better spacing */}
          </div>
        </div>,
        container
      );
      
      html2pdf(container, {
        margin: 20,
        filename: id+'.pdf'
      });
    }

    

    return (
      <TicketContainer id="ticket">
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
          <Link color="black" onClick={onClick}>View Details</Link>
          {type==="Upcoming" && <Link color="red" onClick={cancel}>Cancel Booking</Link>}
        </RightContainer>
      </TicketContainer>
 
    );
  };