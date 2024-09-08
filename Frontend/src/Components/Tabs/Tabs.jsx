import React, { useState } from 'react';
import PendingEvents from '../PendingEvents/PendingEvents';
import HistoryEvents from '../HistoryEvents/HistoryEvents';
import './Tabs.css';
import Header from '../Header/Header';
import AsideDesktop from '../AsideDesktop/AsideDesktop';

const Tabs = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Summit', date: '2024-09-10', startTime: '10:00 AM', endTime: '12:00 PM', location: 'WSS 5', organizer: 'AWS Club', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending', category: 'IT' },
    { id: 2, title: 'Basketball Match', date: '2024-09-12', startTime: '2:00 PM', endTime: '4:00 PM', location: 'Hall 29', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending', category: 'Sports' },
    { id: 3, title: 'Notes & Melodies', date: '2024-10-20', startTime: '8:00 PM', endTime: '10:00 PM', location: 'Origins Centre', organizer: 'Wits Choir', image: 'https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: true, status: 'pending', category: 'Entertainment' },
    { id: 4, title: 'Music Festival', date: '2024-11-25', startTime: '4:00 PM', endTime: '8:00 PM', location: 'Sturrock Park', organizer: 'Wits SRC', image: 'https://images.pexels.com/photos/6398745/pexels-photo-6398745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isFree: false, status: 'pending', category: 'Entertainment' },
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
      <Header></Header>
      <AsideDesktop></AsideDesktop>
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
