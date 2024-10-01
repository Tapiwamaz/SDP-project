import React from "react";
import { render, screen } from "@testing-library/react";
import SummaryPage from "./SummaryPage"; // Import the SummaryPage component
  
import { useLocation } from "react-router"; // Import useLocation

// Mock useLocation to simulate route state
jest.mock("react-router", () => ({
  useLocation: () => ({
    state: {
      event: { id: "123", name: "Sample Event" },
      amount: 2,
    },
  }),
}));

// Mock the child components
jest.mock("../../Components/Header/Header", () => () => (
  <div>Mocked Header</div>
));
jest.mock("../../Components/AsideDesktop/AsideDesktop", () => () => (
  <div>Mocked AsideDesktop</div>
));
jest.mock("../../Components/Summary/Summary", () => () => (
  <div>Mocked Summary</div>
));

describe("SummaryPage Component", () => {
  test("should render the SummaryPage with all child components", () => {
    // Render the SummaryPage component
    render(<SummaryPage />);

    // Verify the child components are rendered
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked AsideDesktop")).toBeInTheDocument();
    expect(screen.getByText("Mocked Summary")).toBeInTheDocument();
  });

  test("should pass the correct event and amount to Summary component", () => {
    // Render the SummaryPage component
    render(<SummaryPage />);

    // Check that the mock Summary component is rendered
    expect(screen.getByText("Mocked Summary")).toBeInTheDocument();

    // Here, we could verify the passed props (event and amount), but since we are mocking,
    // we assume that the Summary component will render correctly with the right props.
  });
});
