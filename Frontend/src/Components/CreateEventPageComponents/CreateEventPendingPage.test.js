import { MemoryRouter, Route, Routes } from "react-router";
import CreateEventPendingPage from "./CreateEventPendingPage";
import { render, screen } from "@testing-library/react";

describe("CreateEventPendingPage", () => {
  it("renders the correct message when `update` is false", () => {
    // Render the component with `update` as false
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            index
            element={<CreateEventPendingPage update={false} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    // Check if the correct text is rendered
    expect(
      screen.getByText("Your are now officialy on the waitlist - stay tuned!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You will be notified as soon your event is approved.")
    ).toBeInTheDocument();
  });

  it("renders the correct message when `update` is true", () => {
    // Render the component with `update` as true
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            index
            element={<CreateEventPendingPage update={true} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    // Check if the correct text is rendered
    const h3 = screen.getByTestId("pendingUpdate")
    expect(
        screen.getByTestId("pendingUpdate").textContent
    ).toBe("Your event has been updated  - stay tuned!");
    expect(
      screen.getByText("You will be notified as soon your event is approved.")
    ).toBeInTheDocument();
  });

  it("renders the NavLink correctly", () => {
    // Render the component
    render(
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              index
              element={<CreateEventPendingPage update={true} />}
            ></Route>
          </Routes>
        </MemoryRouter>
      );
  

    // Check if the NavLink is rendered with correct text
    const navLink = screen.getByRole("link", { name: "Go back to home" });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute("href", "/");
  });

  it("renders the image correctly", () => {
    // Render the component
    render(
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              index
              element={<CreateEventPendingPage update={true} />}
            ></Route>
          </Routes>
        </MemoryRouter>
      );
  

    // Check if the image is rendered
    const image = screen.getByAltText("women high five");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "WomenHighFive.svg");
  });
});
