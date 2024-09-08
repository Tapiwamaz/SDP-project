import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onApprove, onReject }) => (

    <div className='parent-container'>
        <div className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h2>{event.title}</h2>
            <div className="event-details">
                <div className="event-row">
                    <p>Day - {event.date}</p>
                    <span className="event-payment-status">{event.isFree ? 'Free' : 'Paid'}</span>
                </div>

                <div className="event-info">
                    <p>{event.startTime} - {event.endTime}</p>
                    <p>{event.location}</p>
                    <div className="spacer"></div>
                    <p>{event.organizer}</p>
                </div>

            </div>   

            <button>Description</button>


            {event.status !== 'pending' && (
            <p>Status: {event.status === 'approved' ? 'Approved' : 'Rejected'}</p>
            )}

            {onApprove && onReject && event.status === 'pending' && (
            <div className="actions">
                <button onClick={() => onApprove(event.id)}>Approve</button>
                <button onClick={() => onReject(event.id)}>Reject</button>
            </div>
            )}
       </div>

  </div>

 
);

export default EventCard;
