import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";

import {
  handleImageChange,
  loadLocations,
  handleChangeEventDetails,
  createEventDB,
  updateEventDB,
  fetchStorage,
  delay,
} from "./CreateEvent";

import CreateEvent from "./CreateEvent";
import { handleNextButtonClick } from "./CreateEvent.helpers";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.setTimeout(10000);

jest.mock("../../Components/Header/Header", () => () => (
  <div>Mocked Header</div>
));

jest.mock("../../Components/AsideDesktop/AsideDesktop", () => () => (
  <div>Mocked AsideDesktop</div>
));

jest.mock(
  "../../Components/CreateEventPageComponents/CreateEventPendingPage",
  () => () => <div>MockedCreateEventPendingPage</div>
);
window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock("firebase/storage", () => ({
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getStorage: jest.fn(),
  deleteObject: jest.fn(),
}));

jest.mock("../../firebase_config", () => ({
  db: jest.fn(),
  storage: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => () => <div>MockToastContainer</div>,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useLocation: jest.fn(),
}));

// Mock the module and its exports
jest.mock("../../MockData/MockData", () => ({
  mockLocations: [
    {
      id: "05i5Vi0aZVKd8ZEzHNvw",
      campus: "East",
      timeSlots: [
        "08:00",
        "09:00",
        "10:15",
        "11:15",
        "12:30",
        "14:15",
        "15:15",
        "16:15",
      ],
      venueType: "Lecture Venue",
      isClosed: false,
      buildingName: "Robert Sobukwe",
      venueName: "CB216A",
      venueCapacity: "30",
    },
    {
      id: "cdddd",
      campus: "w",
      timeSlots: [
        "08:00",
        "09:00",
        "10:15",
        "11:15",
        "12:30",
        "14:15",
        "15:15",
        "16:15",
      ],
      venueType: "Lecture Venue",
      isClosed: false,
      buildingName: "Sobukwe",
      venueName: "C216A",
      venueCapacity: "30",
    },
  ],
  mockEventTypes: [
    "Education",
    "Sports",
    "Political",
    "Entertainment",
    "Gaming",
    "IT",
  ],
  mockVirtualLocations: [
    {
      id: "05i5Vi0aZVKd8ZEzHNvw",
      campus: "East",
      timeSlots: [
        "08:00",
        "09:00",
        "10:15",
        "11:15",
        "12:30",
        "14:15",
        "15:15",
        "16:15",
      ],
      venueType: "Lecture Venue",
      isClosed: false,
      buildingName: "Robert Sobukwe",
      venueName: "CB216A",
      venueCapacity: "30",
    },
  ],
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

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
  eventPicture: {
    current: { classList: { add: jest.fn() }, scrollIntoView: jest.fn() },
  },
};

const mockSetLoader = jest.fn();
const mockSetSubmitted = jest.fn();

describe("Unit test (Functions)", () => {
  // Set up the mock for localStorage
  beforeEach(() => {
    localStorage.clear();
  });

  it("fetchStorage Should return the parsed object when a valid JSON string is in localStorage", () => {
    // Arrange
    const key = "testKey";
    const value = { name: "Sample Event", date: "2024-09-15" };
    localStorage.setItem(key, JSON.stringify(value));
    const result = fetchStorage(key);

    expect(result).toEqual(value);
  });

  it("fetchStorage should return null when the key does not exist in localStorage", () => {
    const key = "nonExistentKey";
    const result = fetchStorage(key);

    expect(result).toBeNull();
  });

  it("fetchStorage should return null when the stored item is not valid JSON", () => {
    const key = "invalidJsonKey";
    localStorage.setItem(key, "Invalid JSON String");
    const result = fetchStorage(key);

    expect(result).toBeNull();
  });

  it("Delay function", async () => {
    const ms = 100;
    const start = Date.now();
    await delay(ms);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  test("handleChangeEventDetails updates event details correctly", () => {
    let initialState = {};

    let detail = "Freshers";
    let detailType = "name";

    const mockSetEventDetails = jest.fn((updateFunction) => {
      const updatedState = updateFunction(initialState);
      return updatedState;
    });

    handleChangeEventDetails(detail, detailType, mockSetEventDetails);

    // Check if setEventDetails was called with the correct state update
    expect(mockSetEventDetails).toHaveBeenCalled();
    expect(mockSetEventDetails).toHaveBeenCalledWith(expect.any(Function));

    // Extract the state update function argument and call it to check the result
    let updateFunction = mockSetEventDetails.mock.calls[0][0];
    let updatedState = updateFunction(initialState);

    expect(updatedState).toEqual({
      name: detail,
    });
  });

  test("Load locations function", () => {
    const mockSetALocations = jest.fn();

    const sampleLocations = ["Location 1", "Location 2", "Location 3"];

    loadLocations(mockSetALocations, sampleLocations);
    expect(mockSetALocations).toHaveBeenCalled();
    expect(mockSetALocations).toHaveBeenCalledWith(sampleLocations);
  });
});

describe("handleImageChange", () => {
  let mockSetImage;
  let mockSetImageError;
  let mockSetImgSrc;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock state setter functions
    mockSetImage = jest.fn();
    mockSetImageError = jest.fn();
    mockSetImgSrc = jest.fn();
    // Mock URL.createObjectURL and URL.revokeObjectURL
    Object.defineProperty(global.URL, "createObjectURL", {
      value: jest.fn(() => "blob:http://localhost/test-image"),
      writable: true,
    });
    Object.defineProperty(global.URL, "revokeObjectURL", {
      value: jest.fn(() => {}),
      writable: true,
    });
  });

  afterEach(() => {
    // Restore original implementations
    jest.restoreAllMocks();
  });

  test("handles landscape image correctly", () => {
    // Create a mock file with a known width and height
    const file = new File(["image content"], "test-image.jpg", {
      type: "image/jpeg",
    });

    // Mock Image object and simulate its onload event
    const img = {
      src: "",
      width: 1000, // Set a width greater than height
      height: 500, // Set a height less than width
      onload: null,
    };

    // Mock Image constructor
    global.Image = jest.fn(() => {
      return img;
    });

    // Mock FileReader
    const reader = {
      readAsDataURL: jest.fn(),
      result: "data:image/jpeg;base64,aGVsbG8=",
    };
    jest.spyOn(global, "FileReader").mockImplementation(() => reader);

    // Simulate the file input change event
    const event = {
      target: {
        files: [file],
      },
    };

    // Call the function with the mock event and setters
    handleImageChange(event, mockSetImgSrc, mockSetImage, mockSetImageError);

    // Simulate the onload event of the image
    img.onload();
    expect(mockSetImage).toHaveBeenCalledWith(file);
    expect(mockSetImageError).toHaveBeenCalledWith(null);
    expect(reader.readAsDataURL).toHaveBeenCalledWith(file);
    reader.onloadend();
    expect(mockSetImgSrc).toHaveBeenCalledWith(reader.result);
  });

  test("handles non-landscape image correctly", () => {
    // Create a mock file with a known width and height
    const file = new File(["image content"], "test-image.jpg", {
      type: "image/jpeg",
    });

    // Mock Image object and simulate its onload event
    const img = {
      src: "",
      width: 500, // Set a width less than height
      height: 1000, // Set a height greater than width
      onload: null,
    };

    // Mock Image constructor
    global.Image = jest.fn(() => {
      return img;
    });

    // Mock FileReader
    const reader = {
      readAsDataURL: jest.fn(),
      result: "data:image/jpeg;base64,aGVsbG8=",
    };
    jest.spyOn(global, "FileReader").mockImplementation(() => reader);

    // Simulate the file input change event
    const event = {
      target: {
        files: [file],
      },
    };

    // Call the function with the mock event and setters
    handleImageChange(event, mockSetImgSrc, mockSetImage, mockSetImageError);

    // Simulate the onload event of the image
    img.onload();

    // Verify that the state setters were called correctly
    expect(mockSetImage).toHaveBeenCalledWith(null);
    expect(mockSetImageError).toHaveBeenCalledWith(
      "Please upload a landscape image."
    );

    // Verify that FileReader was not used
    expect(reader.readAsDataURL).not.toHaveBeenCalled();

    // Verify that setImgSrc was not called
    expect(mockSetImgSrc).not.toHaveBeenCalled();
  });

  it("No file uploaded", () => {
    const event = {
      target: {
        files: [],
      },
    };

    handleImageChange(event, mockSetImgSrc, mockSetImage, mockSetImageError);
    expect(mockSetImageError).toHaveBeenCalledWith(
      "Something went wrong uploading your picture"
    );
  });
});

describe("createEventDB", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create an event successfully", async () => {
    // Mock data
    const newEvent = {
      location: "New York, NY",
      eventPicture: "test.jpg",
    };
    const eventCollection = {};
    const imageT = { name: "testImage.jpg" };
    const locations = [{ venueName: "New York, NY", venueCapacity: 5000 }];

    // Mock Firebase functions
    const mockImageRef = {};
    const mockSnapshot = { ref: "mockSnapshotRef" };
    const mockDownloadURL = "http://mock-url.com/image.jpg";

    ref.mockReturnValue(mockImageRef);
    uploadBytes.mockResolvedValue(mockSnapshot);
    getDownloadURL.mockResolvedValue(mockDownloadURL);
    addDoc.mockResolvedValue(); // No need to return anything for addDoc
    uuidv4.mockReturnValue("mock-uuid");

    // Call the function
    await createEventDB(newEvent, eventCollection, imageT, locations);

    // Assertions
    expect(ref).toHaveBeenCalledWith(
      expect.anything(),
      "eventsImages/testImage.jpgmock-uuid"
    );
    expect(uploadBytes).toHaveBeenCalledWith(mockImageRef, imageT);
    expect(getDownloadURL).toHaveBeenCalledWith(mockSnapshot.ref);
    expect(newEvent.image_url).toBe(mockDownloadURL);
    expect(newEvent.capacity).toBe(5000);
    expect(newEvent.ticket_count).toBe(5000);
    expect(newEvent.event_id).toBe("mock-uuid");
    expect(newEvent.active).toBe(true);
    expect(newEvent.approved).toBe(false);
    expect(addDoc).toHaveBeenCalledWith(eventCollection, newEvent);
  });

  test("handles errors during upload or URL retrieval", async () => {
    // Mock data
    const newEvent = { name: "Test Event", imageURL: "" };
    const eventCollection = {};
    const imageT = new File(["image content"], "test-image.jpg", {
      type: "image/jpeg",
    });

    // Mock implementations
    ref.mockReturnValue({});
    uploadBytes.mockRejectedValue(new Error("Upload failed"));
    uuidv4.mockReturnValue("unique-id");

    // Call the function and catch errors
    await expect(
      createEventDB(newEvent, eventCollection, imageT)
    ).rejects.toThrow("Failed to create event. Please try again.");

    // Ensure addDoc is not called in case of an error
    expect(addDoc).not.toHaveBeenCalled();
  });
});

describe("Create Event rendering", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  test("Static text and icons", () => {
    render(<CreateEvent inputEventDetails={null} />);
    expect(screen.getByTestId("title").textContent).toBe("Create your event");
  });

  it("submission process", () => {
    render(<CreateEvent inputEventDetails={null} />);
    const eventNameInput = screen.getByTestId("name");
    const eventDateInput = screen.getByTestId("date");
    const typeInput = screen.getByTestId("type");
    const start_timeInput = screen.getByTestId("start_time");
    const end_timeInput = screen.getByTestId("end_time");
    const venue_typeInput = screen.getByTestId("venue_type");
    const priceInput = screen.getByTestId("price");
    const locationInput = screen.getByTestId("location");
    const descriptionInput = screen.getByTestId("description");
    const nextButton = screen.getByText("Submit");
    const inputFile = screen.getByTestId("pictureInput");

    fireEvent.change(eventNameInput, { target: { value: "Sample Event" } });
    fireEvent.change(eventDateInput, { target: { value: "2024-09-30" } });
    fireEvent.change(priceInput, { target: { value: 7 } });
    fireEvent.change(locationInput, { target: { value: "Park" } });
    fireEvent.change(typeInput, { target: { value: "edu" } });
    fireEvent.change(venue_typeInput, { target: { value: "Field" } });
    fireEvent.change(descriptionInput, { target: { value: "I dislike jest" } });
    fireEvent.change(start_timeInput, { target: { value: "08:00" } });
    fireEvent.change(end_timeInput, { target: { value: "09:00" } });
    
    expect(eventNameInput.value).toBe("Sample Event");
    expect(eventDateInput.value).toBe("2024-09-30");
    console.log(end_timeInput)
    expect(end_timeInput).toBe("09:00");
    expect(start_timeInput.value).toBe("08:00");
    expect(locationInput.value).toBe("Park");
    expect(venue_typeInput.value).toBe("Field");
    expect(typeInput.value).toBe("edu");
    expect(priceInput.value).toBe("7");
    expect(descriptionInput.value).toBe("I dislike jest");
    const file = new File(["dummy image content"], "testImage.jpeg", {
      type: "image/jpeg",
    });

    Object.defineProperty(file, "width", { value: 500 });
    Object.defineProperty(file, "height", { value: 100 });
    fireEvent.change(inputFile, { target: { files: [file] } });
    expect(inputFile.files[0].name).toBe(file.name);
    fireEvent.click(nextButton);
  });

  it("shows error when an image with width < height is selected", async () => {
    render(<CreateEvent inputEventDetails={null} />);

    // Mock an image file with width < height (portrait)
    const file = new File(["dummy image content"], "testImagePortrait.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(file, "width", { value: 500 });
    Object.defineProperty(file, "height", { value: 1000 });

    const inputFile = screen.getByTestId("pictureInput");

    // Mocking change event
    fireEvent.change(inputFile, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
    });
  });

  it(" auto fill the input fields if input is given", () => {
    render(
      <CreateEvent
        inputEventDetails={{
          name: "JestHater",
          venue_type: "field",
          type: "edu",
          location: "digs",
        }}
      />
    );
    const nameInput = screen.getByTestId("name");
    expect(nameInput.value).toBe("JestHater");
    expect();
  });
});

describe("handleNextButtonClick", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  it("should show warning and highlight event name if missing", async () => {
    const mockEventDetails = {}; // Missing name

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(mockEventRefs.eventName.current.classList.add).toHaveBeenCalledWith(
      "unfilled-input"
    );
    expect(mockEventRefs.eventName.current.scrollIntoView).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("Please enter your events name");
  });
  it("should show warning for no event type", async () => {
    const mockEventDetails = {
      name: "Test Event",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(mockEventRefs.eventType.current.classList.add).toHaveBeenCalledWith(
      "unfilled-input"
    );
    expect(mockEventRefs.eventType.current.scrollIntoView).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("Please select your event type");
  });

  it("should show warning and highlight event date if missing", async () => {
    const mockEventDetails = { name: "Test Event", type: "Educ" }; // Missing date

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(mockEventRefs.eventDate.current.classList.add).toHaveBeenCalledWith(
      "unfilled-input"
    );
    expect(mockEventRefs.eventDate.current.scrollIntoView).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("Please enter your events date");
  });

  it("should show warning for invalid date format", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "invalid-date",
      type: "ex",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(mockEventRefs.eventDate.current.classList.add).toHaveBeenCalledWith(
      "unfilled-input"
    );
    expect(mockEventRefs.eventDate.current.scrollIntoView).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("Please a vaild date");
  });

  it("should show warning for no event venue type", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      type: "danso",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventVenueType.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventVenueType.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please select the event venue type"
    );
  });

  it("should show warning for no event location", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      type: "danso",
      venue_type: "case closed",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventLocation.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventLocation.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please select your events location"
    );
  });

  it("should show warning for no start time", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      type: "fff",
      location: "http://localhost",
      venue_type: "un.py",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventStartTime.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventStartTime.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please enter your events start time"
    );
  });

  it("should show warning for no end time", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      type: "fff",
      location: "http://localhost",
      start_time: "07:00",
      venue_type: "un.py",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventEndTime.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventEndTime.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please enter your events end time"
    );
  });

  it("End time before start time error", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      type: "error",
      location: "http://localhost",
      venue_type: "venue",
      start_time: "07:00",
      end_time: "06:00",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventEndTime.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventStartTime.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventStartTime.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please choose valid start and end times"
    );
  });

  it("should show warning for no event price", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      start_time: "07:00",
      end_time: "08:00",
      type: "danso",
      venue_type: "case closed",
      location: "hit to give",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventTicketPrice.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventTicketPrice.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please enter your events ticket price"
    );
  });

  it("should show warning for no event description", async () => {
    const mockEventDetails = {
      name: "Test Event",
      name: "Test Event",
      price: 2,
      date: "2024-09-24",
      start_time: "07:00",
      end_time: "08:00",
      type: "danso",
      venue_type: "case closed",
      location: "hit to give",
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventDescription.current.classList.add
    ).toHaveBeenCalledWith("unfilled-input");
    expect(
      mockEventRefs.eventDescription.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith(
      "Please enter your events description"
    );
  });

  it("should show warning for no picture", async () => {
    const mockEventDetails = {
      name: "Test Event",
      date: "2024-09-24",
      start_time: "07:00",
      end_time: "08:00",
      type: "danso",
      venue_type: "case closed",
      location: "hit to give",
      description: "pops no advice",
      price: 10,
    };

    await handleNextButtonClick(
      mockEventDetails,
      mockEventRefs,
      null,
      [],
      "eventCollection",
      mockSetLoader,
      mockSetSubmitted
    );

    expect(
      mockEventRefs.eventPicture.current.scrollIntoView
    ).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("Please upload a picture");
  });
});

describe("CreateEvent html component functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handler hover and apply correct styles to the drop file container", () => {
    render(<CreateEvent inputEventDetails={null} />);

    const dropFileContainer = screen.getByTestId("drop-file-container");

    expect(dropFileContainer).toHaveStyle({
      position: "static",
      background: "var(--primary)",
      color: "white",
    });

    // Simulate mouse leave (hovered = false)
    fireEvent.mouseLeave(dropFileContainer);
    render(<CreateEvent inputEventDetails={null} />);

    // Style check after mouse leave
    expect(dropFileContainer).toHaveStyle({
      background: "var(--primary)",
      color: "white",
    });
  });

  it("Character left p tag", () => {
    render(<CreateEvent inputEventDetails={null} />);
    const descriptionInput = screen.getByTestId("description");
    expect(screen.queryByTestId("chrLeft")).not.toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: "foo" } });
    const chrLeftP = screen.getByTestId("chrLeft");
    expect(chrLeftP).toBeInTheDocument();
    expect(chrLeftP.textContent).toEqual("Characters left: 197");
    expect(chrLeftP.style.color).toEqual("rgb(3, 197, 0)");
  });
});

describe("updateEventDB", () => {
  const mockEventCollection = {}; // Replace with the actual mock of your Firestore collection

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks between tests
  });

  it("should delete the old image and upload a new image if imageT has a name", async () => {
    // Mock data
    const mockUpdatedEvent = {
      event_id: "event123",
      location: "New York",
      image_url: "old-image-url",
    };
    const mockImageT = { name: "new-image.jpg" };
    const mockLocations = [{ venueName: "New York", capacity: 500 }];

    // Mock Firebase Storage behavior
    const mockStorageRef = { mock: "ref" };
    ref.mockReturnValue(mockStorageRef);
    deleteObject.mockResolvedValueOnce();
    uploadBytes.mockResolvedValueOnce({ ref: mockStorageRef });
    getDownloadURL.mockResolvedValueOnce("new-image-url");
    uuidv4.mockReturnValue("random-uuid");

    // Mock Firestore behavior
    const mockQuerySnapshot = [{ ref: "mockDocRef" }];
    where.mockReturnValueOnce({});
    query.mockReturnValueOnce({});
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    updateDoc.mockResolvedValueOnce();

    // Call the function
    await updateEventDB(
      mockUpdatedEvent,
      mockEventCollection,
      mockImageT,
      mockLocations
    );

    // Assertions for image handling
    expect(ref).toHaveBeenCalledWith(expect.anything(), "old-image-url"); // Old image ref
    expect(deleteObject).toHaveBeenCalledWith(mockStorageRef); // Old image deleted
    expect(uploadBytes).toHaveBeenCalledWith(expect.anything(), mockImageT); // New image uploaded
    expect(getDownloadURL).toHaveBeenCalledWith(mockStorageRef); // New URL fetched
    expect(mockUpdatedEvent.image_url).toBe("new-image-url"); // Image URL updated

    // Assertions for Firestore update
    expect(query).toHaveBeenCalledWith(
      mockEventCollection,
      expect.anything() // where condition for event_id
    );
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith("mockDocRef", mockUpdatedEvent); // Event updated in Firestore
  });

  it("should not delete the old image if imageT does not have a name", async () => {
    // Mock data
    const mockUpdatedEvent = {
      event_id: "event123",
      location: "New York",
      image_url: "old-image-url",
    };
    const mockImageT = {}; // No name
    const mockLocations = [{ venueName: "New York", capacity: 500 }];

    // Mock Firestore behavior
    const mockQuerySnapshot = [{ ref: "mockDocRef" }];
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    updateDoc.mockResolvedValueOnce();

    // Call the function
    await updateEventDB(
      mockUpdatedEvent,
      mockEventCollection,
      mockImageT,
      mockLocations
    );

    // No image-related operations should be called
    expect(deleteObject).not.toHaveBeenCalled();
    expect(uploadBytes).not.toHaveBeenCalled();
    expect(getDownloadURL).not.toHaveBeenCalled();
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith("mockDocRef", mockUpdatedEvent);
  });

  it("should handler errors and throw a custom error message", async () => {
    // Mock data
    const mockUpdatedEvent = {
      event_id: "event123",
      location: "New York",
    };
    const mockImageT = { name: "new-image.jpg" };
    const mockLocations = [{ location: "New York", capacity: 500 }];

    // Mock Firebase Storage behavior
    ref.mockReturnValue({});
    deleteObject.mockRejectedValueOnce(new Error("Storage Error")); // Simulate error

    await expect(
      updateEventDB(
        mockUpdatedEvent,
        mockEventCollection,
        mockImageT,
        mockLocations
      )
    ).rejects.toThrow("Failed to update event. Please try again.");
  });
});

describe("Selects", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  it("Locations select", () => {
    render(<CreateEvent inputEventDetails={null} />);
    const venue_typeInput = screen.getByTestId("venue_type");
    fireEvent.change(venue_typeInput, { target: { value: "Lecture Venue" } });
    const locationsList = screen.getByTestId("location");
    expect(locationsList.children.length).toBeGreaterThanOrEqual(1);

    fireEvent.change(locationsList, { target: { value: "CB216A" } });
  });
  it("eventType datalist", () => {
    render(<CreateEvent inputEventDetails={null} />);
    const datalist = screen.getByTestId("venue_type");
    expect(datalist.children.length).toBe(2);
  });
});

describe("Functions within html components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("onFocus of  remove unfilled-input class", () => {
    render(<CreateEvent inputEventDetails={null} />);
    const locationInput = screen.getByTestId("location");
    fireEvent.focus(locationInput);
    expect("unfilled-input" in locationInput.classList).toBe(false);

    const descriptionInput = screen.getByTestId("description");
    fireEvent.focus(descriptionInput);
    expect("unfilled-input" in descriptionInput.classList).toBe(false);

    const priceInput = screen.getByTestId("price");
    fireEvent.focus(priceInput);
    expect("unfilled-input" in priceInput.classList).toBe(false);

    const end_timeInput = screen.getByTestId("end_time");
    fireEvent.focus(end_timeInput);
    expect("unfilled-input" in end_timeInput.classList).toBe(false);

    const start_timeInput = screen.getByTestId("start_time");
    fireEvent.focus(start_timeInput);
    expect("unfilled-input" in start_timeInput.classList).toBe(false);

    const venue_typeInput = screen.getByTestId("venue_type");
    fireEvent.focus(venue_typeInput);
    expect("unfilled-input" in venue_typeInput.classList).toBe(false);

    const eventDateInput = screen.getByTestId("date");
    fireEvent.focus(eventDateInput);
    expect("unfilled-input" in eventDateInput.classList).toBe(false);

    const typeInput = screen.getByTestId("type");
    fireEvent.focus(typeInput);
    expect("unfilled-input" in typeInput.classList).toBe(false);

    const nameInput = screen.getByTestId("name");
    fireEvent.focus(nameInput);
    expect("unfilled-input" in nameInput.classList).toBe(false);

    const imageInput = screen.getByTestId("drop-file-container");
    fireEvent.mouseEnter(imageInput);
    fireEvent.mouseLeave(imageInput);

    fireEvent.change(typeInput, { target: { value: "Online" } });
  });
});
