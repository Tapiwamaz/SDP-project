import React from 'react';
import EventCard from './EventCard';

const HistoryEvents = ({ events }) => {
  return (
    <div className="history-events">
      {events.filter(event => event.status !== 'pending').map(event => (
        <EventCard 
          key={event.id}
          event={event} 
        />
      ))}
    </div>
  );
};

export default HistoryEvents;
