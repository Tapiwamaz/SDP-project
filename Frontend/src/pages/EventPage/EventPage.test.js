import { React, act } from "react";
import { render, screen, prettyDOM } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventPage from "../../Components/EventDisplay/EventDisplay";
import fs from "fs";

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
              },
            },
          },
        ]}
      >
        <EventPage />
      </MemoryRouter>
    );
    fs.writeFileSync("output.html", prettyDOM(container));
  });

  test("renders EventPage component", () => {
    // expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  // Add more tests as needed
});
