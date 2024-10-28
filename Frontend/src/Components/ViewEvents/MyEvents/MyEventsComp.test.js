import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyEvents from './MyEvents';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase_config';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../../../firebase_config', () => ({
  db: jest.fn(),
  storage: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
    auth: { currentUser: { uid: 'testUserId' } },
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    onAuthStateChanged: jest.fn((auth, callback) => {
        callback({ uid: 'testUser' }); // Call the callback with a user object
        return jest.fn(); // Return the unsubscribe function
      }),
}));

jest.mock('react-toastify');

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(), 
  deleteDoc: jest.fn(), 
  addDoc: jest.fn(), 
  updateDoc: jest.fn(),
}));


// jest.mock('../ViewCards/ViewCards', () => jest.fn(() => <div>ViewCards Mock</div>));

// jest.mock('../ViewCards/ViewCards', () => (props) => (
//     <div data-testid="view-card">
//         {props.events && props.events.map(event => <div key={event.id}>{event.name}</div>)}
//     </div>
// ));

jest.mock('../ViewCards/ViewCards', () => (props) => (
    <div data-testid="view-card">
        <button data-testid="cancel-button-event1">Cancel Event</button> 
        {props.events.length} ViewCards Mock
    </div>
));

describe('MyEvents Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', async () => {
        // Mock the onAuthStateChanged to simulate user authentication
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback({ uid: 'testUser' });
            return jest.fn(); // Unsubscribe function
        });
    
        // Mock the getDocs method to avoid fetching events during the test
        getDocs.mockResolvedValueOnce({ docs: [] });
    
        render(<MyEvents />);
    
        // Assert that the loading state is rendered initially
        expect(screen.getByText(/loading events.../i)).toBeInTheDocument();
    
        // Optionally wait for the loading to finish
        await waitFor(() => {
            expect(screen.queryByText(/loading events.../i)).not.toBeInTheDocument();
        });
    });
    

    test('displays no events message when there are no events', async () => {
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback({ uid: 'testUser' });
            return jest.fn(); // Unsubscribe function
        });
    
        // Mock the getDocs method to return an empty array
        getDocs.mockResolvedValueOnce({ docs: [] });
    
        render(<MyEvents />);
    
        // Wait for the loading to finish and assert the no events message
        await waitFor(() => {
            expect(screen.queryByText(/loading events.../i)).not.toBeInTheDocument(); // Ensure loading state is not present
            expect(screen.getByText(/no events found/i)).toBeInTheDocument(); // Now check for "No events found"
        });
    
        expect(screen.getByAltText(/no events found/i)).toBeInTheDocument(); // Optional: Check if the image is also present
    });


    test('fetches and displays events', async () => {
        // Mock user authentication
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback({ uid: 'testUser' });
            return jest.fn(); // Return the unsubscribe function
        });

      

        render(<MyEvents />); 

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText(/loading events.../i)).not.toBeInTheDocument(); // Ensure loading state is not present
        });



        // Verify Firestore calls
        expect(getDocs).toHaveBeenCalled(); // Ensure getDocs was called
        expect(collection).toHaveBeenCalledWith(db, 'Events'); // Ensure collection is called with the correct parameters

    });
    

});