import React from "react";
import {
  CostSummary,
  PayButton,
  SummaryPages,
  CardSummary,
} from "./SummaryPage.style";
import { useLocation } from "react-router";
import { Page } from "../../Components/HomePage/HomePage.styles";
import eventImage from "../../Images/ds.jpeg";
// import EventSlider from "../../Components/EventsSlider/EventSlider";
import AsideDesktop from "../../Components/AsideDesktop/AsideDesktop";
import Header from "../../Components/Header/Header";
export default function SummaryPage() {
  const event = useLocation().state.event;
  const amount = useLocation().state.amount;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    return `${day} ${month} ${year}, ${time}`; // change this line to change the order
  }

  function Pay() {
  }

  return (
    <>
      <Header />
      <Page
        style={
          {
            // height: "100%",
          }
        }
      >
        <AsideDesktop />
        <SummaryPages>
          <CardSummary>
            <div>
              <img src={eventImage} alt="description" />
            </div>
            <div className="textContainer">
              <h3>{event.name}</h3>
              <p>{formatDate(event.date)}</p>
              <p>{amount}</p>
              <p>{event.location}</p>
            </div>
          </CardSummary>
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
          <PayButton onClick={Pay}>Pay Now</PayButton>
          <div id = "payment"></div>
        </SummaryPages>
      </Page>
    </>
  );
}
