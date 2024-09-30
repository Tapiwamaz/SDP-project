import React from 'react';
import EventCard from '../EventCard/EventCard';
import './HistoryEvents.css';
import noResults from "../../Images/noResults.svg"

const HistoryEvents = ({ events }) => {

  const sortedEvents = events
    .filter(event => event.status !== 'pending')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Check if there are no non-pending events
  if (sortedEvents.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={noResults} alt="No events found" />
        <p>No history events found</p>
      </div>
    );
  }

  return (
    <div className="h-events-list">
      {sortedEvents.map(event => (
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
