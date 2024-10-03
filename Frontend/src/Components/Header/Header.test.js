import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Header from './Header'; // Import the Header component
import { auth } from '../../firebase_config';
import { BrowserRouter } from 'react-router-dom'; // If your component uses React Router
import { useNavigate } from 'react-router-dom';


// Mock Firebase auth
jest.mock('../../firebase_config', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    currentUser: { uid: 'mockUserId' } // Mocked current user
  }
}));

jest.mock('../Profile/ProfilePage', () => () => <div>Mocked ProfilePage</div>);

  jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'), // Use the real implementation for all except useNavigate
    useNavigate: jest.fn(),
  }));




describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock data before each test
  });

  test('renders "Hello User" when not authenticated', () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback(null); // Simulate no user being logged in
      return jest.fn(); // Mock unsubscribe function

    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('Hello User')).toBeInTheDocument(); // Checks if "Hello User" is rendered
    expect(screen.getByText('Login')).toBeInTheDocument(); // 

  });

  test('renders profile image and username when user is authenticated', () => {
    const mockUserData = {
      name: 'John Doe',
      imageURL: 'https://example.com/profile.jpg'
    };

    localStorage.setItem('userData', JSON.stringify(mockUserData)); // Mock user data in localStorage

    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' }); // Simulate a logged-in user
      return jest.fn(); // Mock unsubscribe function

    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('Hello John Doe')).toBeInTheDocument(); // Checks if user name is displayed
    expect(screen.getByAltText('profileImg')).toHaveAttribute('src', 'https://example.com/profile.jpg'); // Checks if image src is correct
  });

  test('opens profile page on profile image click', () => {
    const mockUserData = {
      name: 'John Doe',
      imageURL: 'https://example.com/profile.jpg'
    };

    localStorage.setItem('userData', JSON.stringify(mockUserData)); // Mock user data in localStorage

    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' }); // Simulate a logged-in user
      return jest.fn(); // Mock unsubscribe function

    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const profileImg = screen.getByTestId('profileImg');
    fireEvent.click(profileImg); // Simulate clicking the profile image

    expect(screen.getByText('Mocked ProfilePage')).toBeInTheDocument();
  });

  test('toggles burger menu on click', () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback(null); // Simulate no user being logged in
      return jest.fn(); // Mock unsubscribe function
    });
  
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const burger = screen.getByTestId('burger');
    fireEvent.click(burger); // Simulate clicking the burger menu

    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument(); // Checks if the close icon appears after the menu opens
  });

  // Test for admin route access
  test('renders Approvals nav item when admin is logged in', () => {
    // Mock the admin ID environment variable
    process.env.REACT_APP_ADMIN_ID = 'mockAdminId';
  
    // Mock Firebase auth.onAuthStateChanged to simulate an admin user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockAdminId' }); // Simulate user with admin ID
      return jest.fn(); // Mock the unsubscribe function
    });
  
    // Also mock auth.currentUser to match the expected admin user
    auth.currentUser = { uid: 'mockAdminId' };
  
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  
    // Check if the Approvals nav item is rendered
    expect(screen.getByText('Approvals')).toBeInTheDocument();
  });
  

});

describe('Header Component Navigation', () => {

  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock Firebase auth to simulate a logged-in user
    auth.onAuthStateChanged = jest.fn((callback) => {
      callback({ uid: 'mockUserId' });
      return jest.fn(); // Mock unsubscribe function
    });

    auth.currentUser = { uid: 'mockUserId' }; // Mock the current user

    // Reset the mock before each test
    mockNavigate.mockReset();

    // Make sure useNavigate returns our mockNavigate function
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('checks the route when Home link is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink); // Simulate clicking on Home link

    expect(mockNavigate).toHaveBeenCalledWith('/'); // Assert that navigate was called with the expected route
  });

  test('checks the route when My Events link is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const myEventsLink = screen.getByText('My Events');
    fireEvent.click(myEventsLink); // Simulate clicking on My Events link

    expect(mockNavigate).toHaveBeenCalledWith('/myEvents'); // Assert that navigate was called with the expected route
  });

  test('navigates to My Bookings when My Bookings link is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const myBookingsLink = screen.getByText('My Bookings');
    fireEvent.click(myBookingsLink); // Simulate clicking on My Bookings link

    expect(mockNavigate).toHaveBeenCalledWith('/myBooking'); // Check if navigate is called with the My Bookings route
  });
    test('navigates to Create Event when Create Event link is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const createEventLink = screen.getByText('Create Event');
    fireEvent.click(createEventLink); // Simulate clicking on Create Event link

    expect(mockNavigate).toHaveBeenCalledWith('/createEvent'); // Check if navigate is called with the Create Event route
  });
    test('navigates to Approvals when Approvals link is clicked (admin user)', () => {
    // Set the admin user ID
    process.env.REACT_APP_ADMIN_ID = 'mockAdminId';

    // Mock Firebase auth to simulate an admin user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockAdminId' });
      return jest.fn(); // Mock the unsubscribe function
    });
    auth.currentUser = { uid: 'mockAdminId' }; // Mock the current user as admin

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const approvalsLink = screen.getByText('Approvals');
    fireEvent.click(approvalsLink); // Simulate clicking on Approvals link

    expect(mockNavigate).toHaveBeenCalledWith('/adminDashboard'); // Check if navigate is called with the Approvals route
  });

  // Add more tests for other links like My Bookings, Create Event, etc.
});

 