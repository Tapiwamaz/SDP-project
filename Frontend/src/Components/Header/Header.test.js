// Header.test.js
import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Needed for `useNavigate`
import Header from './Header';

// Mock the Firebase auth object
jest.mock('../../firebase_config', () => ({
  auth: {
    currentUser: null, // No user is logged in by default for this basic render test
  },
}));

describe('Header Component', () => {
  test('renders the header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Basic checks to ensure essential elements are rendered
    // expect(screen.getByAltText('profileImg')).toBeInTheDocument();
    expect(screen.getByText('Hello User')).toBeInTheDocument();
  });


  test('toggles the mobile menu when burger is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const burgerMenu = screen.getByTestId('burger'); // Assuming Burger component is a button or has role="button"
    fireEvent.click(burgerMenu);

    const closeButton = screen.getByTestId('close-icon'); // Make sure your Xicon has data-testid="close-icon"
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    // expect(closeButton).not.toBeInTheDocument(); // Check if the menu closes
  });

  
});
