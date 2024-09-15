import React, { useState, useEffect } from 'react';
import PendingEvents from '../PendingEvents/PendingEvents';
import HistoryEvents from '../HistoryEvents/HistoryEvents';
import './Tabs.css';
import Header from '../Header/Header';
import AsideDesktop from '../AsideDesktop/AsideDesktop';
//import { Events } from "../Mocky/Mocky"; 
// import { db } from "../../firebase_config.js";
// import {collection, getDocs, updateDoc, doc} from "firebase/Firestore"

const fetchUsername = async (user_id) => {
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
    return data.name;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
};


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
          const username = await fetchUsername(event.user_id);
          return {
            ...event,
            isFree: event.price === 0, // Add 'isFree' based on price
            organizer: username, // Replace `user_id` with `name`
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


const Tabs = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetchEvents(setEvents);
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

