import React, { useState, useEffect } from 'react';
import PendingEvents from '../PendingEvents/PendingEvents';
import HistoryEvents from '../HistoryEvents/HistoryEvents';
import './Tabs.css';
import { db } from "../../firebase_config"; // Adjust the path based on your structure
import { collection, query, where, getDocs, updateDoc, serverTimestamp, addDoc, doc, getDoc } from "firebase/firestore";
import noResults from "../../Images/noResults.svg";



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
      time: formatDate(),  //serverTimestamp(), // Automatically sets the time when the notification is created
      notification_type: notificationType, // 'approved' or 'rejected'
      message,
      event_id: eventId,
      organizer_id: organizerId,
      name, // Organizer's name
      image_url: imageUrl, // Optionally include an image URL if needed
    };

    await addDoc(collection(db, 'Notifications'), notificationData);
    //console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};


export const fetchEvents = async (setEvents) =>{
  try {
      // Using relative URL
      const response = await fetch('/api/events', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

       const data = await response.json();
      // const updatedEvents = data.map(event => ({
      //   ...event,
      //   isFree: event.price === 0 // isFree is true only when price is 0
      // }));

      const updatedEvents = await Promise.all(
        data.map(async (event) => {
          //const username = await fetchUsername(event.user_id);
          return {
            ...event,
            //isFree: event.price === 0, // Add 'isFree' based on price
            //organizer: username, // Replace `user_id` with `name`
          };
        })
      );

      setEvents(updatedEvents);
      //console.log('Data received from Azure Function:', data);
      //return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
};


export const updateEventDB = async (updatedEvent) => {
  try {
    const eventCollection = collection(db, 'Events'); 
    const q = query(eventCollection, where("event_id", "==", updatedEvent.event_id));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = docSnapshot.ref;

      // Destructure and remove the unwanted fields (was causing redundancy in db)
      const { id, eventID, ...eventWithoutIDs } = updatedEvent;

      //update Firestore without 'id' and 'eventID' fields
      await updateDoc(docRef, eventWithoutIDs);
    });

    //console.log("Event updated successfully.");
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event. Please try again.");
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


const Tabs = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents(setEvents);
  }, []);


  const handleApprove = async (id) => {
    const updatedEvent = events.find(event => event.event_id === id);
    if (updatedEvent) {
      const userDetails = await fetchUserDetails(updatedEvent.user_id);
      if (!userDetails) {
        alert('Failed to fetch user details');
        return;
      }

      updatedEvent.approved = true;
      updatedEvent.status = 'approved';

      await updateEventDB(updatedEvent);

      // Send notification to the organizer
      await sendNotification(
        updatedEvent.user_id, // Organizer's user ID
        updatedEvent.event_id, // Event ID
        'admin', // Notification type
        'Your event has been approved!', // Message
        userDetails.name, // Organizer's name
        updatedEvent.image_url //the event image URL
      );

      setEvents(events.map(event => event.event_id === id ? updatedEvent : event));
    }
  };

  const handleReject = async (id, rejectReason) => {
    const updatedEvent = events.find(event => event.event_id === id);
    if (updatedEvent) {
      const userDetails = await fetchUserDetails(updatedEvent.user_id);
      if (!userDetails) {
        alert('Failed to fetch user details');
        return;
      }

      updatedEvent.approved = false;
      updatedEvent.status = 'rejected';

      await updateEventDB(updatedEvent);

      // Send rejection notification to the organizer
      await sendNotification(
        updatedEvent.user_id, // Organizer's user ID
        updatedEvent.event_id, // Event ID
        'admin', // Notification type
        `Your event was rejected. Reason: ${rejectReason}`, // Message with reason
        userDetails.name, // Organizer's name
        updatedEvent.image_url //the event image URL
      );

      setEvents(events.map(event => event.event_id === id ? updatedEvent : event));
    }
  };

  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false);    // Error state

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);  // Set loading to true before fetching events
        await fetchEvents(setEvents);  // Pass setEvents to the fetchEvents function
        setError(false);
      } catch (error) {
        setError(true);    // Handle error if fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
  
    loadEvents();
  }, []);

  const sortedPendingEvents = events
    .filter(event => event.status === 'pending')
    .sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison === 0) {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return dateComparison;
    });

    const sortedHistoryEvents = events
    .filter(event => event.status === 'rejected')
    .sort((a, b) => {
      const scheduledComparison = new Date(a.date) - new Date(b.date); // Sort by scheduled date first
      if (scheduledComparison === 0) {
        return new Date(b.created_at) - new Date(a.created_at); // If scheduled dates are the same, sort by creation date (most recent first)
      }
      return scheduledComparison; // Return the primary sort result
    });
  

  return (
    <div className='Wrapper'>
      <div className='my-tabs'>
        <h1>Approvals</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active' : ''}>
            Pending
          </button>
          <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
            History
          </button>
        </div>
      </div>
        {/* {activeTab === 'pending' ? (
          <PendingEvents events={events.filter(event => event.status === 'pending')} handleApprove={handleApprove} handleReject={handleReject} />
        ) : (
          <HistoryEvents events={events.filter(event => event.status !== 'pending').reverse()} />
        )} */}

      {/* Loader */}
      {loading && (
        <div className="loader">
          <div className="centerLoader"></div>
        </div>
      )}


      {/* Conditional Content Based on Loading, Error, and Events */}
      {!loading && error && (
        <div style={{ textAlign: 'center' }}>
          <img src={noResults} alt="Error loading events" />
          <p>An error occurred while loading events.</p>
        </div>
      )}


      {!loading && !error && events.length > 0 && (
        activeTab === 'pending' ? (
          <PendingEvents 
            events={sortedPendingEvents} 
            handleApprove={handleApprove} 
            handleReject={handleReject} 
            data-testid="PendingEvents"
          />
        ) : (
          <HistoryEvents 
            events={sortedHistoryEvents}
            data-testid="HistoryEvents"
          />
        )
      )}
    </div>
  );


};

export default Tabs;

