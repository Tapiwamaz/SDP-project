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

});