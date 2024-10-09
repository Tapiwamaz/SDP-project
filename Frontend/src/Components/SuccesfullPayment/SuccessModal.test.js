import { render, fireEvent, screen } from "@testing-library/react";
  
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Confetti from "react-confetti";

// Mock navigate function from react-router-dom
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-confetti", () => {
  return function DummyConfetti() {
    return <div data-testid="confetti" />;
  };
});

describe("SuccessModal", () => {
  let mockShowModal;
  let mockSetShowModal;
  let mockSetEventsDisplay;

  beforeEach(() => {
    mockShowModal = true;
    mockSetShowModal = jest.fn();
    mockSetEventsDisplay = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when showModal is true", () => {
    render(
      <Router>
        <SuccessModal
          showModal={mockShowModal}
          setShowModal={mockSetShowModal}
        />
      </Router>
    );

    // Check if the modal content is rendered
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText("You have successfully completed your payment.")
    ).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText("Go to Homepage")).toBeInTheDocument();
    expect(screen.getByText("Go to My Tickets")).toBeInTheDocument();

    // Check if Confetti is rendered
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  test("does not render modal when showModal is false", () => {
    render(
      <Router>
        <SuccessModal showModal={false} setShowModal={mockSetShowModal} setEventsDisplay={mockSetEventsDisplay} />
      </Router>
    );

    // Modal content should not be in the document
    expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
    expect(
      screen.queryByText("You have successfully completed your payment.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Go to Homepage")).not.toBeInTheDocument();
    expect(screen.queryByText("Go to My Tickets")).not.toBeInTheDocument();
    expect(screen.queryByTestId("confetti")).not.toBeInTheDocument();
  });

  test('navigates to homepage when "Go to Homepage" is clicked', () => {
    render(
      <Router>
        <SuccessModal
          showModal={mockShowModal}
          setShowModal={mockSetShowModal}
          setEventsDisplay={mockSetEventsDisplay}
        />
      </Router>
    );

    // Simulate clicking the "Go to Homepage" button
    fireEvent.click(screen.getByText("Go to Homepage"));
  });

  test('navigates to my tickets when "Go to My Tickets" is clicked', () => {
    render(
      <Router>
        <SuccessModal
          showModal={mockShowModal}
          setShowModal={mockSetShowModal}
          setEventsDisplay={mockSetEventsDisplay}
        />
      </Router>
    );

    // Simulate clicking the "Go to My Tickets" button
    fireEvent.click(screen.getByText("Go to My Tickets"));

    // Check if navigate was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith("/myBooking");
  });

  
});
