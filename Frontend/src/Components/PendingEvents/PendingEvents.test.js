import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PendingEvents from './PendingEvents';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase_config';

// Mocking external API calls and Firestore
jest.mock('../../firebase_config', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

// Mocking EventCard
jest.mock('../../', () => () => <div>Mocked EventCard</div>);

// Mock the environment variable
process.env.REACT_APP_X_API_KEY = 'test-api-key';

// Mocking fetch API globally
global.fetch = jest.fn();

// Mock window.alert
window.alert = jest.fn();

// Sample mock events
const mockEvents = [
  {
    id: 1,
    event_id: 1,
    user_id: '123',
    name: 'Event 1',
    status: 'pending',
    location: 'Venue 1',
    date: '2024-10-10',
    start_time: '10:00',
    end_time: '12:00',
    description: 'First event description',
  },
  {
    id: 2,
    event_id: 2,
    user_id: '124',
    name: 'Event 2',
    status: 'pending',
    location: 'Venue 2',
    date: '2024-10-11',
    start_time: '11:00',
    end_time: '13:00',
    description: 'Second event description',
  },
];

// Mock handlers
const mockHandleApprove = jest.fn();
const mockHandleReject = jest.fn();

describe('PendingEvents Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test

    // Mock Firestore methods
    collection.mockReturnValue('UsersCollection');
    where.mockReturnValue('WhereClause');
    query.mockReturnValue('QueryObject');

    // Mock getDocs to return user data
    const mockUserDocs = {
      empty: false,
      docs: [
        { id: 'user123', data: () => ({ email: 'testuser1@example.com' }) },
        { id: 'user124', data: () => ({ email: 'testuser2@example.com' }) },
      ],
    };
    getDocs.mockResolvedValue(mockUserDocs);

    // Mock fetch calls from EventCard and PendingEvents
    global.fetch.mockImplementation((url, options) => {
     if (url.startsWith('https://wits-infrastructure-management.web.app/api/bookings/findByField')) {
        // Mock checkVenueAvailability
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]), // Venue available
        });
      } else if (url === 'https://wits-infrastructure-management.web.app/api/bookings/create') {
        // Mock createBooking
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }
      // Default mock response for any other endpoints
      return Promise.resolve({
        ok: false,
        status: 404,
      });
    });
  });

  test('renders pending events', () => {
    render(
      <PendingEvents
        events={mockEvents}
        handleApprove={mockHandleApprove}
        handleReject={mockHandleReject}
      />
    );

    const event1 = screen.getByText('Event 1');
    const event2 = screen.getByText('Event 2');

    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });

  test('renders no pending events message when no events are pending', () => {
    render(
      <PendingEvents
        events={[]}
        handleApprove={mockHandleApprove}
        handleReject={mockHandleReject}
      />
    );

    expect(screen.getByText('No pending events found')).toBeInTheDocument();
    expect(screen.getByAltText('No events found')).toBeInTheDocument(); // Image alt text
  });

  test('handles event approval', async () => {
    render(
      <>
        <PendingEvents
          events={mockEvents}
          handleApprove={mockHandleApprove}
          handleReject={mockHandleReject}
        />
        <ToastContainer />
      </>
    );

    // Click the approve button for the first event
    const approveButtons = screen.getAllByText(/Approve/i);
    expect(approveButtons.length).toBeGreaterThan(0); // Ensure there is at least one approve button
    const approveButton = approveButtons[0];
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(mockHandleApprove).toHaveBeenCalledWith(mockEvents[0].event_id);
    });

    // Check if the success message is displayed
    expect(screen.getByText('Event successfully approved!')).toBeInTheDocument();
  });


    test('handles event rejection with reason', async () => {
    render(<> <ToastContainer /> <PendingEvents events={mockEvents} handleApprove={mockHandleApprove} handleReject={mockHandleReject} />  </>);

    const rejectInputs = screen.getAllByPlaceholderText('Enter reject reason');
    expect(rejectInputs.length).toBeGreaterThan(0); // Ensure there is at least one reject input

    const firstRejectInput = rejectInputs[0];
    fireEvent.change(firstRejectInput, { target: { value: 'Duplicate event' } });

    const rejectButtons = screen.getAllByText(/Reject/i);
    expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

    const firstRejectButton = rejectButtons[0];
    fireEvent.click(firstRejectButton);

    await waitFor(() => {
      expect(mockHandleReject).toHaveBeenCalledWith(mockEvents[0].event_id, 'Duplicate event');
    });

    expect(screen.getByText('Event successfully rejected!')).toBeInTheDocument();
  });


    test('displays an alert when rejection reason is not provided', () => {
    window.alert = jest.fn();  // Mock alert function

    render(<> <ToastContainer /> <PendingEvents events={mockEvents} handleApprove={mockHandleApprove} handleReject={mockHandleReject} />  </>);

    const rejectButtons = screen.getAllByText(/Reject/i);
    expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

    const firstRejectButton = rejectButtons[0];
    fireEvent.click(firstRejectButton);

    expect(window.alert).toHaveBeenCalledWith('Please provide a reason for rejection');
  });
});




// import React from 'react';
// import '@testing-library/jest-dom';
import { checkVenueAvailability, createBooking, fetchUserDetails} from './PendingEvents';

  
jest.mock("../../firebase_config", () => ({
    db: jest.fn(),
    storage: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
}));





// Mocking the global fetch function
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('checkVenueAvailability', () => {
  test('returns true when venue is available', async () => {
    // Mocking fetch to return an empty array
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    const isAvailable = await checkVenueAvailability('venue123', '2024-10-13', '10:00', '12:00');
    expect(isAvailable).toBe(true);
  });

  test('returns false when venue is not available', async () => {
    // Mocking fetch to return a non-empty array
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([{ id: 'booking1' }]),
    });

    const isAvailable = await checkVenueAvailability('venue123', '2024-10-13', '10:00', '12:00');
    expect(isAvailable).toBe(false);
  });

  test('handles fetch error', async () => {
    // Mocking fetch to throw an error
    global.fetch.mockRejectedValueOnce(new Error('Error fetching venue availability'));

    const isAvailable = await checkVenueAvailability('venue123', '2024-10-13', '10:00', '12:00');
    expect(isAvailable).toBe(false);
  });

test('handles fetch error and logs the error', async () => {
    // Spy on console.error to track error logging
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Mock fetch to throw an error, triggering the catch block
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));
  
    // Call the function and expect it to return false
    const isAvailable = await checkVenueAvailability('venue123', '2024-10-13', '10:00', '12:00');
    expect(isAvailable).toBe(false);
  
    // Check that console.error was called with the right message and error
    expect(consoleSpy).toHaveBeenCalledWith('Error checking venue availability:', expect.any(Error));
  

    consoleSpy.mockRestore();
  });
  
});


describe('createBooking', () => {
    const venueBooker = 'user123@example.com';
    const venueID = 'venue123';
    const bookingDate = '2024-10-13';
    const startTime = '10:00';
    const endTime = '12:00';
    const bookingDescription = 'Test booking description';

    test('creates a booking successfully', async () => {
        // Mocking fetch to return a successful response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ id: 'booking1' }),
        });

        const result = await createBooking(venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription);
        expect(result).toEqual({ id: 'booking1' });
    });

    test('handles error when creating a booking fails', async () => {
        // Mocking fetch to return an error response
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
        });

        const result = await createBooking(venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription);
        expect(result).toBeNull();
    });

    test('handles fetch error', async () => {
        // Mocking fetch to throw an error
        global.fetch.mockRejectedValueOnce(new Error('Error creating booking'));

        const result = await createBooking(venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription);
        expect(result).toBeNull();
    });

    test('handles fetch error and logs the error', async () => {
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

       
        global.fetch.mockRejectedValueOnce(new Error('Network Error'));

       
        const result = await createBooking(venueBooker, venueID, bookingDate, startTime, endTime, bookingDescription);
        expect(result).toBeNull();

        
        expect(consoleSpy).toHaveBeenCalledWith('Error creating booking:', expect.any(Error));

        // Clean up the spy after the test
        consoleSpy.mockRestore();
    });
});

//////////////////

describe('fetchUserDetails', () => {
    const userId = 'user123';
    
    afterEach(() => {
        jest.clearAllMocks(); 
    });


    test('fetches user details successfully', async () => {
        // Mocking the Firestore query behavior
        const mockUserData = { name: 'John Doe', user_id: 'user123' };
        const mockDoc = {
            id: 'docId',
            data: jest.fn().mockReturnValue(mockUserData),
        };
        const mockQuerySnapshot = {
            empty: false,
            docs: [mockDoc],
        };
    
        //mock query object
        const mockQuery = {};
    
        // Setting up the mocks
        collection.mockReturnValueOnce(mockQuery); // Mock the query collection
        query.mockReturnValueOnce(mockQuery);      // Mock the query function
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    
        const userDetails = await fetchUserDetails(userId);
    
       
        expect(collection).toHaveBeenCalledWith(db, 'Users');
        expect(query).toHaveBeenCalledWith(mockQuery, where('user_id', '==', userId)); 
        expect(where).toHaveBeenCalledWith('user_id', '==', userId);
        expect(getDocs).toHaveBeenCalledWith(mockQuery); 
    
        expect(userDetails).toEqual({ id: 'docId', ...mockUserData });
    });


    test('returns null when user is not found', async () => {
        // Mocking the query snapshot to be empty
        const mockQuerySnapshot = {
            empty: true,
            docs: [],
        };

        // Setting up the mocks
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);

        const userDetails = await fetchUserDetails(userId);

        expect(userDetails).toBeNull(); // Expecting null when user is not found
    });

    test('handles fetch error', async () => {
        
        getDocs.mockRejectedValueOnce(new Error('Error fetching user details'));

        const userDetails = await fetchUserDetails(userId);

        expect(userDetails).toBeNull(); // Expecting null on error
    });

    test('handles fetch error and logs the error', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

       
        getDocs.mockRejectedValueOnce(new Error('Network Error'));

        const userDetails = await fetchUserDetails(userId);
        expect(userDetails).toBeNull();

   
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching user details:', expect.any(Error));

        // Clean up the spy after the test
        consoleSpy.mockRestore();
    });
});
