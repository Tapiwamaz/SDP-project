import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import EventSlider from './EventSlider'; // Import the component
import { auth } from '../../firebase_config';

// Mock firebase_config and react-router-dom
jest.mock('../../firebase_config', () => ({
  auth: {
    currentUser: {
      email: 'mockuser@example.com',
    },
  },
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('EventSlider Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const mockEvents = [
    {
      event_id: '1',
      name: 'Event 1',
      image_url: 'https://example.com/event1.jpg',
      date: '2023-12-01',
      start_time: '10:00 AM',
      location: 'Location 1',
      type: 'Education',
      approved: true,
    },
    {
      event_id: '2',
      name: 'Event 2',
      image_url: 'https://example.com/event2.jpg',
      date: '2023-12-02',
      start_time: '2:00 PM',
      location: 'Location 2',
      type: 'Sports',
      approved: false, // Not approved, should be filtered out
    },
  ];

  test('renders events and displays event details', async () => {
    render(<EventSlider events={mockEvents} onDisplayEvent={jest.fn()} />);

    // Check if the first event is rendered
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();

    // Ensure that the unapproved event is filtered out
    expect(screen.queryByText('Event 2')).not.toBeInTheDocument();

    // Check if the event's image is rendered
    const eventImage = screen.getByAltText('eventImage');
    expect(eventImage).toBeInTheDocument();
    expect(eventImage).toHaveAttribute('src', 'https://example.com/event1.jpg');
  });

  test('navigates to the correct event page when clicked (on phone screen)', async () => {
    // Simulate the window width as a phone screen
    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    render(<EventSlider events={mockEvents} onDisplayEvent={jest.fn()} />);

    const eventCard = screen.getByText('Event 1');
    fireEvent.click(eventCard);

    // Check if the navigate function was called with the correct route
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/event', { state: { event: expect.objectContaining({ event_id: '1' }) } });
    });
  });

  test('calls onDisplayEvent when clicked (on desktop screen)', async () => {
    const mockOnDisplayEvent = jest.fn();

    // Simulate the window width as a desktop screen
    global.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));

    render(<EventSlider events={mockEvents} onDisplayEvent={mockOnDisplayEvent} />);

    const eventCard = screen.getByText('Event 1');
    fireEvent.click(eventCard);

    // Check if the onDisplayEvent callback is triggered on desktop
    await waitFor(() => {
      expect(mockOnDisplayEvent).toHaveBeenCalledWith(expect.objectContaining({ event_id: '1' }));
    });
  });

  test('shows loading cards when events are not available', () => {
    render(<EventSlider events={null} onDisplayEvent={jest.fn()} />);

    const loadingCards = screen.getAllByTestId('loading'); // Assuming `LoadingCard` has no specific role
    expect(loadingCards.length).toBe(5); // We expect 5 loading cards to be rendered
  });

//   test('Takes to to welcome page if you are not logged in', () => {
//     const mockOnDisplayEvent = jest.fn();

//     auth.mockImplementation((callback) => {
//         callback(null); // Simulate no user being logged in
  
//       });

//       render(<EventSlider events={mockEvents} onDisplayEvent={mockOnDisplayEvent} />);
//       const eventCard = screen.getByText('Event 1');

//       fireEvent.click(eventCard);

//         expect(mockNavigate).toHaveBeenCalledWith('/welcome');

 
//   });

});
