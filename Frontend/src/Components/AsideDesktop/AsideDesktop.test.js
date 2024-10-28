import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import AsideDesktop from './AsideDesktop'; // Import the component
import { auth } from '../../firebase_config'; // Mocked Firebase auth
import { BrowserRouter } from 'react-router-dom'; // If your component uses React Router
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';

jest.mock("firebase/auth",()=>({
  signOut: jest.fn(),



}))

// Mock Firebase auth
jest.mock('../../firebase_config', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    currentUser: { uid: 'mockUserId' } // Mocked current user
  }
}));

// Mock useNavigate from react-router-dom
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // Use the real implementation for everything else
  useNavigate: jest.fn(),
}));

describe('AsideDesktop Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockNavigate.mockReset();

    // Make sure useNavigate returns the mocked function
    useNavigate.mockReturnValue(mockNavigate);

    // Clear auth mock state
    jest.clearAllMocks();
  });

  test('renders login link when not authenticated and fires login', () => {
    // Mock Firebase auth to simulate no logged-in user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback(null); // Simulate no user logged in
      return jest.fn(); // Mock unsubscribe function
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );
    const LoginLink = screen.getByText('Login');
    fireEvent.click(LoginLink); // Simulate clicking the Home link

    expect(mockNavigate).toHaveBeenCalledWith('/welcome'); // Check if navigate is called with the Home route

    
  });

  test('renders navigation links when user is authenticated', () => {
    // Mock Firebase auth to simulate a logged-in user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' });
      return jest.fn(); // Mock unsubscribe function
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('My Events')).toBeInTheDocument();
    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Create Event')).toBeInTheDocument();
  });

  test('navigates to Home when Home link is clicked', () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' });
      return jest.fn();
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink); // Simulate clicking the Home link

    expect(mockNavigate).toHaveBeenCalledWith('/'); // Check if navigate is called with the Home route
  });

  test('navigates to My Events when My Events link is clicked', () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' });
      return jest.fn();
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    const myEventsLink = screen.getByText('My Events');
    fireEvent.click(myEventsLink); // Simulate clicking the My Events link

    expect(mockNavigate).toHaveBeenCalledWith('/myEvents'); // Check if navigate is called with My Events route
  });

  test('navigates to Create Event when Create Event link is clicked', () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockUserId' });
      return jest.fn();
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    const createEventLink = screen.getByText('Create Event');
    fireEvent.click(createEventLink); // Simulate clicking the Create Event link

    expect(mockNavigate).toHaveBeenCalledWith('/createEvent'); // Check if navigate is called with Create Event route
  });

  test('renders Approvals link when admin is logged in', () => {
    // Set the admin user ID in the environment variable
    process.env.REACT_APP_ADMIN_ID = 'mockAdminId';

    // Mock Firebase auth to simulate an admin user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockAdminId' });
      return jest.fn();
    });

    auth.currentUser = { uid: 'mockAdminId' };


    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    // Check if the Approvals nav item is rendered
    expect(screen.getByText('Approvals')).toBeInTheDocument();
  });

  test('navigates to Admin Dashboard when Approvals link is clicked (admin user)', () => {
    // Set the admin user ID in the environment variable
    process.env.REACT_APP_ADMIN_ID = 'mockAdminId';

    // Mock Firebase auth to simulate an admin user
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: 'mockAdminId' });
      return jest.fn();
    });

    render(
      <BrowserRouter>
        <AsideDesktop />
      </BrowserRouter>
    );

    const approvalsLink = screen.getByText('Approvals');
    fireEvent.click(approvalsLink); // Simulate clicking the Approvals link

    expect(mockNavigate).toHaveBeenCalledWith('/adminDashboard'); // Check if navigate is called with Admin Dashboard route
  });
});
