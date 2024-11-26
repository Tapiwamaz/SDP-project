import React, {useState} from 'react';
import EventCard from '../EventCard/EventCard';
import './PendingEvents.css';
import { db } from '../../firebase_config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noResults from "../../Images/noResults.svg";
import Popup from './Popup modal/Popup';

const secretKey = process.env.REACT_APP_X_API_KEY;

  // Check venue availability
  export const checkVenueAvailability = async (venueId, bookingDate, startTime, endTime) => {
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
  export const createBooking = async (venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription) => {
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
      console.log("Booking Data:", bookingData);

      if (!response.ok) {
        throw new Error('Error creating booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  };

  export const fetchUserDetails = async (userId) => {
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
  

// const PendingEvents = ({ events, handleApprove, handleReject }) => {

//   const [rejectReasons, setRejectReasons] = useState({});
  
//   const sortedEvents = events
//     .filter(event => event.status === 'pending')
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Approve the event if venue is available
//   const handleEventApprove = async (event) => {
    
//     const userDetails = await fetchUserDetails(event.user_id);
//     const isAvailable = await checkVenueAvailability(event.location, event.date, event.start_time, event.end_time);
    
//     if (event.type === "Online"){
//       handleApprove(event.event_id);
//       toast.success('Event successfully approved!');
//     }
//     else if (!isAvailable) {
//       alert('Venue is already booked. Please reject the event.');
//     } else {
//       const bookingResponse = await createBooking(userDetails.email, event.location, event.date, event.start_time, event.end_time, event.description);
//       if (bookingResponse) {
//         // Notify and approve the event
//         handleApprove(event.event_id);
//         toast.success('Event successfully approved!');
//         //console.log("booked venue!");
//       }
//       else {
//         toast.error('Error occurred while approving the event.');
//         //console.log("could not book venue!");
//       }
//     }
//   };


//   //handling reasons separately for each event
//   const handleRejectReasonChange = (eventId, value) => {
//     setRejectReasons((prevReasons) => ({
//       ...prevReasons,
//       [eventId]: value,
//     }));
//   };
  
//   const handleEventReject = async (event) => {
//     const rejectReason = rejectReasons[event.event_id];
//     if (!rejectReason?.trim()) {
//       alert('Please provide a reason for rejection');
//       return;
//     }
  
//     handleReject(event.event_id, rejectReason);
//     setRejectReasons((prevReasons) => ({
//       ...prevReasons,
//       [event.event_id]: '',
//     }));
//     toast.success('Event successfully rejected!');
//   };


//   if (sortedEvents.length === 0) {
//     return (
//       <div style={{ textAlign: 'center' }}>
//         <img src={noResults} alt="No events found" />
//         <p>No pending events found</p>
//       </div>
//     );
//   }

//   return (
//     <>    
//     <ToastContainer />
//     <div className="p-events-list">
  
//       {sortedEvents.map(event => (
//         <div key={event.id}>
//           <EventCard 
//             event={event} 
//             onApprove={() => handleEventApprove(event)}
//             onReject={() => handleEventReject(event)}
            
//             rejectInput={(
//               <input 
//                 type="text"
//                 value={rejectReasons[event.event_id] || ''}
//                 onChange={(e) => handleRejectReasonChange(event.event_id, e.target.value)}
//                 placeholder="Enter reject reason"
//                 style={{borderRadius:"1.35rem",padding:"3px"}}
//               />
//             )}
//           />
//         </div>
//       ))}
//     </div>
//     </>
//   );
// };

const PendingEvents = ({ events, handleApprove, handleReject }) => {
  const [rejectReasons, setRejectReasons] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const sortedEvents = events
      .filter(event => event.status === 'pending')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Approve the event if venue is available
  const handleEventApprove = async (event) => {
      const userDetails = await fetchUserDetails(event.user_id);
      const isAvailable = await checkVenueAvailability(event.location, event.date, event.start_time, event.end_time);

      if (event.type === "Online") {
          handleApprove(event.event_id);
          toast.success('Event successfully approved!');
      } else if (!isAvailable) {
          setPopupTitle('Venue Unavailable');
          setPopupMessage('Venue is already booked. Please reject the event.');
          setShowPopup(true);
      } else {
          const bookingResponse = await createBooking(userDetails.email, event.location, event.date, event.start_time, event.end_time, event.description);
          if (bookingResponse) {
              handleApprove(event.event_id);
              toast.success('Event successfully approved!');
          } else {
              toast.error('Error occurred while approving the event.');
          }
      }
  };

  // Handle reasons separately for each event
  const handleRejectReasonChange = (eventId, value) => {
      setRejectReasons((prevReasons) => ({
          ...prevReasons,
          [eventId]: value,
      }));
  };

  const handleEventReject = async (event) => {
      const rejectReason = rejectReasons[event.event_id];
      if (!rejectReason?.trim()) {
          setPopupTitle('Rejection Required');
          setPopupMessage('Please provide a reason for rejection.');
          setShowPopup(true);
          return;
      }

      handleReject(event.event_id, rejectReason);
      setRejectReasons((prevReasons) => ({
          ...prevReasons,
          [event.event_id]: '',
      }));
      toast.success('Event successfully rejected!');
  };

  if (sortedEvents.length === 0) {
      return (
          <div style={{ textAlign: 'center' }}>
              <img src={noResults} alt="No events found" />
              <p>No pending events found</p>
          </div>
      );
  }

  return (
      <>    
      <ToastContainer />
      <Popup trigger={showPopup} setTrigger={setShowPopup} title={popupTitle}>
          {popupMessage}
      </Popup>
      <div className="p-events-list">
          {sortedEvents.map(event => (
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
                              style={{ borderRadius: "1.35rem", padding: "3px" }}
                          />
                      )}
                  />
              </div>
          ))}
      </div>
      </>
  );
};


export default PendingEvents;