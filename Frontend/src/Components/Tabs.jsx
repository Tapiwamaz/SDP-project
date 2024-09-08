import React, { useState } from 'react';
import PendingEvents from './PendingEvents';
import HistoryEvents from './HistoryEvents';

const Tabs = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Summit', date: '2024-09-10', time: '10:00 AM', location: 'WSS 5', organizer: 'AWS Club', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending' },
    { id: 2, title: 'Basketball Match', date: '2024-09-12', time: '2:00 PM', location: 'Hall 29', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending' },
    { id: 3, title: 'Notes & Melodies', date: '2024-10-20', time: '8:00 PM', location: 'Origins Centre', organizer: 'Wits Choir', image: 'https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending' },
    { id: 4, title: 'Music Festival', date: '2024-11-25', time: '4:00 PM', location: 'Sturrock Park', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/6398745/pexels-photo-6398745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending' },
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
