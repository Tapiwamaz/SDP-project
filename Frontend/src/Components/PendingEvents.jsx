import React, { useState } from 'react';
import EventCard from './EventCard';

const PendingEvents = () => {
  const [events, setEvents] = useState([
    // Dummy data for illustration
    { id: 1, title: 'Event 1', date: '2024-09-10', time: '10:00 AM', location: 'Location 1', organizer: 'Organizer 1', image: 'url-to-image', status: 'pending' },
    { id: 2, title: 'Event 2', date: '2024-09-12', time: '2:00 PM', location: 'Location 2', organizer: 'Organizer 2', image: 'url-to-image', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'approved' } : event));
  };

  const handleReject = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'rejected' } : event));
  };

  return (
    <div className="pending-events">
      {events.filter(event => event.status === 'pending').map(event => (
        <EventCard 
          key={event.id}
          event={event} 
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default PendingEvents;
