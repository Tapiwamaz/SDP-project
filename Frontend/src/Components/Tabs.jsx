import React, { useState } from 'react';
import PendingEvents from './PendingEvents';
import HistoryEvents from './HistoryEvents';

const Tabs = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', date: '2024-09-10', time: '10:00 AM', location: 'Location 1', organizer: 'Organizer 1', image: 'url-to-image', status: 'pending' },
    { id: 2, title: 'Event 2', date: '2024-09-12', time: '2:00 PM', location: 'Location 2', organizer: 'Organizer 2', image: 'url-to-image', status: 'pending' },
    { id: 3, title: 'Event 3', date: '2024-08-20', time: '12:00 PM', location: 'Location 3', organizer: 'Organizer 3', image: 'url-to-image', status: 'approved' },
    { id: 4, title: 'Event 4', date: '2024-08-25', time: '4:00 PM', location: 'Location 4', organizer: 'Organizer 4', image: 'url-to-image', status: 'rejected' },
  ]);

  const handleApprove = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'approved' } : event));
  };

  const handleReject = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'rejected' } : event));
  };

  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active' : ''}>
          Pending
        </button>
        <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
          History
        </button>
      </div>
      {activeTab === 'pending' ? (
        <PendingEvents events={events} onApprove={handleApprove} onReject={handleReject} />
      ) : (
        <HistoryEvents events={events} />
      )}
    </div>
  );
};

export default Tabs;
