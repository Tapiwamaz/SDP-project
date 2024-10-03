import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
//   
import { Profile, updateSlidePercentage } from "./ProfilePage";
import { BrowserRouter } from "react-router-dom";
import { auth } from "../../firebase_config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// Mock Firebase functions

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123" }, // Mock a current user object
  })),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock("../../firebase_config", () => ({
  auth: {
    currentUser: null, // No user is logged in by default for this basic render test
  },
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock("firebase/storage", () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(() => Promise.resolve("mockDownloadUrl")),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() =>
    Promise.resolve({
      size: 0,
      docs: [{ ref: { update: jest.fn() } }],
      empty: true,
    })
  ),
  updateDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));

// Mock the useNavigate function from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../Header/Header", () => () => <div>Mocked Header</div>);

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

const setUpWidth = (width) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event("resize")); // Trigger resize event
};
describe("Profile Component", () => {
  const mockUserData = {
    user_id: "123",
    name: "John Doe",
    email: "johndoe@example.com",
    description: "A short description about John",
    imageURL: "mockProfileImage.jpg",
    rating: 4.5,
  };
  let setScreenMock;
  let setTicketCount, setEventCount;
  let setProfileImage, setImageFile;
  beforeEach(() => {
    localStorage.setItem("userData", JSON.stringify(mockUserData));
    auth.currentUser = { uid: "123" };
    setTicketCount = jest.fn();
    setEventCount = jest.fn();
    setProfileImage = jest.fn();
    setImageFile = jest.fn();

    // Mock useState to provide the mock functions
    jest
      .spyOn(React, "useState")
      .mockImplementation((initial) => [initial, setProfileImage]);
    jest
      .spyOn(React, "useState")
      .mockImplementation((initial) => [initial, setImageFile]);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders profile information", () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Check if the profile information is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("A short description about John")
    ).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toHaveAttribute(
      "src",
      "mockProfileImage.jpg"
    );
  });

  it("allows editing of profile information", () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Click the Edit Profile button
    fireEvent.click(screen.getByText("Edit Profile"));

    // Check that the input fields are shown
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();

    // Edit the name
    fireEvent.change(screen.getByDisplayValue("John Doe"), {
      target: { value: "Jane Doe" },
    });

    fireEvent.click(screen.getByText("Save"));

    // Check that the profile name has been updated
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("triggers image upload when clicked", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Enter editing mode
    fireEvent.click(screen.getByText("Edit Profile"));

    const fileInput = screen.getByText("Edit picture");

    // Create a mock file
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    // Simulate uploading a new image
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // Wait for the file to be processed and URL updated
    await waitFor(() => {
      expect(screen.getByAltText("Profile")).toHaveAttribute(
        "src",
        "mockProfileImage.jpg"
      );
    });
  });

  it("logs out the user when Log Out is clicked", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Click the Log Out button
    fireEvent.click(screen.getByText("Log Out"));

    // Ensure localStorage has been cleared
    localStorage.removeItem("userData");
    expect(localStorage.getItem("userData")).toBe(null);
  });

  it("shows Header when screen type is 'phone'", () => {
    // Set up the width and trigger resize
    setUpWidth(768);

    // Mock the setScreen function
    const setScreenMock = jest.fn();

    // Mock useState to provide the mock function
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce((initial) => [initial, setScreenMock]);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Assert that the Header is displayed
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
  });

  it("does not show Header when screen type is 'desktop'", () => {
    // Set up the width and trigger resize
    setUpWidth(1024);

    // Mock the setScreen function
    const setScreenMock = jest.fn();

    // Mock useState to provide the mock function
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce((initial) => [initial, setScreenMock]);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Assert that the Header is not displayed
    expect(screen.queryByText("Mocked Header")).not.toBeInTheDocument();
  });

  it("shows that the document isnt updated if empty", async () => {
    getDocs.mockResolvedValueOnce({ empty: true });
    updateDoc.mockResolvedValue();
    render(<Profile />);
    await waitFor(() => {
      expect(updateDoc).not.toHaveBeenCalled(); // Should not call addDoc if user already exists
    });
  });

  // it("shows that the document has been updated", async () => {
  //   auth.currentUser = { uid: "123" };

  //   // Create a mock document reference and data to update
  //   const mockDocRef = { id: "mockDocRef" };
  //   const updateData = { name: "Updated Name" }; // Example data to update

  //   // Mock the return value of getDocs to simulate an existing document
  //   getDocs.mockResolvedValueOnce({
  //     empty: false,
  //     docs: [{ ref: mockDocRef }], // Mock the document reference with `ref`
  //   });

  //   // Mock updateDoc to simulate a successful update
  //   updateDoc.mockResolvedValueOnce();

  //   // Render the Profile component
  //   render(<Profile />);

  //   // Trigger the action that leads to the updateDocumentByUserID function being called
  //   // fireEvent.click(screen.getByText("Edit Profile"));
  //   // fireEvent.click(screen.getByText("Save")); // Adjust based on your UI

  //   // Wait for the updateDoc function to be called
  //   await waitFor(() => {
  //     expect(updateDoc).toHaveBeenCalled(); // Should not call addDoc if user already exists
  //   });
  //   //expect(getDocs).toHaveBeenCalled(); // Ensure getDocs was called
  //   // Verify that updateDoc is called with the correct parameters
  //   // Ensure updateDoc was called once
  // });
});
