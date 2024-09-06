import React from 'react';

const EventCard = ({ event, onApprove, onReject }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} className="event-image" />
    <h2>{event.title}</h2>
    <p>{event.date}</p>
    <p>{event.time}</p>
    <p>{event.location}</p>
    <p>{event.organizer}</p>
    {onApprove && onReject && (
      <div className="actions">
        <button onClick={() => onApprove(event.id)}>Approve</button>
        <button onClick={() => onReject(event.id)}>Reject</button>
      </div>
    )}
  </div>
);

export default EventCard;
