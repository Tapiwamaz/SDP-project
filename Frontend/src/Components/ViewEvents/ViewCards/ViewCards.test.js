// ViewCards.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewCards from './ViewCards';
import placeholderImage from './depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg';

// Mock useNavigate from react-router
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

describe('ViewCards Component', () => {
  const mockEvent = {
    id: '1',
    name: 'Sample Event',
    date: '2024-10-28',
    start_time: '10:00 AM',
    end_time: '02:00 PM',
    location: 'Sample Location',
    capacity: 100,
    ticket_count: 50,
    status: 'approved',
    image_url: '', // Simulate no image
  };

  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders event details correctly', () => {
    render(
      <MemoryRouter>
        <ViewCards event={mockEvent} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sample Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Day - Monday, Oct 28/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM - 02:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket Count: 50/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: approved/i)).toHaveStyle('color: green');
  });

  test('renders placeholder image if image_url is missing', () => {
    render(
      <MemoryRouter>
        <ViewCards event={mockEvent} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', placeholderImage);
  });

  test('handles Edit Event button functionality based on status', () => {
    render(
      <MemoryRouter>
        <ViewCards event={{ ...mockEvent, status: 'approved' }} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    const editButton = screen.getByText(/Edit Event/i);
    expect(editButton).toBeInTheDocument();
    expect(editButton).not.toHaveStyle('opacity: 0.3');
  });

  test('disables Edit Event button when status is rejected or cancelled', () => {
    render(
      <MemoryRouter>
        <ViewCards event={{ ...mockEvent, status: 'rejected' }} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    const editButton = screen.getByText(/Edit Event/i);
    expect(editButton).toHaveStyle('opacity: 0.3');
  });

  test('handles Cancel Event button functionality based on status', () => {
    render(
      <MemoryRouter>
        <ViewCards event={{ ...mockEvent, status: 'approved' }} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    const cancelButton = screen.getByText(/Cancel Event/i);
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).not.toHaveStyle('opacity: 0.3');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledWith('1');
  });

  test('disables Cancel Event button when status is rejected or cancelled', () => {
    render(
      <MemoryRouter>
        <ViewCards event={{ ...mockEvent, status: 'cancelled' }} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    const cancelButton = screen.getByText(/Cancel Event/i);
    expect(cancelButton).toHaveStyle('opacity: 0.3');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  test('formats date and time correctly', () => {
    render(
      <MemoryRouter>
        <ViewCards event={mockEvent} onCancel={mockOnCancel} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Day - Monday, Oct 28/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM - 02:00 PM/i)).toBeInTheDocument();
  });
});
