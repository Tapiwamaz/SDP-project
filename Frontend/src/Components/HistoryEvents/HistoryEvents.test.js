import React from 'react';
import { render, screen } from '@testing-library/react';
import HistoryEvents from './HistoryEvents';
import '@testing-library/jest-dom'; // for the custom matchers
import noResults from "../../Images/noResults.svg";

// Mock EventCard component
jest.mock('../EventCard/EventCard', () => ({ event }) => (
  <div data-testid="event-card">{event.name}</div>
));

describe('HistoryEvents Component', () => {
  const events = [
    { id: 1, name: 'Event 1', date: '2024-10-01', status: 'approved' },
    { id: 2, name: 'Event 2', date: '2024-09-25', status: 'rejected' },
    { id: 3, name: 'Event 3', date: '2024-09-30', status: 'pending' },
  ];

  it('renders "No history events found" message if no non-pending events exist', () => {
    render(<HistoryEvents events={[]} />);

    const noEventsImage = screen.getByAltText('No events found');
    const noEventsMessage = screen.getByText('No history events found');

    expect(noEventsImage).toBeInTheDocument();
    expect(noEventsImage).toHaveAttribute('src', noResults);
    expect(noEventsMessage).toBeInTheDocument();
  });

  it('filters out pending events and displays only non-pending events', () => {
    render(<HistoryEvents events={events} />);

    const eventCards = screen.getAllByTestId('event-card');
    
    expect(eventCards).toHaveLength(2); // Only two non-pending events
    expect(screen.queryByText('Event 3')).toBeNull(); // 'Event 3' (pending) should not be displayed
  });

  it('sorts the events by date in descending order', () => {
    render(<HistoryEvents events={events} />);

    const eventCards = screen.getAllByTestId('event-card');

    expect(eventCards[0]).toHaveTextContent('Event 1'); // Most recent event first (2024-10-01)
    expect(eventCards[1]).toHaveTextContent('Event 2'); // Older event (2024-09-25)
  });

  it('renders event cards for non-pending events', () => {
    render(<HistoryEvents events={events} />);

    const event1 = screen.getByText('Event 1');
    const event2 = screen.getByText('Event 2');

    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });

  it('renders fallback image and message when no non-pending events are found', () => {
    const pendingEvents = [
      { id: 1, name: 'Event 1', date: '2024-10-01', status: 'pending' },
      { id: 2, name: 'Event 2', date: '2024-09-25', status: 'pending' }
    ];
    
    render(<HistoryEvents events={pendingEvents} />);

    expect(screen.getByAltText('No events found')).toBeInTheDocument();
    expect(screen.getByText('No history events found')).toBeInTheDocument();
  });
});
