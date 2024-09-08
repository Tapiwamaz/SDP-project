import React from 'react';
import EventCard from '../EventCard/EventCard';
import './HistoryEvents.css';

const HistoryEvents = ({ events }) => {
  return (
    <div className="history-events">
      {events
      .filter(event => event.status !== 'pending')
        .map(event => (
          <EventCard 
            key={event.id}
            event={event} 
            status={event.status}  // Pass the event status to EventCard
          />
        ))}
    </div>
  );
};

export default HistoryEvents;
