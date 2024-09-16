//with backend functionality 
import React from 'react';
import './ViewCards.css';
import placeholderImage from './depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg'; // Placeholder image

const ViewCards = ({ event, onCancel }) => {
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

  const handleEdit = () => {
    alert("Feature is coming soon :)");
    console.log("Edit event placeholder");
  };

  return (
    <div className="myparent-container">
      <div className="myevent-card">
        <img
          src={event.image_url || placeholderImage}
          alt={event.name}
          onError={(e) => (e.target.src = placeholderImage)} 
          className="myevent-image"
        />

        <h2>{event.name}</h2>
        <div className="myevent-details">
          <p>Day - {formatDate(event.date)}</p>
          <p>{event.start_time} - {event.end_time}</p>
          <p>{event.location}</p>
          <p>Capacity: {event.capacity}</p>
          <p>Ticket Count: {event.ticket_count}</p>
          <p>Status: {event.status}</p>
        </div>

        <div className="event-actions">
          <button className='reschedule-button' onClick={handleEdit}>Reschedule</button>
          {onCancel && (
            <button className='cancel-button' onClick={() => onCancel(event.id)}>Cancel Event</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCards;
