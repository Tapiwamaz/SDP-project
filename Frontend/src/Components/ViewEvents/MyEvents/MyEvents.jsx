//with backend functionality 
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './MyEvents.css';
import ViewCards from '../ViewCards/ViewCards';
import Header from '../../Header/Header';
import AsideDesktop from '../../AsideDesktop/AsideDesktop';
import { db } from '../../../firebase_config';

const MyEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'Events');
        const q = query(eventsCollection, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);

        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userId]);

  // const handleCancel = async (event_id) => {
  //   try {
  //     await deleteDoc(doc(db, 'Events', event_id));
  //     setEvents(events.filter(event => event.id !== event_id));
  //   } catch (error) {
  //     console.error('Error cancelling event:', error);
  //   }
  // };
  const handleCancel = async (event_id) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this event?"); //small nyana alert before cancelling
    if (userConfirmed) {
      try {
        await deleteDoc(doc(db, 'Events', event_id));
        setEvents(events.filter(event => event.id !== event_id));
      } catch (error) {
        console.error('Error cancelling event:', error);
      }
    }
  };

  const renderViewCards = (event) => (
    <ViewCards
      key={event.id}
      event={event}
      onCancel={handleCancel} //event.status === 'pending' ? handleCancel : null (used to display cancel button only when status is pending)
    />
  );

  return (
    <div>
      <Header />
      <AsideDesktop />
      <div className="my-events-page">
        <h1>My Events</h1>
        <div className="myevents-list">
          {events.length > 0 ? events.map(renderViewCards) : <p>No events found</p>}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
