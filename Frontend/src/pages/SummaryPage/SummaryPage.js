import React from "react";
import { CostSummary, PayButton,  SummaryPages } from "./SummaryPage.style";

export default function SummaryPage() {
  const event = {
    number: 2,
    price: "500",
  };
  return (
    <SummaryPages>
      <h1>Nathan's Card</h1>
      <CostSummary>
        <h3
          style={{
            width: "100%",
          }}
        >
          Tickets
        </h3>
        <p
          style={{
            width: "50%",
          }}
        >
          Number of tickets
        </p>
        <p
          style={{
            width: "50%",
          }}
        >
          {event.number}
        </p>

        <p
          style={{
            width: "50%",
          }}
        >
          Amount per ticket
        </p>
        <p
          style={{
            width: "50%",
          }}
        >
          R{event.price}
        </p>

        <p
          style={{
            width: "75%",
          }}
        >
          <strong>Total Amount Payable </strong>
        </p>
        <p
          style={{
            width: "25%",
          }}
        >
          <strong>R{event.price * event.number}</strong>
        </p>
      </CostSummary>
      <PayButton>Pay Now</PayButton>
    </SummaryPages>
  );
}
