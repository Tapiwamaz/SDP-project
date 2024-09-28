import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventsCalendar from "./EventsCalendar";

// Mock moment since react-big-calendar uses moment for localization
jest.mock("moment", () => () => ({
  format: () => "2023-01-01",
}));

// Sample events data
const sampleEvents = [
  {
    name: "Sample Event",
    date: "2023-09-27",
    start_time: "10:00",
    end_time: "12:00",
    type: "IT",
  },
];

describe("MyCalendar component", () => {
  test("renders calendar with events", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Check if the event is displayed in the calendar
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
  });

  test("renders the custom toolbar with dropdowns", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Check if both dropdowns and label exist in the toolbar
    expect(screen.getByText("Navigate")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  test("changes calendar view when selecting from the view dropdown", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Simulate changing the view to 'Week'
    const viewDropdown = screen.getByDisplayValue("Month");
    fireEvent.change(viewDropdown, { target: { value: "week" } });

    // Expect the view to have changed to 'Week'
    expect(screen.getByDisplayValue("Week")).toBeInTheDocument();
  });

  test("navigates to previous and next dates using dropdown", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Simulate navigating to 'Next'
    const navigateDropdown = screen.getByText("Navigate");
    fireEvent.change(navigateDropdown, { target: { value: "next" } });

    // Expect the calendar to navigate to the next period
    expect(screen.getByText(/2023-01-01/)).toBeInTheDocument();
  });

  test("switches to day view when a date is selected", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Simulate selecting a slot in the calendar
    const calendarSlot = screen.getByText("Sample Event");
    fireEvent.click(calendarSlot);

    // Expect the view to have switched to 'Day'
    expect(screen.getByDisplayValue("day")).toBeInTheDocument();
  });

  test("displays the correct event color based on event type", () => {
    render(<EventsCalendar filter={sampleEvents} />);

    // Check the background color of the event
    const eventElement = screen.getByText("Sample Event");
    expect(eventElement).toHaveStyle("background-color: #b25da6"); // IT event color
  });
});
