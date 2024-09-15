// import React, { useState } from 'react';
// import PendingEvents from '../PendingEvents/PendingEvents';
// import HistoryEvents from '../HistoryEvents/HistoryEvents';
// import './Tabs.css';
// import Header from '../Header/Header';
// import AsideDesktop from '../AsideDesktop/AsideDesktop';

// const Tabs = () => {
//   const [events, setEvents] = useState([
//     { id: 1, title: 'Tech Summit', date: '2024-09-10', startTime: '10:00 AM', endTime: '12:00 PM', location: 'WSS 5', organizer: 'AWS Club', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending', category: 'IT' },
//     { id: 2, title: 'Basketball Match', date: '2024-09-12', startTime: '2:00 PM', endTime: '4:00 PM', location: 'Hall 29', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending', category: 'Sports' },
//     { id: 3, title: 'Notes & Melodies', date: '2024-10-20', startTime: '8:00 PM', endTime: '10:00 PM', location: 'Origins Centre', organizer: 'Wits Choir', image: 'https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending', category: 'Entertainment', description: "Explore the latest trends in modern art at this exclusive exhibition."},
//     { id: 4, title: 'Music Festival', date: '2024-11-25', startTime: '4:00 PM', endTime: '8:00 PM', location: 'Sturrock Park', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/6398745/pexels-photo-6398745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending', category: 'Entertainment' },
//   ]);

//   const handleApprove = (id) => {
//     setEvents(events.map(event => event.id === id ? { ...event, status: 'approved' } : event));
//   };

//   const handleReject = (id) => {
//     setEvents(events.map(event => event.id === id ? { ...event, status: 'rejected' } : event));
//   };

//   const [activeTab, setActiveTab] = useState('pending');

//   return (
//     <div>
//       <Header></Header>
//       <AsideDesktop></AsideDesktop>
//       <div className="tabs">
//         <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active' : ''}>
//           Pending
//         </button>
//         <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
//           History
//         </button>
//       </div>
//       {activeTab === 'pending' ? (
//         <PendingEvents events={events} onApprove={handleApprove} onReject={handleReject} />
//       ) : (
//         <HistoryEvents events={events} />
//       )}
//     </div>
//   );
// };

// export default Tabs;





import React, { useState, useEffect } from 'react';
import PendingEvents from '../PendingEvents/PendingEvents';
import HistoryEvents from '../HistoryEvents/HistoryEvents';
import './Tabs.css';
import Header from '../Header/Header';
import AsideDesktop from '../AsideDesktop/AsideDesktop';
import { Events } from "../Mocky/Mocky"; 
// import { db } from "../../firebase_config.js";
// import {collection, getDocs, updateDoc, doc} from "firebase/Firestore"

const Tabs = () => {
  const [events, setEvents] = useState([]);

  //  // Fetch events from Firestore
  //  useEffect(() => {
  //   const fetchEvents = async () => {
  //     const eventsCollection = collection(db, 'Events'); // Change 'Events' to your collection name
  //     const eventsSnapshot = await getDocs(eventsCollection);
  //     const eventsList = eventsSnapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       event_id: doc.id, // Ensure you map the Firestore document ID to your event object
  //     }));
  //     setEvents(eventsList);
  //   };

  //   fetchEvents();
  // }, []);

  // // Function to update the event status and approved field in Firestore
  // const handleUpdate = async (id, newStatus, approvedValue) => {
  //   const eventRef = doc(db, 'Events', id); // Point to the specific event document

  //   try {
  //     // Update both 'status' and 'approved' fields in Firestore
  //     await updateDoc(eventRef, {
  //       status: newStatus,
  //       approved: approvedValue
  //     });

  //     // Update state locally to reflect the changes in the UI
  //     setEvents(events.map(event =>
  //       event.event_id === id
  //         ? { ...event, status: newStatus, approved: approvedValue }
  //         : event
  //     ));
  //   } catch (error) {
  //     console.error("Error updating document: ", error);
  //   }
  // };

  // const handleApprove = (id) => {
  //   handleUpdate(id, 'approved', true); // Set status to 'approved' and approved to true
  // };

  // const handleReject = (id) => {
  //   handleUpdate(id, 'rejected', false); // Set status to 'rejected' and approved to false
  // };

  useEffect(() => {
    // Update the isFree field based on the price
    const updatedEvents = Events.map(event => ({
      ...event,
      isFree: event.price === 0 // isFree is true only when price is 0
    }));
    setEvents(updatedEvents);
  }, []);

  const handleApprove = (id) => {
    setEvents(events.map(event => event.event_id === id ? { ...event, status: 'approved' } : event));
  };

  const handleReject = (id) => {
    setEvents(events.map(event => event.event_id === id ? { ...event, status: 'rejected' } : event));
  };

  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div>
      <Header />
      <AsideDesktop />
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
        <HistoryEvents events={events.filter(event => event.status !== 'pending')} />
      )}
    </div>
  );
};

export default Tabs;

