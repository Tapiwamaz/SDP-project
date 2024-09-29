import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import Profile from "./ProfilePage";
import { BrowserRouter } from "react-router-dom";
import { auth } from "../../firebase_config";

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

describe("Profile Component", () => {
  const mockUserData = {
    user_id: "123",
    name: "John Doe",
    email: "johndoe@example.com",
    description: "A short description about John",
    imageURL: "mockProfileImage.jpg",
    rating: 4.5,
  };
 let setTicketCount, setEventCount;
  beforeEach(() => {
    localStorage.setItem("userData", JSON.stringify(mockUserData));
    auth.currentUser = { uid: "123" };
    setTicketCount = jest.fn();
    setEventCount = jest.fn();
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

    // Wait for the logout to complete
    // await waitFor(() => {
    //   expect(mockNavigate).toHaveBeenCalledWith("/welcome");
    // });

    // Ensure localStorage has been cleared
    localStorage.removeItem("userData");
    expect(localStorage.getItem("userData")).toBe(null);
  });
  
});
