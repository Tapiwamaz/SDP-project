import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import Header from '../../Components/Header/Header';
import Tabs from '../../Components/Tabs/Tabs';
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop';
import { auth } from '../../firebase_config';

jest.mock('../../Components/Header/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../Components/Tabs/Tabs', () => () => <div>Mocked Tabs</div>);
jest.mock('../../Components/AsideDesktop/AsideDesktop', () => () => <div>Mocked AsideDesktop</div>);


jest.mock('firebase/firestore');
jest.mock('../../firebase_config', () => ({
    auth: { currentUser: null },
}));

jest.mock("firebase/auth", () => ({
   
    //getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
}));

describe('AdminDashboard', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders Header, Tabs, and AsideDesktop when user is admin', () => {
      // Set admin user ID in the auth mock
      auth.currentUser = { uid: process.env.REACT_APP_ADMIN_ID };
  
      render(<AdminDashboard />);
  
      // Check if Header, Tabs, and AsideDesktop components render
      expect(screen.getByText('Mocked Header')).toBeInTheDocument();
      expect(screen.getByText('Mocked Tabs')).toBeInTheDocument();
      expect(screen.getByText('Mocked AsideDesktop')).toBeInTheDocument();
    });
  
    it('does not render components and shows alert when user is not admin', () => {
      // Set non-admin user ID in the auth mock
      auth.currentUser = { uid: 'some_other_user_id' };
  
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
      render(<AdminDashboard />);
  
      // Verify alert is called with the expected message
      expect(alertSpy).toHaveBeenCalledWith('You do not have authorization');
  
      // Verify Header, Tabs, and AsideDesktop are not rendered
      expect(screen.queryByText('Mocked Header')).not.toBeInTheDocument();
      expect(screen.queryByText('Mocked Tabs')).not.toBeInTheDocument();
      expect(screen.queryByText('Mocked AsideDesktop')).not.toBeInTheDocument();
  
      alertSpy.mockRestore();
    });
  });