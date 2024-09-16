import React, { useState, useEffect } from 'react';
import PendingEvents from '../PendingEvents/PendingEvents';
import HistoryEvents from '../HistoryEvents/HistoryEvents';
import './Tabs.css';
import Header from '../Header/Header';
import AsideDesktop from '../AsideDesktop/AsideDesktop';
//import { Events } from "../Mocky/Mocky"; 
// import { db } from "../../firebase_config.js";
// import {collection, getDocs, updateDoc, doc} from "firebase/Firestore"
import { db } from "../../firebase_config"; // Adjust the path based on your structure
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";



// const fetchUsername = async (user_id) => {
//   console.log(`Fetching username for user_id: ${user_id}`);
//   try {
//     const response = await fetch(`/api/getUserById/?user_id=${user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.name;
//   } catch (error) {
//     console.error('Error fetching username:', error);
//     return null;
//   }
// };


const fetchEvents = async (setEvents) =>{
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
      console.log('Data received from Azure Function:', data);
      //return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
};


// Function to update event in Firestore
// const updateEventDB = async (updatedEvent) => {
//   try {
//     const eventCollection = collection(db, 'Events'); // Reference to your Firestore collection
//     const q = query(eventCollection, where("event_id", "==", updatedEvent.event_id));
    
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(async (docSnapshot) => {
//       const docRef = docSnapshot.ref;
//       await updateDoc(docRef, updatedEvent);
//     });

//     console.log("Event updated successfully.");
//   } catch (error) {
//     console.error("Error updating event:", error);
//     throw new Error("Failed to update event. Please try again.");
//   }
// };
const updateEventDB = async (updatedEvent) => {
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

    console.log("Event updated successfully.");
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event. Please try again.");
  }
};



const Tabs = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetchEvents(setEvents);
  }, []);

  

  // const handleApprove = (id) => {
  //   setEvents(events.map(event => event.event_id === id ? { ...event, status: 'approved' } : event));
  // };

  // const handleReject = (id) => {
  //   setEvents(events.map(event => event.event_id === id ? { ...event, status: 'rejected' } : event));
  // };

  // Handle event approval
  const handleApprove = async (id) => {
    const updatedEvent = events.find(event => event.event_id === id);
    if (updatedEvent) {
      updatedEvent.approved = true; // Set approved to true
      updatedEvent.status = 'approved';

      await updateEventDB(updatedEvent); // Call the function to update Firestore

      // Update UI after event approval
      setEvents(events.map(event => event.event_id === id ? updatedEvent : event));
    }
  };

  // Handle event rejection
  const handleReject = async (id) => {
    const updatedEvent = events.find(event => event.event_id === id);
    if (updatedEvent) {
      updatedEvent.approved = false; // Set approved to false
      updatedEvent.status = 'rejected';

      await updateEventDB(updatedEvent); // Call the function to update Firestore

      // Update UI after event rejection
      setEvents(events.map(event => event.event_id === id ? updatedEvent : event));
    }
  };

  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className='Wrapper'>
      {/* <Header />
      <AsideDesktop /> */}
      <div className="tabs">
        <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active' : ''}>
          Pending
        </button>
        <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
          History
        </button>
      </div>
      {activeTab === 'pending' ? (
        <PendingEvents events={events.filter(event => event.status === 'pending')} onApprove={handleApprove} onReject={handleReject} />
      ) : (
        // <HistoryEvents events={events.filter(event => event.status !== 'pending')} />
        <HistoryEvents events={events.filter(event => event.status !== 'pending').reverse()} /> //so recently evaluated events are at ze top
      )}
    </div>
  );
};

export default Tabs;

