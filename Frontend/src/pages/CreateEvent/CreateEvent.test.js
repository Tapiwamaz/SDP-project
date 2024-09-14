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
} from "./CreateEvent";

import CreateEvent from "./CreateEvent";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock(
  "../../Components/CreateEventPageComponents/CreateEventPendingPage",
  () => () => <div>Mocked CreateEventPendingPage</div>
);

jest.mock(
  "../../Components/CreateEventPageComponents/CreateEventPendingPage",
  () => {
    const CreateEventPendingPage = () => (
      <div>Mocked CreateEventPendingPage</div>
    );

    return CreateEventPendingPage;
  }
);

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
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate
}));

// Mock the module and its exports
jest.mock("../../MockData/MockData", () => ({
  mockLocations: [
    {
      id: "1",
      name: "Central Park",
      location: "New York, NY",
      capacity: 5000,
      type: "Park",
    },
    {
      id: "2",
      name: "Madison Square Garden",
      location: "New York, NY",
      capacity: 20000,
      type: "Arena",
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

    // Verify that the state setters were called correctly
    expect(mockSetImage).toHaveBeenCalledWith(file);
    expect(mockSetImageError).toHaveBeenCalledWith(null);

    // Verify that FileReader was used to create a preview URL
    expect(reader.readAsDataURL).toHaveBeenCalledWith(file);

    // Simulate FileReader onloadend
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
    const locations = [{ location: "New York, NY", capacity: 5000 }];

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
    expect(newEvent.user_id).toBe("3fa85f64-5717-4562-b3fc-2c963f66afa6");
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
    const start_timeInput = screen.getByTestId("start_time");
    const end_timeInput = screen.getByTestId("end_time");
    const venue_typeInput = screen.getByTestId("venue_type");
    const priceInput = screen.getByTestId("price");
    const locationInput = screen.getByTestId("location");
    const descriptionInput = screen.getByTestId("description");

    fireEvent.change(eventNameInput, { target: { value: "Sample Event" } });
    fireEvent.change(eventDateInput, { target: { value: "2024-09-30" } });
    fireEvent.change(start_timeInput, { target: { value: "08:00" } });
    fireEvent.change(end_timeInput, { target: { value: "08:00" } });
    fireEvent.change(priceInput, { target: { value: 7 } });
    fireEvent.change(locationInput, { target: { value: "Park" } });
    fireEvent.change(venue_typeInput, { target: { value: "Field" } });
    fireEvent.change(descriptionInput, { target: { value: "I dislike jest" } });

    expect(eventNameInput.value).toBe("Sample Event");
    expect(eventDateInput.value).toBe("2024-09-30");
    expect(end_timeInput.value).toBe("08:00");
    expect(start_timeInput.value).toBe("08:00");
    expect(locationInput.value).toBe("Park");
    expect(venue_typeInput.value).toBe("Field");
    expect(priceInput.value).toBe("7");

  });

  // it("shows image preview when an image is selected", async () => {
  //   render(<CreateEvent inputEventDetails={null} />);

  //   const file = new File(["dummy image content"], "testImage.jpg", {
  //     type: "image/jpeg",
  //     width: 5000,
  //     height: 1000,
  //   });
  //   const inputFile = screen.getByTestId("pictureInput");

  //   fireEvent.change(inputFile, { target: { files: [file] } });

  //   await waitFor(() => {
  //     expect(screen.getByAltText("Preview")).toBeInTheDocument();
  //   });
  // });

  // it("updates the class of input fields if validation fails", async () => {
  //   render(<CreateEvent inputEventDetails={null} />);

  //   const submitButton = screen.getByText("Submit");
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     const eventNameInput = screen.getByLabelText("Event Name");
  //     expect(eventNameInput.classList).toContain("unfilled-input");
  //   });
  // });

  it(" auto fill the input fields if input is given", () => {
    render(<CreateEvent inputEventDetails={{ name: "JestHater" }} />);
    const nameInput = screen.getByTestId("name");
    expect(nameInput.value).toBe("JestHater");
  });
});
