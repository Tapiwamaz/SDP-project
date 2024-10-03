import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PayPalButton from "./PaypalButton";

// Mock the PayPal SDK's Buttons
global.window.paypal = {
  Buttons: jest.fn(() => ({
    render: jest.fn(),
    createOrder: jest.fn(),
    onApprove: jest.fn(),
  })),
};

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: "order-id" }), // Mock PayPal order creation
  })
);

test("renders PayPalButton without crashing", () => {
  const mockEvent = {
    event_id: "1",
    price: 100,
  };

  const mockOnDisplayModal = jest.fn();
  const mockOnLoading = jest.fn();

  render(
    <Router>
      <PayPalButton
        event={mockEvent}
        count={1}
        user_ID="1"
        onDisplayModal={mockOnDisplayModal}
        onLoading={mockOnLoading}
      />
    </Router>
  );
});

// test("renders PayPal button and calls PayPal Buttons", async () => {
//   const mockEvent = {
//     event_id: "1",
//     price: 100,
//   };

//   const mockOnDisplayModal = jest.fn();
//   const mockOnLoading = jest.fn();

//   render(
//     <Router>
//       <PayPalButton
//         event={mockEvent}
//         count={1}
//         user_ID="1"
//         onDisplayModal={mockOnDisplayModal}
//         onLoading={mockOnLoading}
//       />
//     </Router>
//   );

//   // Simulate PayPal button rendering
//   await waitFor(() => {
//     expect(window.paypal.Buttons).toHaveBeenCalled();
//   });

//   // Check if the PayPal button was rendered
//   expect(window.paypal.Buttons).toHaveBeenCalledTimes(1);
// });

// test("should handle PayPal onApprove flow", async () => {
//   const mockEvent = {
//     event_id: "1",
//     price: 100,
//   };

//   const mockOnDisplayModal = jest.fn();
//   const mockOnLoading = jest.fn();

//   // Mock PayPal's Buttons' `onApprove` and `createOrder`
//   window.paypal.Buttons.mockImplementation(() => ({
//     render: jest.fn((container) => {
//       const button = document.createElement("button");
//       container.appendChild(button); // Append button to the container
//     }),
//     createOrder: jest.fn(() => Promise.resolve("order-id")),
//     onApprove: jest.fn((data, actions) =>
//       Promise.resolve({
//         status: 200,
//         body: "order-id",
//       })
//     ),
//   }));

//   render(
//     <Router>
//       <PayPalButton
//         event={mockEvent}
//         count={1}
//         user_ID="1"
//         onDisplayModal={mockOnDisplayModal}
//         onLoading={mockOnLoading}
//       />
//     </Router>
//   );

//   // Simulate PayPal button click (approve flow)
//   const button = screen.getByRole("button");
//   fireEvent.click(button);

//   // Wait for approval to finish
//   await waitFor(() => {
//     expect(fetch).toHaveBeenCalledWith("/api/create_order", expect.any(Object));
//   });

//   // Check if onLoading and onDisplayModal were called after approval
//   expect(mockOnLoading).toHaveBeenCalled();
//   expect(mockOnDisplayModal).toHaveBeenCalled();
// });

// test("should handle PayPal button loading error", async () => {
//   const mockEvent = {
//     event_id: "1",
//     price: 100,
//   };

//   const mockOnDisplayModal = jest.fn();
//   const mockOnLoading = jest.fn();

//   // Mock PayPal's Buttons to throw an error during rendering
//   window.paypal.Buttons.mockImplementation(() => ({
//     render: jest.fn(() => {
//       throw new Error("PayPal button failed to load");
//     }),
//   }));

//   render(
//     <Router>
//       <PayPalButton
//         event={mockEvent}
//         count={1}
//         user_ID="1"
//         onDisplayModal={mockOnDisplayModal}
//         onLoading={mockOnLoading}
//       />
//     </Router>
//   );

//   // Wait for fetchScript to be called
//   await waitFor(() => {
//     expect(window.paypal.Buttons).toHaveBeenCalled();
//   });

//   // Check if the error was caught
//   expect(console.error).toHaveBeenCalledWith(
//     expect.stringContaining("PayPal button failed to load")
//   );
// });
