import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from './Tabs';  // Adjust the path based on your structure
import { db } from "../../firebase_config";
import { collection, query, where, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { fetchEvents, updateEventDB, fetchUserDetails, sendNotification } from "./Tabs";

// Mock Firebase methods
jest.mock('../../firebase_config', () => ({
  db: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  //query: jest.fn().mockImplementation((...args) => args), // mock query to return the arguments it is called with
  //where: jest.fn().mockImplementation(() => 'mockWhereClause'), // mock where to return a string for simplicity
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  addDoc: jest.fn(),
}));

// Mock other components and API calls
jest.mock('../PendingEvents/PendingEvents', () => (props) => (
  <div data-testid="PendingEvents">{props.events.length} Pending Events</div>
));
jest.mock('../HistoryEvents/HistoryEvents', () => (props) => (
  <div data-testid="HistoryEvents">{props.events.length} History Events</div>
));



// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);




describe('Tabs Component', () => {

  beforeEach(() => {
    fetch.mockClear();
    collection.mockClear();
    query.mockClear();
    where.mockClear();
    getDocs.mockClear();
    updateDoc.mockClear();
    addDoc.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears mock data
    jest.resetAllMocks(); // Resets all mock implementations
  });

  it('renders Pending and History tabs', () => {
    render(<Tabs />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  // it('switches between Pending and History tabs', async () => {
  //   render(<Tabs />);
    
  //   // Initially, pending tab is active
  //   expect(screen.getByText('Pending').classList.contains('active')).toBe(true);
  //   expect(screen.getByTestId('PendingEvents')).toBeInTheDocument();
    
  //   // Switch to history tab
  //   fireEvent.click(screen.getByText('History'));
  //   expect(screen.getByText('History').classList.contains('active')).toBe(true);
  //   expect(screen.getByTestId('HistoryEvents')).toBeInTheDocument();
  // });

  it('calls fetchEvents on component mount', async () => {
    render(<Tabs />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/events', expect.anything());
    });
  });
  
});



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





describe('sendNotification', () => {
  const mockOrganizerId = 'organizer123';
  const mockEventId = 'event456';
  const mockNotificationType = 'approved';
  const mockMessage = 'Your event has been approved.';
  const mockName = 'John Doe';
  const mockImageUrl = 'https://example.com/image.png';

  const mockNotificationData = {
    notification_id: expect.any(String), // ID based on Date.now()
    time: expect.any(String),            // Timestamp format YYYY-MM-DDTHH:mm:ss
    notification_type: mockNotificationType,
    message: mockMessage,
    event_id: mockEventId,
    organizer_id: mockOrganizerId,
    name: mockName,
    image_url: mockImageUrl,
  };

  it('should send a notification and call addDoc with correct data', async () => {
    // Mock the collection reference to be consistent
    const mockCollectionRef = {};
    collection.mockReturnValueOnce(mockCollectionRef);

    // Mock addDoc to resolve successfully
    addDoc.mockResolvedValueOnce({});

    // Call the function
    await sendNotification(mockOrganizerId, mockEventId, mockNotificationType, mockMessage, mockName, mockImageUrl);

    // Check if collection was called with the correct path
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'Notifications');

    // Check if addDoc was called with the correct collection reference and data
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, expect.objectContaining(mockNotificationData));
  });

  it('should log an error if addDoc throws an error', async () => {
    // Mock addDoc to throw an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    addDoc.mockRejectedValueOnce(new Error('Firestore error'));

    await sendNotification(mockOrganizerId, mockEventId, mockNotificationType, mockMessage, mockName, mockImageUrl);

    expect(consoleSpy).toHaveBeenCalledWith('Error sending notification:', expect.any(Error));

    // Restore the console error spy
    consoleSpy.mockRestore();
  });
});




describe('updateEventDB', () => {
  const mockEvent = {
    event_id: 'event123',
    name: 'Updated Event',
    date: '2024-10-13',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('should update event successfully', async () => {
    const mockDocRef = { ref: 'mockRef' };
    const mockCollectionRef = { id: 'mockCollection' }; // Mock collection reference
    const mockQuerySnapshot = {
      forEach: jest.fn().mockImplementation((callback) => callback({ ref: mockDocRef })),
    };
  
    // Mock Firestore methods
    collection.mockReturnValueOnce(mockCollectionRef); // Return mock collection reference
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    where.mockReturnValueOnce('mockWhereClause'); // Return something valid for the where condition
    query.mockReturnValueOnce('mockQuery'); // Return mock query for the query function
  
    // Call the function to update the event
    await updateEventDB(mockEvent);
  
    // Assertions
    expect(collection).toHaveBeenCalledWith(db, 'Events'); // Ensure the collection is 'Events'
    expect(where).toHaveBeenCalledWith('event_id', '==', mockEvent.event_id); // Ensure where is called with correct arguments
    expect(query).toHaveBeenCalledWith(mockCollectionRef, 'mockWhereClause'); // Ensure query is called with the collection reference and where clause
    expect(getDocs).toHaveBeenCalledWith('mockQuery'); // Ensure getDocs is called with the query
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
      name: mockEvent.name,
      date: mockEvent.date,
      event_id: mockEvent.event_id, // Add event_id to the expected object
    }); // Ensure updateDoc is called with the correct reference and data
  });


  test('should handle Firestore error and throw custom error', async () => {
    // Mock console.error to track error handling
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock Firestore error
    getDocs.mockRejectedValueOnce(new Error('Firestore error'));

    // Call the function and expect it to throw the custom error
    await expect(updateEventDB(mockEvent)).rejects.toThrow('Failed to update event. Please try again.');

    // Ensure error handling works correctly
    expect(consoleErrorMock).toHaveBeenCalledWith('Error updating event:', expect.any(Error));

    // Restore console.error after the test
    consoleErrorMock.mockRestore();
  });
});

describe('fetchEvents', () => {
  const mockSetEvents = jest.fn();

  it('should fetch events successfully and update the state', async () => {
      // Mock response data
      const mockData = [
          { event_id: 'event1', user_id: 'user1', name: 'Event 1', price: 0 },
          { event_id: 'event2', user_id: 'user2', name: 'Event 2', price: 50 },
      ];

      // Mock the fetch call
      global.fetch = jest.fn(() =>
          Promise.resolve({
              ok: true,
              json: () => Promise.resolve(mockData),
          })
      );

      await fetchEvents(mockSetEvents);

      // Expect fetch to have been called with the correct URL
      expect(fetch).toHaveBeenCalledWith('/api/events', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Check if setEvents is called with the updated events
      expect(mockSetEvents).toHaveBeenCalledWith(mockData);
  });

  it('should handle fetch error and not update the state', async () => {
      // Mock the fetch call to simulate an error response
      global.fetch = jest.fn(() =>
          Promise.resolve({
              ok: false,
              status: 404,
          })
      );

      const result = await fetchEvents(mockSetEvents);

      // Expect fetch to have been called
      expect(fetch).toHaveBeenCalledWith('/api/events', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Check that setEvents is not called due to error
      expect(mockSetEvents).not.toHaveBeenCalled();

      // Expect the function to return null in case of an error
      expect(result).toBeNull();
  });

  it('should handle network errors', async () => {
      // Mock the fetch call to throw an error
      global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

      const result = await fetchEvents(mockSetEvents);

      // Expect fetch to have been called
      expect(fetch).toHaveBeenCalledWith('/api/events', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Check that setEvents is not called due to error
      expect(mockSetEvents).not.toHaveBeenCalled();

      // Expect the function to return null in case of an error
      expect(result).toBeNull();
  });
});


