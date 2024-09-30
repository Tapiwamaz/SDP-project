import React from 'react';
import './EventCard.css';
import Tags from '../Tags/Tags';
import Popup from '../Popup/Popup';
import { useState , useEffect } from 'react';
import placeholderImage from "./depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg"


const fetchUsername = async (user_id, setUsername) => {
  console.log(`Fetching username for user_id: ${user_id}`);
  try {
    const response = await fetch(`/api/getUserById/?user_id=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   // return data.name;
    setUsername(data.name);
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
};

const EventCard = ({ event, onApprove, onReject, rejectInput }) => {
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


  const [username, setUsername] = useState('');
 
  useEffect(() => {
    console.log(event);
    if (event.user_id) {
      fetchUsername(event.user_id, setUsername);
    }
  }, [event.user_id]);

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
            <p>Day - {event.date}</p>
            <span className="event-payment-status">{event.price == 0 ? 'Free' : `Paid - R${event.price}`}</span> 
          </div>
          <div className="event-info">
            <p>{event.start_time} - {event.end_time}</p>
            <p>{event.location}</p>
            <div className="spacer"></div>
            <p>Organizer: {username}</p>
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
        <div className="spacer"></div>

        {rejectInput}

      </div>
    </div>
  );
};

export default EventCard;
