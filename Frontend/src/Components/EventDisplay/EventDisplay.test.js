import React from "react";
import { act } from "react";
import { render, screen, prettyDOM } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventDisplay from "../../Components/EventDisplay/EventDisplay";
import fs from "fs";
import { fork } from "child_process";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    return `${day} ${month} ${year}`; // change this line to change the order
  }


describe("EventPage", () => {
  beforeEach(() => {
    const { container } = render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/event",
            state: {
              event: {
                eventID: "1b6d1a8a-fb3f-4d0e-8f7a-7e733ff99e4f",
                name: "Tech Innovations 2024",
                type: "IT",
                date: "2024-09-15T10:00:00.000Z",
                description:
                  "A conference showcasing the latest in technology and IT innovations.",
                start_time: "2024-09-15T10:00:00.000Z",
                end_time: "2024-09-15T16:00:00.000Z",
                userID: "b23e47cb-784f-4851-b7a9-0a7a6df5a2e8",
                active: true,
                imageURL: "techconference2024.com/image",
                price: 50,
                approved: true,
                location: "wits hall29",
                booked: false,
              },
            },
          },
        ]}
      >
        <EventDisplay />
      </MemoryRouter>
    );
    // console.log(prettyDOM(container));
  });

  test("renders EventDisplay with the Right Information When booked=false", () => {
    // Check if the event name is displayed
    expect(screen.getByText("Tech Innovations 2024")).toBeInTheDocument();

    // Check if the event date is displayed
    expect(screen.getByText(formatDate("2024-09-15T10:00:00.000Z"))).toBeInTheDocument();

    // Check if the event start and end time is displayed
    // Check if the event location is displayed
    expect(screen.getByText("Location:")).toBeInTheDocument();
    expect(screen.getByText("wits hall29")).toBeInTheDocument();

    // Check if the event price is displayed
    expect(screen.getByText("Price Per Ticket:")).toBeInTheDocument();
    expect(screen.getByText("R50")).toBeInTheDocument

    // Check if the event description is displayed
    expect(
      screen.getByText(
        "A conference showcasing the latest in technology and IT innovations."
      )
    ).toBeInTheDocument();

  });

  test('', () => {
    
  })
  

  // Add more tests as needed
});
