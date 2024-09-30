import React from "react";
import { render, screen } from "@testing-library/react";
import EventPage from "./EventPage"; // Import the EventPage component
import "@testing-library/jest-dom/extend-expect";

// Mock the child components
jest.mock("../../Components/Header/Header", () => () => (
  <div>Mocked Header</div>
));
jest.mock("../../Components/AsideDesktop/AsideDesktop", () => () => (
  <div>Mocked AsideDesktop</div>
));
jest.mock("../../Components/EventDisplay/EventDisplay", () => () => (
  <div>Mocked EventDisplay</div>
));

describe("EventPage Component", () => {
  test("should render the EventPage with all child components", () => {
    // Render the EventPage component
    render(<EventPage />);

    // Assertions to verify that the child components are being rendered
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked AsideDesktop")).toBeInTheDocument();
    expect(screen.getByText("Mocked EventDisplay")).toBeInTheDocument();
  });
});
