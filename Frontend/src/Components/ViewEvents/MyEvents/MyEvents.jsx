import React, { useEffect, useState } from 'react';
import axios from 'axios'; // for API calls
import './MyEvents.css'; // Add appropriate CSS styles
import ViewCards from '../ViewCards/ViewCards'; // Assuming ViewCards is a separate component
import { Events } from '../../Mocky/Mocky';

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching event data or fetch from API
    // Replace this with an actual API request to get events for the organizer
    setEvents(Events); // mockData is imported
  }, []);

  const handleApprove = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/approve`);
      setEvents(events.map(event => event.id === eventId ? { ...event, status: 'approved' } : event));
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleReject = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/reject`);
      setEvents(events.map(event => event.id === eventId ? { ...event, status: 'rejected' } : event));
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  const handleCancel = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error cancelling event:', error);
    }
  };

  const renderViewCards = (event) => (
    <ViewCards
      key={event.id}
      event={event}
      onApprove={event.status === 'pending' ? handleApprove : null}
      onReject={event.status === 'pending' ? handleReject : null}
      onCancel={event.status === 'upcoming' ? handleCancel : null}
    />
  );

  return (
    <div className="my-events-page">
      <h1>My Events</h1>
      <div className="tabs">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={activeTab === 'upcoming' ? 'active' : ''}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={activeTab === 'pending' ? 'active' : ''}
        >
          Pending
        </button>
      </div>

      <div className="events-list">
        {activeTab === 'upcoming' &&
          events
            .filter((event) => event.status === 'upcoming')
            .map(renderViewCards)}
        {activeTab === 'pending' &&
          events
            .filter((event) => event.status === 'pending')
            .map(renderViewCards)}
      </div>
    </div>
  );
};

export default MyEvents;
