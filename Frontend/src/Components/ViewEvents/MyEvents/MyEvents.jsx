// //with backend functionality 
// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import './MyEvents.css';
// import ViewCards from '../ViewCards/ViewCards';
// import Header from '../../Header/Header';
// import AsideDesktop from '../../AsideDesktop/AsideDesktop';
// import { db,auth } from '../../../firebase_config';

// const MyEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const eventsCollection = collection(db, 'Events');
//         const q = query(eventsCollection, where('user_id', '==', auth?.currentuser?.uid));
//         const querySnapshot = await getDocs(q);

//         const fetchedEvents = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setEvents(fetchedEvents);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, [auth?.currentuser?.uid]);

//   // const handleCancel = async (event_id) => {
//   //   try {
//   //     await deleteDoc(doc(db, 'Events', event_id));
//   //     setEvents(events.filter(event => event.id !== event_id));
//   //   } catch (error) {
//   //     console.error('Error cancelling event:', error);
//   //   }
//   // };
//   const handleCancel = async (event_id) => {
//     const userConfirmed = window.confirm("Are you sure you want to cancel this event?"); //small nyana alert before cancelling
//     if (userConfirmed) {
//       try {
//         await deleteDoc(doc(db, 'Events', event_id));
//         setEvents(events.filter(event => event.id !== event_id));
//       } catch (error) {
//         console.error('Error cancelling event:', error);
//       }
//     }
//   };

//   const renderViewCards = (event) => (
//     <ViewCards
//       key={event.id}
//       event={event}
//       onCancel={handleCancel} //event.status === 'pending' ? handleCancel : null (used to display cancel button only when status is pending)
//     />
//   );

//   return (
//     <div className='wrapper'>
//       <div className="my-events-page">
//         <h1>My Events</h1>
//         <div className="myevents-list">
//           {events.length > 0 ? [...events].reverse().map(renderViewCards) : <p>No events found</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyEvents;

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './MyEvents.css';
import ViewCards from '../ViewCards/ViewCards';
import Header from '../../Header/Header';
import AsideDesktop from '../../AsideDesktop/AsideDesktop';
import { db, auth } from '../../../firebase_config';
import { onAuthStateChanged } from 'firebase/auth';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null); // New state for user ID

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

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return; // Only fetch events if userId is available

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
  }, [userId]); // Fetch events whenever the userId changes

  const handleCancel = async (event_id) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this event?");
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
      onCancel={handleCancel}
    />
  );

  return (
    <div className='wrapper'>
      <div className="my-events-page">
        <h1>My Events</h1>
        <div className="myevents-list">
          {events.length > 0 ? [...events].reverse().map(renderViewCards) : <p>No events found</p>}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
