import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Summary from "./Summary";
import fetchMock from "jest-fetch-mock";
import SuccessModal from "../../Components/SuccesfullPayment/SuccessModal";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

// Mock Firebase authentication
jest.mock("../../firebase_config", () => ({
  auth: {
    currentUser: {
      uid: "123",
    },
  },
}));

// Mck SuccessModal component
jest.mock("../../Components/SuccesfullPayment/SuccessModal", () => {
  return function DummyModal({ showModal, setShowModal }) {
    return <div data-testid="success-modal">Modal is shown</div>;
  };
});

// Mock PayPalButton component
jest.mock("../../Components/PayPalButton/PaypalButton", () => ({
  __esModule: true,
  default: jest.fn(({ event, count, user_ID, onDisplayModal }) => (
    <button
      data-testid="paypal-button"
      onClick={() => {
        console.log("event:", event);
        console.log("count:", count);
        console.log("user_ID:", user_ID);
        onDisplayModal();
      }}
    >
      PayPal
    </button>
  )),
}));

describe("Summary component", () => {
  const event = {
    event_id: 1,
    name: "Event Name",
    date: "2022-01-01",
    count: 2,
    location: "Event Location",
    price: 100, // Set a price greater than 0 for PayPal button
    image_url: "https://example.com/image.jpg",
  };

  const freeEvent = {
    ...event,
    price: 0, // Free event for testing "Book" button
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders event details correctly", () => {
    render(<Summary event={event} />);
    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByText("1 January 2022")).toBeInTheDocument();
    const countElements = screen.getAllByText(event.count.toString());
    countElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(screen.getByText(event.location)).toBeInTheDocument();
    const priceElements = screen.getAllByText(`R${event.price}`);
    priceElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const totalPriceElements = screen.getAllByText(
      `R${event.price * event.count}`
    );
    totalPriceElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("renders PayPal button when event price is greater than 0", () => {
    render(<Summary event={event} />);
    // screen.debug();
    expect(screen.getByTestId("paypal-button")).toBeInTheDocument();
  });

  test("renders Book button when event price is 0", () => {
    render(<Summary event={freeEvent} />);
    expect(screen.getByText("Book")).toBeInTheDocument();
  });
  test.only("displays Success Modal after successful booking", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    const { rerender } = render(<Summary event={freeEvent} />);
    console.log("This is before button is clicked");
      screen.debug();

    // Click the "Book" button for free event
    fireEvent.click(screen.getByText("Book"));
      screen.debug();
    console.log("This is after button is clicked");

    await waitFor(() => {
      rerender(<Summary event={freeEvent} />);
      screen.debug();
      console.log("This is after rerender");
    });

    // Rerender the component 

    // Wait for the modal to appear
    const modal = await screen.findByTestId("loading");
    expect(modal).toBeInTheDocument();
     screen.debug();
     console.log("This is after rerender");
  });

  test("displays Success Modal after PayPal payment", async () => {
    render(<Summary event={event} />);
    // Click the mocked PayPal button
    fireEvent.click(screen.getByTestId("paypal-button"));

    // Check that the Success Modal is displayed
    const modal = await screen.findByTestId("success-modal");
    expect(modal).toBeInTheDocument();
  });
  test("displays loading overlay while submitting ticket", async () => {
    // Mocking the fetch to simulate a successful payment 
    fetch.mockResponseOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ success: true }) })
    );

    render(<Summary event={freeEvent} />);

    // Click the "Book" button
    await act(async () => {
      fireEvent.click(screen.getByText("Book"));
    });

    // Expect loading overlay to be present
    const loadingOverlay = screen.getByTestId("loading");
    expect(loadingOverlay).toBeInTheDocument();

    // Debug what is currently rendered
    // screen.debug();x
  });

  test("submitTicket function triggers fetch call with correct data", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    render(<Summary event={freeEvent} />);

    // Click the "Book" button
    fireEvent.click(screen.getByText("Book"));

    // Wait for fetch call to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "api/BookTicket",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventID: freeEvent.event_id,
            userID: "123",
            ticketQuantity: freeEvent.count,
          }),
        })
      );
    });
  });
});
