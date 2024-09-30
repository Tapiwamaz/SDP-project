import React, {useState} from 'react';
import EventCard from '../EventCard/EventCard';
import './PendingEvents.css';
import { db } from '../../firebase_config';
import { collection, query, where, getDocs } from 'firebase/firestore';


// const PendingEvents = ({ events, onApprove, onReject }) => (
//   <div className="p-events-list">
//     {events.filter(event => event.status === 'pending').map(event => (
//       <EventCard 
//         key={event.id}
//         event={event} 
//         onApprove={onApprove}
//         onReject={onReject}
//       />
//     ))}
//   </div>
// );

// export default PendingEvents;



const secretKey = process.env.REACT_APP_X_API_KEY;

  // Check venue availability
  const checkVenueAvailability = async (venueId, bookingDate, startTime, endTime) => {
    try {
      const response = await fetch(
        `https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${venueId}&bookingDate=${bookingDate}&bookingStartTime=${startTime}&bookingEndTime=${endTime}`, 
        {
          method: 'GET',
          headers: {
            'X-API-KEY': secretKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching venue availability');
      }

      const data = await response.json();
      return data.length === 0; // If no booking exists, venue is available
    } catch (error) {
      console.error('Error checking venue availability:', error);
      return false;
    }
  };

  // Create booking after approval
  const createBooking = async (venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription) => {
    const bookingData = {
      venueBooker,
      venueID,
      bookingDate,
      bookingStartTime: startTime,
      bookingEndTime: endTime,
      bookingDescription
    };

    try {
      const response = await fetch(
        'https://wits-infrastructure-management.web.app/api/bookings/create',
        {
          method: 'POST',
          headers: {
            'X-API-KEY': secretKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error('Error creating booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const userCollection = collection(db, 'Users'); 
      const q = query(userCollection, where("user_id", "==", userId)); 
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // First match from the query
        return { id: userDoc.id, ...userDoc.data() }; // Return the user details
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };
  

const PendingEvents = ({ events, handleApprove, handleReject }) => {
  //const [rejectReason, setRejectReason] = useState('');
  const [rejectReasons, setRejectReasons] = useState({});
  

  // Approve the event if venue is available
  const handleEventApprove = async (event) => {
    //const { eventId, venueId, bookingDate, bookingStartTime, bookingEndTime } = event;
    const userDetails = await fetchUserDetails(event.user_id);
    const isAvailable = await checkVenueAvailability(event.venue_id, event.date, event.start_time, event.end_time);
    
    if (!isAvailable) {
      alert('Venue is already booked. Please reject the event.');
    } else {
      const bookingResponse = await createBooking(userDetails.email, event.venue_id, event.date, event.start_time, event.end_time, event.description);
      if (bookingResponse) {
        // Notify and approve the event
        handleApprove(event.event_id);
      }
      console.log("booked venue!");
    }
  };

  // Reject the event with reason
  // const handleEventReject = async (event) => {
  //   if (!rejectReason.trim()) {
  //     alert('Please provide a reason for rejection');
  //     return;
  //   }

  //   handleReject(event.event_id, rejectReason);
  //   setRejectReason('');
  // };


  //handling reasons separately for each event
  const handleRejectReasonChange = (eventId, value) => {
    setRejectReasons((prevReasons) => ({
      ...prevReasons,
      [eventId]: value,
    }));
  };
  
  const handleEventReject = async (event) => {
    const rejectReason = rejectReasons[event.event_id];
    if (!rejectReason?.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
  
    handleReject(event.event_id, rejectReason);
    setRejectReasons((prevReasons) => ({
      ...prevReasons,
      [event.event_id]: '',
    }));
  };



  return (
    <div className="p-events-list">
      {events.filter(event => event.status === 'pending').map(event => (
        <div key={event.id}>
          <EventCard 
            event={event} 
            onApprove={() => handleEventApprove(event)}
            onReject={() => handleEventReject(event)}
            
            rejectInput={(
              <input 
                type="text"
                value={rejectReasons[event.event_id] || ''}
                onChange={(e) => handleRejectReasonChange(event.event_id, e.target.value)}
                placeholder="Enter reject reason"
              />
            )}

          />
          {/* Input for reject reason */}
          {/* <input 
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter reject reason"
          /> */}

          {/* <input 
          type="text"
          value={rejectReasons[event.event_id] || ''}
          onChange={(e) => handleRejectReasonChange(event.event_id, e.target.value)}
          placeholder="Enter reject reason"
          /> */}
        </div>
      ))}
    </div>
  );
};


export default PendingEvents;