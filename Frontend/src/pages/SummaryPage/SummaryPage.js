
import { CostSummary, SummaryPages, CardSummary } from "./SummaryPage.style";
import { useLocation } from "react-router";
import { Page } from "../../Components/HomePage/HomePage.styles";
import eventImage from "../../Images/ds.jpeg";
import AsideDesktop from "../../Components/AsideDesktop/AsideDesktop";
import Header from "../../Components/Header/Header";
import PayPalButton  from "../../Components/PayPalButton/PaypalButton";
import { BookButton } from "./SummaryPage.style";
import SuccessModal from "../../Components/SuccesfullPayment/SuccessModal";
import React, { useState } from 'react';
export default function SummaryPage() {
  const [showmodal, setShowmodal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 const submitTicket = async (event, count, user_ID) => {

  setIsLoading(true);
   fetch("api/BookTicket", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       eventID: event.event_id,
       userID: user_ID,
       ticketQuantity: count,
     }),
   })
     .then((res) => {
       setShowmodal(true);
       return res.json();
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 };

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

          {event.price == 0 ? (
            <BookButton
              onClick={() =>
                submitTicket(event, amount, "fMgS0KN8UBXu9uW63wAfzfxPfXy1")
              }
              full={false}
            >
              Book
            </BookButton>
          ) : (
            <PayPalButton
              event={event}
              count={amount}
              user_ID={"fMgS0KN8UBXu9uW63wAfzfxPfXy1"}
            ></PayPalButton>
          )}
        </SummaryPages>
      </Page>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            zIndex: 100,
          }}
        />
      )}
      {showmodal && <SuccessModal showModal={showmodal} setShowModal={setShowmodal} />}
      <SuccessModal showModal={showmodal} setShowModal={setShowmodal} />
    </>
  );
}
