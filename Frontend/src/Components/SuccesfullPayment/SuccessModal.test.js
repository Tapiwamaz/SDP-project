import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import SuccessModal from './SuccessModal';
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('SuccessModal', () => {
  let mockShowModal;
  let mockSetShowModal;

  beforeEach(() => {
    mockShowModal = true;
    mockSetShowModal = jest.fn();
  });

  test('renders modal when showModal is true', () => {
    render(
      <Router>
        <SuccessModal showModal={mockShowModal} setShowModal={mockSetShowModal} />
      </Router>
    );

    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You have successfully completed your payment.')).toBeInTheDocument();
    expect(screen.getByText('Go to Homepage')).toBeInTheDocument();
    expect(screen.getByText('Go to My Tickets')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Go to Homepage'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
    fireEvent.click(screen.getByText('Go to My Tickets'));
    expect(mockNavigate).toHaveBeenCalledWith('/myBooking');

  });

  test('does not render modal when showModal is false', () => {
    mockShowModal = false;
    render(
      <Router>
        <SuccessModal showModal={mockShowModal} setShowModal={mockSetShowModal} />
      </Router>
    );
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();
    expect(screen.queryByText('You have successfully completed your payment.')).not.toBeInTheDocument();
    expect(screen.queryByText('Go to Homepage')).not.toBeInTheDocument();
    expect(screen.queryByText('Go to My Tickets')).not.toBeInTheDocument();
  });
});