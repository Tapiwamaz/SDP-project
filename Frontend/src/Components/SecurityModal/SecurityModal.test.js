import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import SecurityModal from "./SecurityModal";
import "@testing-library/jest-dom/extend-expect";

describe("SecurityModal Component", () => {
  const mockEvent = {
    location: "Building A",
    id: "12345",
  };
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test("should disable confirm button if description, location, or incident type is missing", () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);
    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeDisabled();
  });

  test("should enable confirm button when description, location, and incident type are provided", async () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);

    const descriptionInput = screen.getByPlaceholderText(
      "Please provide a detailed description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    const locationDropdown = screen.getByLabelText("Select Location:");
    fireEvent.change(locationDropdown, {
      target: { value: "TW Kambule Mathematical Sciences Building" },
    });

    const incidentTypeDropdown = screen.getByLabelText("Incident Type:");
    fireEvent.change(incidentTypeDropdown, { target: { value: "fire" } });

    const confirmButton = screen.getByText("Confirm");
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });

  test("should handle form submission successfully", async () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);

    // Fill in the description
    const descriptionInput = screen.getByPlaceholderText(
      "Please provide a detailed description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    // Select a location
    const locationDropdown = screen.getByLabelText("Select Location:");
    fireEvent.change(locationDropdown, {
      target: { value: "TW Kambule Mathematical Sciences Building" },
    });
    // Select an incident type
    const incidentTypeDropdown = screen.getByLabelText("Incident Type:");
    fireEvent.change(incidentTypeDropdown, { target: { value: "fire" } });

    // Wait for confirm button to be enabled
    const confirmButton = screen.getByText("Confirm");
    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    // Submit the form
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    // Ensure fetch was called with the correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://campussafetyapp.azurewebsites.net/incidents/report-incidents-external",
        expect.any(Object)
      );
    });
  });

  test("should display error if form submission fails", async () => {
    render(<SecurityModal event={mockEvent} onClose={mockOnClose} />);

    // Fill in the description
    const descriptionInput = screen.getByPlaceholderText(
      "Please provide a detailed description of the incident"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    // Select a location
    const locationDropdown = screen.getByLabelText("Select Location:");
    fireEvent.change(locationDropdown, {
      target: { value: "TW Kambule Mathematical Sciences Building" },
    });

    // Select an incident type
    const incidentTypeDropdown = screen.getByLabelText("Incident Type:");
    fireEvent.change(incidentTypeDropdown, { target: { value: "fire" } });

    // Mock fetch with failure response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    // Submit the form
    const confirmButton = screen.getByText("Confirm");
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    // Wait for fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://campussafetyapp.azurewebsites.net/incidents/report-incidents-external",
        expect.any(Object)
      );
    });

    // Check for the error message
    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to report the incident. Please try again. If the issue persists, contact the security office. Contact details below."
        )
      ).toBeInTheDocument();
    });
  });
});
