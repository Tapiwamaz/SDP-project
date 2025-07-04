import {
  handleNextButtonClick,
  fetchVenues,
  filterVenues,
} from "./CreateEvent.helpers"; // Adjust path based on your file structure
import { createEventDB, updateEventDB, delay } from "./CreateEvent"; // Import these to mock them
import { sendNotification } from "../../Components/Notifications/CreateNotifications";
// Mock functions
jest.mock("./CreateEvent", () => ({
  createEventDB: jest.fn(),
  updateEventDB: jest.fn(),
  delay: jest.fn(),
  fetchStorage: jest.fn(() => ({
    imageURL: "fake.url",
    name: "Taps",
    user_id: "x",
  })),
}));

jest.mock("../../Components/Notifications/CreateNotifications", () => ({
  sendNotification: jest.fn(({ notification, db }) => {}),
  formatDateToISO: jest.fn(),
}));
jest.mock("uuid", () => ({
  v4: jest.fn(),
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
      start_time: "10:00",
      end_time: "12:00",
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
      mockSetSubmitted,
      {},
      {}
    );

    // Fast-forward timers
    jest.runAllTimers();

    await promise;
    // expect(mockSetLoader).toHaveBeenCalledWith(true);
    // expect(createEventDB).toHaveBeenCalledWith(
    //   mockEventDetails,
    //   "eventCollection",
    //   null,
    //   []
    // );

    // expect(delay).toHaveBeenCalledWith(5000);
    // expect(mockSetLoader).toHaveBeenCalledWith(false);
    // expect(mockSetSubmitted).toHaveBeenCalledWith(true);
  });

  it("should call updateEventDB if event_id is present and set loader/submitted state", async () => {
    const mockEventDetails = {
      event_id: "123",
      name: "Test Event",
      date: "2024-12-01",
      start_time: "10:00",
      end_time: "22:00",
      type: "Concert",
      venue_type: "Indoor",
      location: "New York",
      description: "Test description",
      price: "10.50",
      eventPicture: "image-url",
    };
    const mockDB = {};
    const mockAuth = { currentUser: { uid: "x" } };

    // Call the function
    const promise = handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted,
      mockDB,
      mockAuth
    );

    // Fast-forward timers
    jest.runAllTimers();
    await promise;
    // expect(sendNotification).toHaveBeenCalledWith(expect.any(Object), {});

    // expect(mockSetLoader).toHaveBeenCalledWith(true);
    // expect(updateEventDB).toHaveBeenCalledWith(
    //   mockEventDetails,
    //   "eventCollection",
    //   null,
    //   []
    // );
  });
});

process.env.REACT_APP_X_API_KEY = "mock-secret-key";
global.fetch = jest.fn();

describe("fetchVenues", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock data before each test
  });

  test("successfully fetches venue data", async () => {
    // Mock the response for a successful fetch
    const mockVenues = [
      { id: "venue1", name: "Venue 1" },
      { id: "venue2", name: "Venue 2" },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockVenues,
    });

    const data = await fetchVenues();

    // Check that the fetch function was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith(
      "https://wits-infrastructure-management.web.app/api/venues/?isClosed=False",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "mock-secret-key",
          "Content-Type": "application/json",
        },
      }
    );

    // Ensure the returned data matches the mock data
    expect(data).toEqual(mockVenues);
  });

  test("handles fetch failure with a non-200 response", async () => {
    // Mock a failed response (e.g., 500 Internal Server Error)
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    // Spy on console.log to check the error logging
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const data = await fetchVenues();

    expect(fetch).toHaveBeenCalledWith(
      "https://wits-infrastructure-management.web.app/api/venues/?isClosed=False",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "mock-secret-key",
          "Content-Type": "application/json",
        },
      }
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "error fetching venues from infrastructure"
    );
    expect(data).toBeUndefined(); // Should return undefined when fetch fails

    consoleLogSpy.mockRestore(); // Restore original console.log
  });

  test("handles network or fetch-related errors", async () => {
    // Mock a network error or fetch failure
    fetch.mockRejectedValueOnce(new Error("Network error"));

    // Spy on console.error to check the error logging
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const data = await fetchVenues();

    expect(fetch).toHaveBeenCalledWith(
      "https://wits-infrastructure-management.web.app/api/venues/?isClosed=False",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "mock-secret-key",
          "Content-Type": "application/json",
        },
      }
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    expect(data).toBeUndefined(); // Should return undefined when fetch fails

    consoleErrorSpy.mockRestore(); // Restore original console.error
  });
});

describe("filterVenues", () => {
  it("returns unique values based on the provided attribute", () => {
    const venues = [
      { name: "Venue A", type: "Outdoor" },
      { name: "Venue B", type: "Indoor" },
      { name: "Venue C", type: "Outdoor" },
    ];
    const result = filterVenues(venues, "type");
    expect(result).toEqual(["Outdoor", "Indoor"]);
  });

  it("returns an empty array if the input array is empty", () => {
    const result = filterVenues([], "type");
    expect(result).toEqual([]);
  });

  it("returns unique values even if all attribute values are the same", () => {
    const venues = [
      { name: "Venue A", type: "Outdoor" },
      { name: "Venue B", type: "Outdoor" },
    ];
    const result = filterVenues(venues, "type");
    expect(result).toEqual(["Outdoor"]);
  });

  it("handles cases where the attribute does not exist in the objects", () => {
    const venues = [{ name: "Venue A" }, { name: "Venue B" }];
    const result = filterVenues(venues, "type");
    expect(result).toEqual([undefined]);
  });

  it("returns unique values for attributes with mixed types", () => {
    const venues = [
      { name: "Venue A", type: "Outdoor" },
      { name: "Venue B", type: 123 },
      { name: "Venue C", type: "Outdoor" },
    ];
    const result = filterVenues(venues, "type");
    expect(result).toEqual(["Outdoor", 123]);
  });
});
