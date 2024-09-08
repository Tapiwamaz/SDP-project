import React from 'react';
import EventCard from '../EventCard/EventCard';
import './PendingEvents.css';

const PendingEvents = ({ events, onApprove, onReject }) => (
  <div className="pending-events">
    {events.filter(event => event.status === 'pending').map(event => (
      <EventCard 
        key={event.id}
        event={event} 
        onApprove={onApprove}
        onReject={onReject}
      />
    ))}
  </div>
);

export default PendingEvents;
