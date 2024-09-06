// import React from 'react';

// const EventCard = ({ event, onApprove, onReject }) => (
//   <div className="event-card">
//     <img src={event.image} alt={event.title} className="event-image" />
//     <h2>{event.title}</h2>
//     <p>{event.date}</p>
//     <p>{event.time}</p>
//     <p>{event.location}</p>
//     <p>{event.organizer}</p>
//     {event.status !== 'pending' && (
//       <p>Status: {event.status === 'approved' ? 'Approved' : 'Rejected'}</p>
//     )}
//     {onApprove && onReject && event.status === 'pending' && (
//       <div className="actions">
//         <button onClick={() => onApprove(event.id)}>Approve</button>
//         <button onClick={() => onReject(event.id)}>Reject</button>
//       </div>
//     )}
//   </div>
// );

// export default EventCard;


import React from 'react';

const EventCard = ({ event, onApprove, onReject }) => (
    <div className="event-card">
    <img src={event.image} alt={event.title} className="event-image" />
    <h2>{event.title}</h2>
    <div className="event-details">
        <div className="event-row">
            <p>{event.date}</p>
            <span className="event-payment-status">{event.isFree ? 'Free' : 'Paid'}</span>
        </div>

        <div className="event-info">
            <p>{event.time}</p>
            <p>{event.location}</p>
            <div className="spacer"></div>
            <p>{event.organizer}</p>
        </div>
        
    </div>

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
);

export default EventCard;
