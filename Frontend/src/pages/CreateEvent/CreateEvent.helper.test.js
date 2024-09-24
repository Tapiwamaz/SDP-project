import { handleNextButtonClick } from "./CreateEvent.helpers"; // Adjust path based on your file structure
import { createEventDB, updateEventDB, delay } from "./CreateEvent"; // Import these to mock them
import { toast } from "react-toastify";

// Mock functions
jest.mock("./CreateEvent", () => ({
  createEventDB: jest.fn(),
  updateEventDB: jest.fn(),
  delay: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Refs
const mockEventRefs = {
  eventName: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventDate: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventStartTime: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventEndTime: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventType: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventVenueType: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventLocation: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventDescription: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventTicketPrice: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
  eventPicture: { current: { scrollIntoView: jest.fn() } },
};

// Mock state setters
const mockSetLoader = jest.fn();
const mockSetSubmitted = jest.fn();

describe("handleNextButtonClick - DB operation test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // Mock the delay function
  });

  it("should call createEventDB if event_id is not present and set loader/submitted state", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-12-01",
      start_time: "10:00 AM",
      end_time: "2:00 PM",
      type: "Concert",
      venue_type: "Indoor",
      location: "New York",
      description: "Test description",
      price: "10.50",
      eventPicture: "image-url",
    };

    // Call the function
    const promise = handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    // Fast-forward timers
    jest.runAllTimers();

    await promise;

    // Assert that the loader was set to true
    expect(mockSetLoader).toHaveBeenCalledWith(true);

    // Assert that createEventDB was called
    expect(createEventDB).toHaveBeenCalledWith(
      mockEventDetails,
      "eventCollection",
      null,
      []
    );

    // Assert delay was called
    expect(delay).toHaveBeenCalledWith(5000);

    // Assert that the loader was set to false and setSubmitted was called
    expect(mockSetLoader).toHaveBeenCalledWith(false);
    expect(mockSetSubmitted).toHaveBeenCalledWith(true);
  });

  it("should call updateEventDB if event_id is present and set loader/submitted state", async () => {
    const mockEventDetails = {
      event_id: "123",
      name: "Test Event",
      date: "2024-12-01",
      start_time: "10:00 AM",
      end_time: "2:00 PM",
      type: "Concert",
      venue_type: "Indoor",
      location: "New York",
      description: "Test description",
      price: "10.50",
      eventPicture: "image-url",
    };

    // Call the function
    const promise = handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    // Fast-forward timers
    jest.runAllTimers();
    await promise;

    expect(mockSetLoader).toHaveBeenCalledWith(true);
    expect(updateEventDB).toHaveBeenCalledWith(
      mockEventDetails,
      "eventCollection",
      null,
      []
    );
    expect(delay).toHaveBeenCalledWith(5000);
    expect(mockSetLoader).toHaveBeenCalledWith(false);
    expect(mockSetSubmitted).toHaveBeenCalledWith(true);
  });

});
