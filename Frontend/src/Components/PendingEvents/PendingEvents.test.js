// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import PendingEvents from './PendingEvents';
// import '@testing-library/jest-dom';
// import { ToastContainer } from 'react-toastify';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase_config';

// // Mocking external API calls and Firestore
// jest.mock('../../firebase_config', () => ({
//   db: {},
// }));

// jest.mock('firebase/firestore', () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

// // Mocking EventCard
// jest.mock('../../', () => () => <div>Mocked EventCard</div>);

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

// // Mock handlers
// const mockHandleApprove = jest.fn();
// const mockHandleReject = jest.fn();

// describe('PendingEvents Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Reset mocks before each test

//     // Mock Firestore methods
//     collection.mockReturnValue('UsersCollection');
//     where.mockReturnValue('WhereClause');
//     query.mockReturnValue('QueryObject');

//     // Mock getDocs to return user data
//     const mockUserDocs = {
//       empty: false,
//       docs: [
//         { id: 'user123', data: () => ({ email: 'testuser1@example.com' }) },
//         { id: 'user124', data: () => ({ email: 'testuser2@example.com' }) },
//       ],
//     };
//     getDocs.mockResolvedValue(mockUserDocs);

//     // Mock fetch calls from EventCard and PendingEvents
//     global.fetch.mockImplementation((url, options) => {
//      if (url.startsWith('https://wits-infrastructure-management.web.app/api/bookings/findByField')) {
//         // Mock checkVenueAvailability
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve([]), // Venue available
//         });
//       } else if (url === 'https://wits-infrastructure-management.web.app/api/bookings/create') {
//         // Mock createBooking
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true }),
//         });
//       }
//       // Default mock response for any other endpoints
//       return Promise.resolve({
//         ok: false,
//         status: 404,
//       });
//     });
//   });

//   test('renders pending events', () => {
//     render(
//       <PendingEvents
//         events={mockEvents}
//         handleApprove={mockHandleApprove}
//         handleReject={mockHandleReject}
//       />
//     );

//     const event1 = screen.getByText('Event 1');
//     const event2 = screen.getByText('Event 2');

//     expect(event1).toBeInTheDocument();
//     expect(event2).toBeInTheDocument();
//   });

//   test('renders no pending events message when no events are pending', () => {
//     render(
//       <PendingEvents
//         events={[]}
//         handleApprove={mockHandleApprove}
//         handleReject={mockHandleReject}
//       />
//     );

//     expect(screen.getByText('No pending events found')).toBeInTheDocument();
//     expect(screen.getByAltText('No events found')).toBeInTheDocument(); // Image alt text
//   });

//   test('handles event approval and venue availability', async () => {
//     render(
//       <>
//         <PendingEvents
//           events={mockEvents}
//           handleApprove={mockHandleApprove}
//           handleReject={mockHandleReject}
//         />
//         <ToastContainer />
//       </>
//     );

//     // Click the approve button for the first event
//     const approveButtons = screen.getAllByText(/Approve/i);
//     expect(approveButtons.length).toBeGreaterThan(0); // Ensure there is at least one approve button
//     const approveButton = approveButtons[0];
//     fireEvent.click(approveButton);

//     // Wait for the fetch to be called for venue availability and booking creation
//     await waitFor(() => {
//       // Check fetch calls for venue availability and booking creation
//       expect(global.fetch).toHaveBeenCalledWith(
//         `https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${mockEvents[0].location}&bookingDate=${mockEvents[0].date}&bookingStartTime=${mockEvents[0].start_time}&bookingEndTime=${mockEvents[0].end_time}`,
//         {
//           method: 'GET',
//           headers: {
//             'X-API-KEY': 'test-api-key',
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       expect(global.fetch).toHaveBeenCalledWith(
//         'https://wits-infrastructure-management.web.app/api/bookings/create',
//         {
//           method: 'POST',
//           headers: {
//             'X-API-KEY': 'test-api-key',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             venueBooker: 'testuser1@example.com',
//             venueID: mockEvents[0].location,
//             bookingDate: mockEvents[0].date,
//             bookingStartTime: mockEvents[0].start_time,
//             bookingEndTime: mockEvents[0].end_time,
//             bookingDescription: mockEvents[0].description,
//           }),
//         }
//       );
//     });

//     // Ensure handleApprove is called with the correct event ID after booking success
//     await waitFor(() => {
//       expect(mockHandleApprove).toHaveBeenCalledWith(mockEvents[0].event_id);
//     });

//     // Check if the success message is displayed
//     expect(screen.getByText('Event successfully approved!')).toBeInTheDocument();
//   });


//     test('handles event rejection with reason', async () => {
//     render(<> <ToastContainer /> <PendingEvents events={mockEvents} handleApprove={mockHandleApprove} handleReject={mockHandleReject} />  </>);

//     const rejectInputs = screen.getAllByPlaceholderText('Enter reject reason');
//     expect(rejectInputs.length).toBeGreaterThan(0); // Ensure there is at least one reject input

//     const firstRejectInput = rejectInputs[0];
//     fireEvent.change(firstRejectInput, { target: { value: 'Duplicate event' } });

//     const rejectButtons = screen.getAllByText(/Reject/i);
//     expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

//     const firstRejectButton = rejectButtons[0];
//     fireEvent.click(firstRejectButton);

//     await waitFor(() => {
//       expect(mockHandleReject).toHaveBeenCalledWith(mockEvents[0].event_id, 'Duplicate event');
//     });

//     expect(screen.getByText('Event successfully rejected!')).toBeInTheDocument();
//   });


//     test('displays an alert when rejection reason is not provided', () => {
//     window.alert = jest.fn();  // Mock alert function

//     render(<> <ToastContainer /> <PendingEvents events={mockEvents} handleApprove={mockHandleApprove} handleReject={mockHandleReject} />  </>);

//     const rejectButtons = screen.getAllByText(/Reject/i);
//     expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

//     const firstRejectButton = rejectButtons[0];
//     fireEvent.click(firstRejectButton);

//     expect(window.alert).toHaveBeenCalledWith('Please provide a reason for rejection');
//   });
// });



// PendingEvents.test.js

// import React from 'react';

// // 1. Set environment variables before importing any components
// process.env.REACT_APP_X_API_KEY = 'test-api-key';

// // 2. Correctly mock EventCard using the exact path from the component
// jest.mock('../EventCard/EventCard', () => () => <div>Mocked EventCard</div>);

// // 3. Mock Firestore and its methods
// jest.mock('../../firebase_config', () => ({
//   db: {},
// }));

// jest.mock('firebase/firestore', () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

// // 4. Import the rest of the necessary modules after setting up mocks
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import PendingEvents from './PendingEvents';
// import '@testing-library/jest-dom';
// import { ToastContainer } from 'react-toastify';

// // 5. Mocking fetch API globally
// global.fetch = jest.fn();

// // 6. Mock window.alert to prevent errors during tests
// window.alert = jest.fn();

// // 7. Sample mock events data
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

// // 8. Mock handler functions
// const mockHandleApprove = jest.fn();
// const mockHandleReject = jest.fn();

// describe('PendingEvents Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Reset mocks before each test

//     // Mock Firestore methods
//     const { collection, query, where, getDocs } = require('firebase/firestore');
//     collection.mockReturnValue('UsersCollection');
//     where.mockReturnValue('WhereClause');
//     query.mockReturnValue('QueryObject');

//     // Mock getDocs to return user data
//     const mockUserDocs = {
//       empty: false,
//       docs: [
//         { id: 'user123', data: () => ({ email: 'testuser1@example.com' }) },
//         { id: 'user124', data: () => ({ email: 'testuser2@example.com' }) },
//       ],
//     };
//     getDocs.mockResolvedValue(mockUserDocs);

//     // Mock fetch calls from PendingEvents
//     global.fetch.mockImplementation((url, options) => {
//       if (url.startsWith('https://wits-infrastructure-management.web.app/api/bookings/findByField')) {
//         // Mock checkVenueAvailability
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve([]), // Venue available
//         });
//       } else if (url === 'https://wits-infrastructure-management.web.app/api/bookings/create') {
//         // Mock createBooking
//         return Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true }),
//         });
//       }
//       // Default mock response for any other endpoints
//       return Promise.resolve({
//         ok: false,
//         status: 404,
//       });
//     });
//   });

//   test('renders pending events', () => {
//     render(
//       <PendingEvents
//         events={mockEvents}
//         handleApprove={mockHandleApprove}
//         handleReject={mockHandleReject}
//       />
//     );

//     const event1 = screen.getByText('Event 1');
//     const event2 = screen.getByText('Event 2');

//     expect(event1).toBeInTheDocument();
//     expect(event2).toBeInTheDocument();
//   });

//   test('renders no pending events message when no events are pending', () => {
//     render(
//       <PendingEvents
//         events={[]}
//         handleApprove={mockHandleApprove}
//         handleReject={mockHandleReject}
//       />
//     );

//     expect(screen.getByText('No pending events found')).toBeInTheDocument();
//     expect(screen.getByAltText('No events found')).toBeInTheDocument(); // Image alt text
//   });

//   test('handles event approval and venue availability', async () => {
//     render(
//       <>
//         <PendingEvents
//           events={mockEvents}
//           handleApprove={mockHandleApprove}
//           handleReject={mockHandleReject}
//         />
//         <ToastContainer />
//       </>
//     );

//     // Click the approve button for the first event
//     const approveButtons = screen.getAllByText(/Approve/i);
//     expect(approveButtons.length).toBeGreaterThan(0); // Ensure there is at least one approve button
//     const approveButton = approveButtons[0];
//     fireEvent.click(approveButton);

//     // Wait for the fetch to be called for venue availability and booking creation
//     await waitFor(() => {
//       // Check fetch call for venue availability
//       expect(global.fetch).toHaveBeenCalledWith(
//         `https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${mockEvents[0].location}&bookingDate=${mockEvents[0].date}&bookingStartTime=${mockEvents[0].start_time}&bookingEndTime=${mockEvents[0].end_time}`,
//         {
//           method: 'GET',
//           headers: {
//             'X-API-KEY': 'test-api-key',
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Check fetch call for booking creation
//       expect(global.fetch).toHaveBeenCalledWith(
//         'https://wits-infrastructure-management.web.app/api/bookings/create',
//         {
//           method: 'POST',
//           headers: {
//             'X-API-KEY': 'test-api-key',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             venueBooker: 'testuser1@example.com',
//             venueID: mockEvents[0].location,
//             bookingDate: mockEvents[0].date,
//             bookingStartTime: mockEvents[0].start_time,
//             bookingEndTime: mockEvents[0].end_time,
//             bookingDescription: mockEvents[0].description,
//           }),
//         }
//       );
//     });

//     // Ensure handleApprove is called with the correct event ID after booking success
//     await waitFor(() => {
//       expect(mockHandleApprove).toHaveBeenCalledWith(mockEvents[0].event_id);
//     });

//     // Check if the success message is displayed
//     expect(screen.getByText('Event successfully approved!')).toBeInTheDocument();
//   });

//   test('handles event rejection with reason', async () => {
//     render(
//       <>
//         <ToastContainer />
//         <PendingEvents
//           events={mockEvents}
//           handleApprove={mockHandleApprove}
//           handleReject={mockHandleReject}
//         />
//       </>
//     );

//     const rejectInputs = screen.getAllByPlaceholderText('Enter reject reason');
//     expect(rejectInputs.length).toBeGreaterThan(0); // Ensure there is at least one reject input

//     const firstRejectInput = rejectInputs[0];
//     fireEvent.change(firstRejectInput, { target: { value: 'Duplicate event' } });

//     const rejectButtons = screen.getAllByText(/Reject/i);
//     expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

//     const firstRejectButton = rejectButtons[0];
//     fireEvent.click(firstRejectButton);

//     await waitFor(() => {
//       expect(mockHandleReject).toHaveBeenCalledWith(mockEvents[0].event_id, 'Duplicate event');
//     });

//     expect(screen.getByText('Event successfully rejected!')).toBeInTheDocument();
//   });

//   test('displays an alert when rejection reason is not provided', () => {
//     render(
//       <>
//         <ToastContainer />
//         <PendingEvents
//           events={mockEvents}
//           handleApprove={mockHandleApprove}
//           handleReject={mockHandleReject}
//         />
//       </>
//     );

//     const rejectButtons = screen.getAllByText(/Reject/i);
//     expect(rejectButtons.length).toBeGreaterThan(0); // Ensure there is at least one reject button

//     const firstRejectButton = rejectButtons[0];
//     fireEvent.click(firstRejectButton);

//     expect(window.alert).toHaveBeenCalledWith('Please provide a reason for rejection');
//   });
// });



// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';

// import '@testing-library/jest-dom';
// import PendingEvents from './PendingEvents';

// // Mock for the fetch function
// // global.fetch = jest.fn(() =>
// //   Promise.resolve({
// //     ok: true,
// //     json: () => Promise.resolve({ name: 'John Doe' }), // Mocked username response
// //   })
// // );


// jest.mock('../EventCard/EventCard', () => ({ event }) => (
//   <div data-testid="event-card">{event.name}</div>
// ));


//   beforeEach(() => {
// global.fetch = jest.fn((url) => {
//     if (url.includes(`https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${venueId}&bookingDate=${bookingDate}&bookingStartTime=${startTime}&bookingEndTime=${endTime}`)) {
//       return Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ isAvailable }),
//       });
//     }
//     return Promise.reject(new Error("Unknown API"));
//   });
// });

// afterEach(() => {
//     jest.clearAllMocks();
//   });

// describe('PendingEvents Component', () => {

//   const event = {
//     event_id: 1,
//     name: 'Sample Event',
//     date: '2024-10-02',
//     start_time: '10:00 AM',
//     end_time: '12:00 PM',
//     location: 'Main Hall',
//     price: 0,
//     user_id: 123,
//     image_url: null,
//     description: 'This is a sample event',
//     type: 'Music'
//   };

//   const mockApprove = jest.fn();
//   const mockReject = jest.fn();

//   it('fetches and displays username', async () => {
//     render(<PendingEvents event={event} onApprove={mockApprove} onReject={mockReject} rejectInput={<input />} />);
    
//     // // Check for the element containing the organizer's name after fetching it
//     // const usernameElement = await screen.findByText('userDetails');
    
//     // // Ensure that the username fetched is "John Doe" (as mocked)
//     // expect(usernameElement.textContent).toBe('Organizer: John Doe');

//   });

// });