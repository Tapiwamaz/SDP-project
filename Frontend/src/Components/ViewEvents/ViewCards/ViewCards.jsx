import React, { useState } from 'react';
import './ViewCards.css';
import Popup from '../../Popup/Popup'; // Assuming you have a Popup component
//import MyPopup from "./MyPopup"
import placeholderImage from './depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg'; // Placeholder image

const ViewCards = ({ event, onApprove, onReject, onCancel }) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    const eventTime = new Date(time);
    return eventTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="myparent-container">
      <div className="myevent-card">
        {/* Event Image */}
        <img
          src={event.image_url || placeholderImage}
          alt={event.name}
          onError={(e) => (e.target.src = placeholderImage)} // Fallback to placeholder if the image fails
          className="myevent-image"
        />

        {/* Event Information */}
        <h2>{event.name}</h2>
        <div className="myevent-details">
          <div className="myevent-row">
            <p>Day - {formatDate(event.date)}</p>
            {/* <span className="event-payment-status">
              {event.isFree ? 'Free' : `Paid - R${event.price}`}
            </span> */}
          </div>
          <div className="myevent-info">
            <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p>{event.location}</p>
            <p>Capacity: {event.capacity}</p>
            <p>Tickets Sold: {event.ticketsSold}</p>
          </div>
        </div>

        {/* Popup for Event Actions */}
        <button className="description" onClick={() => setButtonPopup(true)}>
          Options
        </button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className="popup-content">
            {onCancel && (
              <button onClick={() => onCancel(event.id)}>Cancel Event</button>
            )}
          </div>
        </Popup>

        {/* Status and Approval/Reject Buttons */}
        {/* {event.status !== 'pending' && (
          <p>Status: {event.status === 'approved' ? 'Approved' : 'Rejected'}</p>
        )} */}

      </div>
    </div>
  );
};

export default ViewCards;
