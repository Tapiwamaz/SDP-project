import React from "react";
import { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useLocation, useNavigate } from "react-router-dom";
import EventDisplay from "./EventDisplay";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

// Mock SecurityModal component
jest.mock("../SecurityModal/SecurityModal", () => {
  return function DummyModal({ showModal, setShowModal }) {
    return <div data-testid="Security-Modal">Security Modal Mock</div>;
  };
});

describe("EventDisplay Component", () => {
  const mockEvent = {
    user_id: "user123",
    name: "Sample Event",
    date: "2023-09-30",
    start_time: "10:00 AM",
    end_time: "12:00 PM",
    location: "Sample Location",
    price: 100,
    description: "Sample Event Description",
    image_url: "sample-image-url",
    booking: true,
    ticket_count: 10,
  };

  const mockEventOrg = {
    user_id: "user123",
    name: "Organizer Name",
    email: "organizer@example.com",
    imageURL: "organizer-image-url",
    description: "Organizer Description",
    Rates: 5,
    rating: 4,
  };

  const mockLocation = {
    state: {
      event: mockEvent,
      ticket: { rated: false, id: "ticket123" },
    },
  };

  const mockSetLoading = jest.fn();
  const mockOnDisplaySummary = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue(mockLocation);
    global.fetch = jest.fn((url) => {
      if (url.includes("api/GetUser")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockEventOrg),
        });
      }
      if (url.includes("api/Rating")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }
      return Promise.reject(new Error("Unknown API"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Shows Loading placeHolders when loading", async () => {
    await act(async () => {
      render(<EventDisplay loading={true} setLoading={mockSetLoading} />);
    });
    expect(screen.getByTestId("ImagePLaceholder")).toBeInTheDocument();
  });

  test("Shows Event Display and Event Oraganiser details when not loading", async () => {
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });

    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("30 September 2023")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(
      screen.getByText("Start: 10:00 AM - End: 12:00 PM")
    ).toBeInTheDocument();
    expect(screen.getByText("Location:")).toBeInTheDocument();
    expect(screen.getByText("Sample Location")).toBeInTheDocument();
    expect(screen.getByText("Price Per Ticket:")).toBeInTheDocument();
    expect(screen.getByText("R100")).toBeInTheDocument();
    expect(screen.getByText("About Event :")).toBeInTheDocument();
    expect(screen.getByText("Sample Event Description")).toBeInTheDocument();
    expect(screen.getByText("Organizer Name")).toBeInTheDocument();
    expect(screen.getByText("organizer@example.com")).toBeInTheDocument();
    expect(screen.getByText("Organizer Description")).toBeInTheDocument();
    expect(screen.getByText("Number of Tickets")).toBeInTheDocument();
    expect(screen.getByText("Current count: 1")).toBeInTheDocument();
  });

  test("Book now button is disabled when ticket count is 0", async () => {
    mockLocation.state.event.ticket_count = 0;
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });
    expect(screen.getByTestId("SoldOutButton")).toBeDisabled();
  });

  test("Book now button is enabled when ticket count is greater than 0 and Calls onDisplaySummary when Called", async () => {
    mockLocation.state.event.ticket_count = 10;
    await act(async () => {
      render(
        <EventDisplay
          loading={false}
          setLoading={mockSetLoading}
          onDisplaySummary={mockOnDisplaySummary}
        />
      );
    });
    expect(screen.getByTestId("BookNowButton")).toBeEnabled();
    await act(async () => {
      fireEvent.click(screen.getByTestId("BookNowButton"));
    });
    expect(mockOnDisplaySummary).toHaveBeenCalledWith(mockEvent);
  });

  test("Increment and Decrement buttons Change the count of tickets", async () => {
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("IncrementButton"));
    });
    expect(screen.getByText("Current count: 2")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByTestId("DecrementButton"));
    });
    expect(screen.getByText("Current count: 1")).toBeInTheDocument();
  });

  test("Rate button is enabled when ticket is rated false and Calls the Rating api", async () => {
    mockLocation.state.ticket.rated = false;
    mockLocation.state.event.booking = false;
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("Star-3"));
    });

    expect(screen.getByTestId("SubmitButton")).toBeEnabled();
    await act(async () => {
      fireEvent.click(screen.getByTestId("SubmitButton"));
    });
    expect(screen.getByText("We appreciate your feedback")).toBeInTheDocument();
  });

  test("Alert Button Calls the Security Modal", async () => {
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("AlertButton"));
    });
    expect(screen.getByText("Security Modal Mock")).toBeInTheDocument();
  });

  test("Rate button is disabled when ticket is rated true", async () => {
    mockLocation.state.ticket.rated = true;
    mockLocation.state.event.booking = false;
    await act(async () => {
      render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
    });
    expect(screen.getByText("We appreciate your feedback")).toBeInTheDocument();
    mockLocation.state.event.booking = true;
    mockLocation.state.ticket.rated = false;
  });
});
// describe("EventDisplay Component API Error", () => {
//   const mockEvent = {
//     user_id: "user123",
//     name: "Sample Event",
//     date: "2023-09-30",
//     start_time: "10:00 AM",
//     end_time: "12:00 PM",
//     location: "Sample Location",
//     price: 100,
//     description: "Sample Event Description",
//     image_url: "sample-image-url",
//     booking: true,
//     ticket_count: 10,
//   };

//   const mockEventOrg = {
//     user_id: "user123",
//     name: "Organizer Name",
//     email: "organizer@example.com",
//     imageURL: "organizer-image-url",
//     description: "Organizer Description",
//     Rates: 5,
//     rating: 4,
//   };

//   const mockLocation = {
//     state: {
//       event: mockEvent,
//       ticket: { rated: false, id: "ticket123" },
//     },
//   };

//   const mockSetLoading = jest.fn();
//   const mockNavigate = jest.fn();

//   beforeEach(() => {
//     useNavigate.mockReturnValue(mockNavigate);
//     useLocation.mockReturnValue(mockLocation);
//     global.fetch = jest.fn((url) => {
//       // Simulate error responses for the specific API endpoints
//       if (url.includes("api/GetUser")) {
//         return Promise.resolve({
//           ok: false,
//           status: 404,
//           json: () => Promise.resolve({ error: "User not found" }),
//         });
//       }
//       if (url.includes("api/Rating")) {
//         return Promise.resolve({
//           ok: false,
//           status: 500,
//           json: () => Promise.resolve({ error: "Failed to submit rating" }),
//         });
//       }
//       return Promise.reject(new Error("Unknown API"));
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("Handles API error when fetching event organizer details", async () => {
//     await act(async () => {
//       render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
//     });

//     // Check that the error is displayed to the user
//     await waitFor(() => {
//       expect(
//         screen.getByText("Error fetching event organizer details")
//       ).toBeInTheDocument();
//     });

//     // Check that the fetch was called with the correct API URL
//     expect(global.fetch).toHaveBeenCalledWith(
//       "api/GetUser?userID=user123",
//       expect.any(Object)
//     );
//   });

//   test("Handles API error when submitting a rating", async () => {
//     await act(async () => {
//       render(<EventDisplay loading={false} setLoading={mockSetLoading} />);
//     });

//     // Simulate user interaction to rate the event
//     fireEvent.click(screen.getByTestId("Star-3"));
//     fireEvent.click(screen.getByTestId("SubmitButton"));

//     // Check that the error is displayed to the user 
//    // Check that the fetch was called with the correct API URL and payload
//     expect(global.fetch).toHaveBeenCalledWith(
//       "api/Rating",
//       expect.objectContaining({
//         method: "PUT",
//         body: JSON.stringify({
//           rating: "3",
//           userID: "user123",
//           rates: "5",
//           EventOrgRating: "4",
//           ticketID: "ticket123",
//         }),
//       })
//     );
//   });
// });
