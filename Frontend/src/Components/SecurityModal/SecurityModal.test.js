import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SecurityModal from "./SecurityModal";
import "@testing-library/jest-dom/extend-expect";

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "mock-url");

// Mock FileReader
const mockFileReader = () => {
  const reader = new FileReader();
  jest.spyOn(window, "FileReader").mockImplementation(() => ({
    readAsDataURL: jest.fn(),
    onloadend: jest.fn(function () {
      this.result = "data:image/png;base64,dummycontent";
      this.onloadend();
    }),
  }));
};

// Mock the styled components

describe("SecurityModal Component", () => {
  beforeEach(() => {
    mockFileReader(); // Ensure FileReader is mocked before each test
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockEvent = {
    location: "Building A",
    id: "12345",
  };
  const mockOnClose = jest.fn();

  test("renders the modal correctly", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    expect(screen.getByText("Report an Incident")).toBeInTheDocument();
  });

  test("should call onClose when cancel button is clicked", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("should disable confirm button if image or description is missing", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeDisabled();
  });

  test("should enable confirm button when image and description are provided", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    const descriptionInput = screen.getByPlaceholderText(
      "Please give a detail description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    // Mock file input event
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/Please upload an image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const confirmButton = screen.getByText("Confirm");
    waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });

  test("should enable confirm button for landscape image", async () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);

    const descriptionInput = screen.getByPlaceholderText(
      "Please give a detail description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    // Mock a landscape image
    global.Image = jest.fn(() => ({
      onload: null,
      src: "",
      width: 800, // greater than height to simulate landscape
      height: 600,
      addEventListener: jest.fn(function (event, cb) {
        this.onload = cb;
        if (event === "load") {
          this.onload();
        }
      }),
      removeEventListener: jest.fn(function (event, cb) {
        this.onload = null;
      }),
    }));
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [file] } });
    screen.debug();

    // Wait for the confirm button to be enabled
    await waitFor(() => {
      expect(screen.getByText("Confirm")).not.toBeDisabled();
    });
  });

  test("should handle form submission successfully", async () => {
    const mockEvent = {
      id: "event-id",
      location: "Building A",
    };
    const mockOnClose = jest.fn();

    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    // Fill in the description
    const descriptionInput = screen.getByPlaceholderText(
      "Please give a detail description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    // // Simulate file input change with a mock file
    // const file = new File(["dummy content"], "test.png", { type: "image/png" });
    // const fileInput = screen.getByLabelText(
    //   /Please upload an image related to the incident/i
    // );
    // fireEvent.change(fileInput, { target: { files: [file] } });

    // // Wait for image state to be updated
    await waitFor(() => {
      expect(screen.getByText("Confirm")).not.toBeDisabled();
    });

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    // // Click the confirm button
    const confirmButton = screen.getByText("Confirm");
    await act(async () => {
      fireEvent.click(screen.getByText("Confirm"));
    });

    // // Wait for fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/incidents", expect.any(Object));
    });
  });

  test("should display error for non-landscape image", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    const fileInput = screen.getByTestId("file-input");

    // Mock image to simulate portrait orientation
    // Mock the Image constructor
    global.Image = jest.fn(() => ({
      onload: null,
      src: "",
      addEventListener: jest.fn(function (event, cb) {
        if (event === "load") {
          this.onload = cb;
        }
      }),
      removeEventListener: jest.fn(function (event, cb) {
        this.onload = null;
      }),
    }));

    // In your test
    // In your test
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Manually trigger the onload event
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.addEventListener("load", img.onload);

    waitFor(() => {
      expect(
        screen.getByText("Please upload a landscape image.")
      ).toBeInTheDocument();
    });
  });
});
