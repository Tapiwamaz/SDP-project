import React, { useEffect, useState } from 'react';
import axios from 'axios'; // for API calls
import './MyEvents.css'; // Add appropriate CSS styles
import ViewCards from '../ViewCards/ViewCards'; // Assuming ViewCards is a separate component
import { Events } from '../../Mocky/Mocky';

const MyEvents = () => {
  // const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching event data or fetch from API
    // Replace this with an actual API request to get events for the organizer
    setEvents(Events); // mockData is imported
  }, []);


  const handleCancel = async (event_id) => {
    try {
      await axios.delete(`/api/events/${event_id}`);
      setEvents(events.filter(event => event.id !== event_id));
    } catch (error) {
      console.error('Error cancelling event:', error);
    }
  };

  const renderViewCards = (event) => (
    <ViewCards
      key={event.id}
      event={event}
      onCancel={event.status === 'upcoming' ? handleCancel : null}
    />
  );

  return (
    <div className="my-events-page">
      <h1>My Events</h1>

      <div className="myevents-list">
        {events.map(renderViewCards)}
      </div>
    </div>
  );
};

export default MyEvents;
