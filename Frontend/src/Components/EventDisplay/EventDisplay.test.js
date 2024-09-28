// EventDisplay.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import EventDisplay from "./EventDisplay"; // Adjust the path if necessary

// Mock data for events
const mockEvent = {
  id: "1",
  name: "Sample Event",
  date: "2024-12-25",
  start_time: "10:00 AM",
  end_time: "2:00 PM",
  location: "Building A",
  price: "100",
  description: "This is a sample event description.",
  image_url: "https://example.com/event.jpg",
  capacity: 100,
  count: 50,
  user_id: "user1",
  booking: false,
};

// Mock function to simulate loading
const mockSetLoading = jest.fn();
const mockOnDisplaySummary = jest.fn();

describe("EventDisplay Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
  });

  test("renders event details correctly", () => {
    render(
      <MemoryRouter>
        <EventDisplay
          events={mockEvent}
          loading={false} // Ensure loading is set to false
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      </MemoryRouter>
    );

    // Check event name
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    // Check formatted date
    expect(screen.getByText("25 December 2024")).toBeInTheDocument();
    // Check event time
    expect(
      screen.getByText(/Start: 10:00 AM - End: 2:00 PM/i)
    ).toBeInTheDocument();
    // Check event location
    expect(screen.getByText(/Building A/i)).toBeInTheDocument();
    // Check event price
    expect(screen.getByText(/R100/i)).toBeInTheDocument();
  });

  test("displays placeholder when loading", () => {
    render(
      <MemoryRouter>
        <EventDisplay
          events={mockEvent}
          loading={true} // Set loading to true to show placeholders
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      </MemoryRouter>
    );

    // Check for placeholder elements
    expect(screen.queryAllByRole("img")[0]).toHaveClass(
      "EventImagePlaceholder"
    );
  });

  test("increments and decrements ticket count", () => {
    render(
      <MemoryRouter>
        <EventDisplay
          events={mockEvent}
          loading={false} // Ensure loading is set to false
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      </MemoryRouter>
    );

    // Find the increment and decrement buttons
    const incrementButton = screen.getByTestId("increment-button"); // Update to use data-testid
    const decrementButton = screen.getByTestId("decrement-button");
    const currentCount = screen.getByText(/Current count: 1/i);

    // Check initial count
    expect(currentCount).toBeInTheDocument();

    // Click increment button
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Current count: 2/i)).toBeInTheDocument();

    // Click decrement button
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Current count: 1/i)).toBeInTheDocument();
  });

  test("displays and closes SecurityModal", () => {
    render(
      <MemoryRouter>
        <EventDisplay
          events={mockEvent}
          loading={false} // Ensure loading is set to false
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      </MemoryRouter>
    );

    // Click "Alert" button to open modal
    const alertButton = screen.getByRole("button", { name: /Alert/i });
    fireEvent.click(alertButton);

    // Check that the SecurityModal is displayed
    expect(screen.getByText(/Report an Incident/i)).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    // Check that the modal is closed
    expect(screen.queryByText(/Report an Incident/i)).not.toBeInTheDocument();
  });

  test("submits rating", () => {
    render(
      <MemoryRouter>
        <EventDisplay
          events={mockEvent}
          loading={false} // Ensure loading is set to false
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      </MemoryRouter>
    );

    // Check that the rating section is visible
    expect(screen.getByText(/Are you enjoying The event/i)).toBeInTheDocument();

    // Click on a star rating
    fireEvent.click(screen.getAllByRole("button", { name: "★" })[3]);

    // Click submit button
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    // Check for thank you message after submitting rating
    expect(screen.getByText(/Thank you for your Rating/i)).toBeInTheDocument();
  });
});
