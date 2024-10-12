import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from './EventCard';
import '@testing-library/jest-dom';

// Mock for the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ name: 'John Doe' }), // Mocked username response
//   })
// );

const mockEventOrg = {
    user_id: "user123",
    name: "Organizer Name",
    email: "organizer@example.com",
    imageURL: "organizer-image-url",
    description: "Organizer Description",
    Rates: 5,
    rating: 4,
  };

  beforeEach(() => {
global.fetch = jest.fn((url) => {
    if (url.includes("api/getUserById")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'John Doe' }),
      });
    }
    return Promise.reject(new Error("Unknown API"));
  });
});

afterEach(() => {
    jest.clearAllMocks();
  });

describe('EventCard Component', () => {

  const event = {
    event_id: 1,
    name: 'Sample Event',
    date: '2024-10-02',
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    location: 'Main Hall',
    price: 0,
    user_id: 123,
    image_url: null,
    status: 'pending',
    description: 'This is a sample event',
    type: 'Music'
  };

  const mockApprove = jest.fn();
  const mockReject = jest.fn();

  it('renders event card details correctly', () => {
    render(<EventCard event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);
    
    expect(screen.getByText('Sample Event')).toBeInTheDocument();
    expect(screen.getByText('Day - 2024-10-02')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM - 12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Main Hall')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Organizer:')).toBeInTheDocument(); // username will be updated asynchronously
  });

  it('fetches and displays username', async () => {
    render(<EventCard event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);
    
    // Check for the element containing the organizer's name after fetching it
    const usernameElement = await screen.findByTestId('organizer-name');
    
    // Ensure that the username fetched is "John Doe" (as mocked)
    expect(usernameElement.textContent).toBe('Organizer: John Doe');
  });

  it('displays fallback image when event image is missing', () => {
    render(<EventCard event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);
    
    const img = screen.getByAltText('Sample Event');
    expect(img).toHaveAttribute('src', expect.stringContaining('depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg'));
  });

  it('calls onApprove and onReject when buttons are clicked', () => {
    render(<EventCard event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);

    const approveButton = screen.getByText('Approve');
    const rejectButton = screen.getByText('Reject');

    fireEvent.click(approveButton);
    fireEvent.click(rejectButton);

    expect(mockApprove).toHaveBeenCalledWith(event.event_id);
    expect(mockReject).toHaveBeenCalledWith(event.event_id);
  });

  it('opens the description popup when the description button is clicked', () => {
    render(<EventCard event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);

    const descriptionButton = screen.getByText('Description');
    fireEvent.click(descriptionButton);

    expect(screen.getByText('This is a sample event')).toBeInTheDocument();
  });

  it('does not render approval buttons if status is not pending', () => {
    const approvedEvent = { ...event, status: 'approved' };
    render(<EventCard event={approvedEvent} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);

    expect(screen.queryByText('Approve')).toBeNull();
    expect(screen.queryByText('Reject')).toBeNull();
    expect(screen.getByText('Status: Approved')).toBeInTheDocument();
  });
});
