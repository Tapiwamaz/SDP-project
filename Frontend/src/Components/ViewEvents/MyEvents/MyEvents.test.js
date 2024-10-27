// // MyEvents.test.js
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import MyEvents, { fetchUserDetails, getBookingID, deleteBooking, sendNotification } from './MyEvents';
// import { collection, query, where, getDocs, doc, deleteDoc, addDoc, updateDoc} from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { db } from '../../../firebase_config';
// import ViewCards from '../ViewCards/ViewCards';
// import { toast, ToastContainer } from 'react-toastify';

// import '@testing-library/jest-dom';

// jest.mock('firebase/firestore');
// jest.mock('firebase/auth');
// jest.mock('../../../firebase_config', () => ({
//   db: jest.fn(),
//   auth: { currentUser: { uid: 'testUserId' } },
//   storage: jest.fn(),
// }));

// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//   },
// }));

// jest.mock('../ViewCards/ViewCards', () => jest.fn(() => <div>ViewCards Mock</div>));


// jest.mock('firebase/firestore', () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
//   doc: jest.fn(), 
//   deleteDoc: jest.fn(), 
//   addDoc: jest.fn(), 
//   updateDoc: jest.fn(),
// }));

// jest.mock("firebase/auth", () => ({
//     getAuth: jest.fn(),
//     GoogleAuthProvider: jest.fn(),
// }));


// // Mock the environment variable
// process.env.REACT_APP_X_API_KEY = 'test-api-key';

// // Mocking fetch API globally
// global.fetch = jest.fn();

// // Mock window.alert
// window.alert = jest.fn();

// // Sample mock events
// const mockEvents = [
//   {
//     id: 1,
//     event_id: 1,
//     user_id: '123',
//     name: 'Event 1',
//     status: 'pending',
//     location: 'Venue 1',
//     date: '2024-10-10',
//     start_time: '10:00',
//     end_time: '12:00',
//     description: 'First event description',
//   },
//   {
//     id: 2,
//     event_id: 2,
//     user_id: '124',
//     name: 'Event 2',
//     status: 'pending',
//     location: 'Venue 2',
//     date: '2024-10-11',
//     start_time: '11:00',
//     end_time: '13:00',
//     description: 'Second event description',
//   },
// ];


// // Mocking the global fetch function
// const unmockedFetch = global.fetch;

// beforeAll(() => {
//   global.fetch = jest.fn();
// });

// afterAll(() => {
//   global.fetch = unmockedFetch;
// });


// describe('fetchUserDetails', () => {
//     const userId = 'user123';
    
//     afterEach(() => {
//         jest.clearAllMocks(); 
//     });


//     test('fetches user details successfully', async () => {
//         // Mocking the Firestore query behavior
//         const mockUserData = { name: 'John Doe', user_id: 'user123' };
//         const mockDoc = {
//             id: 'docId',
//             data: jest.fn().mockReturnValue(mockUserData),
//         };
//         const mockQuerySnapshot = {
//             empty: false,
//             docs: [mockDoc],
//         };
    
//         //mock query object
//         const mockQuery = {};
    
//         // Setting up the mocks
//         collection.mockReturnValueOnce(mockQuery); // Mock the query collection
//         query.mockReturnValueOnce(mockQuery);      // Mock the query function
//         getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    
//         const userDetails = await fetchUserDetails(userId);
    
       
//         expect(collection).toHaveBeenCalledWith(db, 'Users');
//         expect(query).toHaveBeenCalledWith(mockQuery, where('user_id', '==', userId)); 
//         expect(where).toHaveBeenCalledWith('user_id', '==', userId);
//         expect(getDocs).toHaveBeenCalledWith(mockQuery); 
    
//         expect(userDetails).toEqual({ id: 'docId', ...mockUserData });
//     });


//     test('returns null when user is not found', async () => {
//         // Mocking the query snapshot to be empty
//         const mockQuerySnapshot = {
//             empty: true,
//             docs: [],
//         };

//         // Setting up the mocks
//         getDocs.mockResolvedValueOnce(mockQuerySnapshot);

//         const userDetails = await fetchUserDetails(userId);

//         expect(userDetails).toBeNull(); // Expecting null when user is not found
//     });

//     test('handles fetch error', async () => {
        
//         getDocs.mockRejectedValueOnce(new Error('Error fetching user details'));

//         const userDetails = await fetchUserDetails(userId);

//         expect(userDetails).toBeNull(); // Expecting null on error
//     });

//     test('handles fetch error and logs the error', async () => {
//         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

       
//         getDocs.mockRejectedValueOnce(new Error('Network Error'));

//         const userDetails = await fetchUserDetails(userId);
//         expect(userDetails).toBeNull();

   
//         expect(consoleSpy).toHaveBeenCalledWith('Error fetching user details:', expect.any(Error));

//         // Clean up the spy after the test
//         consoleSpy.mockRestore();
//     });
// });
