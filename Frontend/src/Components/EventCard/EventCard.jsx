// import React from 'react';
// import './EventCard.css';
// import Tags from '../Tags/Tags';
// import Popup from '../Popup/Popup';
// import { useState } from 'react';

// const EventCard = ({ event, onApprove, onReject }) => {

//     const [buttonPopup, setButtonPopup] = useState(false);

//     let formattedDate;
//     const formatDate=(date)=>{
//     const eventDate = new Date(date);
//     formattedDate = eventDate.toLocaleDateString('en-US', {
//     weekday: 'long',  // Full name of the day (e.g., "Sunday")
//     month: 'short',   // Short month name (e.g., "Nov")
//     day: 'numeric'    // Numeric day of the month (e.g., "2")
//     });

//     return formattedDate;

//     }
//     const formatTime=(time)=>{

//     const eventStartTime = new Date(time);
//     const formattedTime = eventStartTime.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true      // Use 12-hour time (AM/PM)
//     });
//     return formattedTime
//     }

//     return(
//     <div className='parent-container'>
//         <div className="event-card">
//             <img src={event.image} alt={event.title} className="event-image" />
//             <h2>{event.title}</h2>
//             <div className="event-details">
//                 <div className="event-row">
//                     <p>Day - {event.date}</p>
//                     <span className="event-payment-status">{event.isFree ? 'Free' : 'Paid'}</span>
//                 </div>

//                 <div className="event-info">
//                     <p>{event.startTime} - {event.endTime}</p>
//                     <p>{event.location}</p>
//                     <div className="spacer"></div>
//                     <p>{event.organizer}</p>
//                 </div>

//             </div>   

//             {/* <button>Description</button> */}
//             <button className='description' onClick={() => setButtonPopup(true)}>Description</button>
//             <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
//                 <p>{event.description}</p>
//             </Popup>

//             <Tags name={event.category}></Tags>

//             {event.status !== 'pending' && (
//             <p>Status: {event.status === 'approved' ? 'Approved' : 'Rejected'}</p>
//             )}

//             {onApprove && onReject && event.status === 'pending' && (
//             <div className="actions">
//                 <button onClick={() => onApprove(event.id)}>Approve</button>
//                 <button onClick={() => onReject(event.id)}>Reject</button>
//             </div>
//             )}
//        </div>

//   </div>

//         );
// };

// export default EventCard;


import React from 'react';
import './EventCard.css';
import Tags from '../Tags/Tags';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import placeholderImage from "./depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg"

const EventCard = ({ event, onApprove, onReject }) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    const eventStartTime = new Date(time);
    return eventStartTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  //const placeholderImage = "https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg";


  return (
    <div className='parent-container'>
      <div className="event-card">
        {/* <img src={event.image_url} alt={event.title} className="event-image" /> */}
        <img
        src={event.image_url || placeholderImage} // Use placeholder if image_url is missing
        alt={event.name}
        onError={(e) => {
          e.target.src = placeholderImage; // If image fails to load, show the placeholder
        }}
        className='event-image'
        />
        <h2>{event.name}</h2>
        <div className="event-details">
          <div className="event-row">
            <p>Day - {formatDate(event.date)}</p>
            <span className="event-payment-status">{event.isFree ? 'Free' : `Paid - R${event.price}`}</span>
          </div>
          <div className="event-info">
            <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p>{event.location}</p>
            <div className="spacer"></div>
            <p>{event.organizer}</p>
          </div>
        </div>
        <button className='description' onClick={() => setButtonPopup(true)}>Description</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <p>{event.description}</p>
        </Popup>
        <Tags name={event.type} />
        {event.status !== 'pending' && (
          <p>Status: {event.status === 'approved' ? 'Approved' : 'Rejected'}</p>
        )}
        {onApprove && onReject && event.status === 'pending' && (
          <div className="actions">
            <button onClick={() => onApprove(event.event_id)}>Approve</button>
            <button onClick={() => onReject(event.event_id)}>Reject</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
