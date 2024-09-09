import React from "react";
import { CostSummary, PayButton,  SummaryPages } from "./SummaryPage.style";
import { useLocation } from "react-router";
import { Page } from "../../Components/HomePage/HomePage.styles";

import EventSlider from "../../Components/EventsSlider/EventSlider";
import AsideDesktop from "../../Components/AsideDesktop/AsideDesktop";
import Header from "../../Components/Header/Header";
export default function SummaryPage() {
  const event = useLocation().state.event;
  const amount = useLocation().state.amount;
  console.log(event);
  console.log(amount);
  return (
    <>
    <Header />
    <Page style={{
      // height: "100%",
    }}>
      <AsideDesktop />
      <SummaryPages>
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
          {amount}
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
          <strong>R{event.price * amount}</strong>
        </p>
      </CostSummary>
      <PayButton>Pay Now</PayButton>
    </SummaryPages>
    </Page>
    
    </>
    
  );
}
