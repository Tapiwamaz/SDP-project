import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
//   
import { CreateProfile } from "./CreateProfile"; // Import the component

import { BrowserRouter } from "react-router-dom"; // To support useNavigate
import { useNavigate } from "react-router-dom";
import { addDoc,getDocs } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(() =>
      Promise.resolve({
        empty: true, // Default mock for no existing user
      })
    ),
  }));

jest.mock("../../firebase_config.js", () => ({
  auth: {
    currentUser: {
      email: "mockuser@example.com",
      uid: "mockUserID",
    },
  },
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"), // Use the real implementation for other features
  useNavigate: jest.fn(),
}));

describe("CreateProfile Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockNavigate.mockReset();
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test("renders the CreateProfile component with default avatar and inputs", () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Check if default avatar is rendered
    const profileImage = screen.getByAltText("Profile");
    expect(profileImage).toBeInTheDocument();

    // Check if input fields and button are rendered
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell us about yourself!")).toBeInTheDocument();
    expect(screen.getByText("Go to events")).toBeInTheDocument();
  });

  test("allows user to enter nickname and description", () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Tell us about yourself!");

    // Simulate typing into inputs
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test user." } });

    expect(nameInput).toHaveValue("Test User");
    expect(descriptionInput).toHaveValue("This is a test user.");
  });

  test("generates a new avatar when the 'Generate new avatar' button is clicked", () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );

    const initialAvatar = screen.getByAltText("Profile").getAttribute("src");
    const generateAvatarButton = screen.getByText("Generate new avatar");

    // Simulate clicking the "Generate new avatar" button
    fireEvent.click(generateAvatarButton);

    // The avatar should change to a new one
    const newAvatar = screen.getByAltText("Profile").getAttribute("src");
    expect(newAvatar).not.toBe(initialAvatar);
  });

  test("shows error message if required fields are missing", async () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );

    // Click the submit button without filling in required fields
    const submitButton = screen.getByText("Go to events");
    fireEvent.click(submitButton);

    // Error message should be shown
    await waitFor(() => {
      expect(screen.getByText("Please enter fields")).toBeInTheDocument();
    });
  });

  test("submits the form successfully when all required fields are filled", async () => {
    // Mock the Firestore `addDoc` method to succeed
    getDocs.mockResolvedValueOnce({ empty: true });

    addDoc.mockResolvedValueOnce({});
  
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );
  
    // Fill in the name and description fields
    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Tell us about yourself!");
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test user." } });
  
    // Click the submit button
    const submitButton = screen.getByText("Go to events");
    fireEvent.click(submitButton);
  
    // Wait for async submission and Firebase interaction
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1); // Check if `addDoc` was called once
    });
  
    // Check that navigate is called to redirect user after successful form submission
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/"); // Should redirect to home page
    });
  });

  test("does not submit form if user already exists in Firestore", async () => {
    // Simulate Firestore returning an existing user (empty: false)
    getDocs.mockResolvedValueOnce({ empty: false });
  
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );
  
    // Fill in the name and description fields
    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Tell us about yourself!");
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test user." } });
  
    // Click the submit button
    const submitButton = screen.getByText("Go to events");
    fireEvent.click(submitButton);
  
    // Wait to ensure form doesn't submit due to existing user
    await waitFor(() => {
      expect(addDoc).not.toHaveBeenCalled(); // Should not call `addDoc` if user already exists
    });
  
   
  });
  
 
});
