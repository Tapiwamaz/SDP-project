import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import './MyEvents.css';
import ViewCards from '../ViewCards/ViewCards';
import { db, auth } from '../../../firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
import noResults from "../../../Images/noResults.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const secretKey = process.env.REACT_APP_X_API_KEY;


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

export const getBookingID = async (venueId, bookingDate, startTime, endTime) => {
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
      throw new Error('Error fetching booking details');
    }

    const data = await response.json();

    if (data.length > 0) {
      // Assuming bookingID is available in the API response.
      return data[0].id;
    } else {
      throw new Error('No booking found for the given details');
    }
  } catch (error) {
    console.error('Error retrieving booking ID:', error);
    return null;
  }
};


// Function to delete the booking from Venue Management API
export const deleteBooking = async (bookingID) => {
  try {
    const response = await fetch(
      `https://wits-infrastructure-management.web.app/api/bookings/${bookingID}`, 
      {
        method: 'DELETE',
        headers: {
          'X-API-KEY': secretKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error deleting booking');
    }

    return await response.json(); // Return response or handle it accordingly
  } catch (error) {
    console.error('Error deleting booking:', error);
    return null; // Handle error accordingly
  }
};

// Function to send notification to Firestore
export const sendNotification = async (organizerId, eventId, notificationType, message, name, imageUrl) => {
  try {
    const formatDate = () => {
      const now = new Date();
      const padZero = (num) => num.toString().padStart(2, '0'); // Helper to add leading zero
      const year = now.getFullYear();
      const month = padZero(now.getMonth() + 1); // Months are 0-indexed
      const day = padZero(now.getDate());
      const hours = padZero(now.getHours());
      const minutes = padZero(now.getMinutes());
      const seconds = padZero(now.getSeconds());
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const notificationData = {
      notification_id: Date.now().toString(), // Use a timestamp as a mock ID or generate a UUID
      time: formatDate(), 
      notification_type: notificationType, // 'cancelled' in this case
      message,
      event_id: eventId,
      organizer_id: organizerId,
      name, // Organizer's name
      image_url: imageUrl, // Optionally include an image URL if needed
    };

    await addDoc(collection(db, 'Notifications'), notificationData);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};


const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null); // New state for user ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set userId when the user is authenticated
      } else {
        setUserId(null); // Handle unauthenticated state
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const statusOrder = {
    pending: 1,
    approved: 2,
    cancelled: 3,
    rejected: 4
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return; // Only fetch events if userId is available
      setLoading(true);

      try {
        const eventsCollection = collection(db, 'Events');
        const q = query(eventsCollection, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);

        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // setEvents(fetchedEvents);
        const sortedEvents = fetchedEvents.sort((a, b) => {
          if (a.status === b.status) {
            return new Date(b.created_at) - new Date(a.created_at);
          }
          return (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
        });
    
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching events
      }
    };

    fetchEvents();
  }, [userId]); // Fetch events whenever the userId changes


  


  const handleCancel = async (event) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this event?");
    if (!userConfirmed) return;
  
    try {
      const organizerDetails = await fetchUserDetails(event.user_id);
      const organizerName = organizerDetails ? organizerDetails.name : "Unknown Organizer";
  
      if (event.status === 'pending') {
        // Delete event from Firestore if status is still pending
        await deleteDoc(doc(db, 'Events', event.id));
        setEvents(events.filter(e => e.id !== event.id));
        //console.log("deleted event");
        toast.success(`Event ${event.name} has been canceled successfully!`); // Display success toast

      } else if (event.status === 'approved') {
        // Get the bookingID for the event using venue details
        const bookingID = await getBookingID(event.location, event.date, event.start_time, event.end_time);
  
        if (!bookingID) {
          //console.log('Booking ID not found, cannot proceed with cancellation.');
          return;
        }
  
        //Delete booking from Venue Management API using the bookingID
        
        await deleteBooking(bookingID)
        //console.log('booking deleted')
  
        //Post notification in Notifications table
        await sendNotification(
          event.user_id, 
          event.event_id, 
          'organizer', 
          `The event ${event.name} has been cancelled.`,//'Event has been cancelled', 
          organizerName, 
          event.image_url
        );


        // Update 'active' field in the Events table to 'false'
      const eventDoc = doc(db, 'Events', event.id);
      await updateDoc(eventDoc, { active: false, status: 'cancelled', approved: false });

      // Update 'cancelled' field in Tickets table to 'true'
      const ticketsCollection = collection(db, 'Tickets');
      const q = query(ticketsCollection, where('event_id', '==', event.event_id)); // Use event.event_id here
      const querySnapshot = await getDocs(q);
      
      //console.log(`Found ${querySnapshot.docs.length} tickets for event ID: ${event.event_id}`); // Use event.event_id for logging

      if (!querySnapshot.empty) {
        const ticketUpdates = querySnapshot.docs.map(docSnapshot => {
          const ticketDoc = doc(db, 'Tickets', docSnapshot.id);
          return updateDoc(ticketDoc, { cancelled: true });
        });

        await Promise.all(ticketUpdates);
        //console.log("Cancelled tickets updated.");
      } else {
        //console.log("No tickets found to update.");
      }


        
        toast.success(`Event ${event.name} has been canceled successfully!`);
        //setEvents(events.filter(e => e.id !== event.id)); // remove from UI

      }
    } catch (error) {
      console.error('Error cancelling event:', error);
    }
  };
  


  const renderViewCards = (event) => (
    <ViewCards
      key={event.id}
      event={event}
      onCancel={() => handleCancel(event)}
    />
  );

  return (
    <div className='wrapper'>
      <div className="my-events-page">
        <h1>My Events</h1>
        <div className="myevents-list">
            {/* {events.length > 0 ? [...events].reverse().map(renderViewCards) : <p>No events found</p>} */}
            {loading ? ( // Show loader while fetching events
            <div className="loader">
              <div className="centerLoader"></div>
              {/* <p>Loading events...</p> */}
            </div>
            ) : events.length > 0 ? (
            [...events].map(renderViewCards)
            ) : (
            <div style={{ textAlign: 'center' }}>
              <img src={noResults} alt="No events found" />
              <p>No events found</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyEvents;
