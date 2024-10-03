import { CostSummary, SummaryPages, CardSummary } from "./Summary.style";
import PayPalButton from "../../Components/PayPalButton/PaypalButton";
import { BookButton } from "./Summary.style";
import SuccessModal from "../../Components/SuccesfullPayment/SuccessModal";
import React, { useState } from "react";
import { auth } from "../../firebase_config";
import { Loader } from "../SecurityModal/SecurityModal.styles";

export default function Summary({ event }) {
  // console.log(event);
  const user_id = auth?.currentUser?.uid;
  // console.log(user_id);
  const [showmodal, setShowmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const amount = event.count;
  // console.log(amount);
  const DisplayModal = () => {
    setShowmodal(true);
    setIsLoading(false);
  };
  const DisplayLoad = () => {
    setIsLoading(true);
  };

  const submitTicket = async (event, count, user_ID) => {
    setIsLoading(true);
    // console.log("submitting ticket");
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
      .then((res) => res.json())
      .then((data) => {
        // console.log("Success:", data);
        setShowmodal(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // console.log(formatDate(event.date));
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    return `${day} ${month} ${year}`; // change this line to change the order
  }
  // console.log(event.price == 0);
  return (
    <>
      <SummaryPages>
        <CardSummary>
          <div>
            <img src={event.image_url} alt="description" />
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
            onClick={() => submitTicket(event, amount, user_id)}
            style={{
              background: "#18336c",
            }}
            data-testid="book-button"
            // full={false}
          >
            Book
          </BookButton>
        ) : (
          <PayPalButton
            event={event}
            count={amount}
            user_ID={user_id}
            onDisplayModal={DisplayModal}
            onLoading={DisplayLoad}
          ></PayPalButton>
        )}
      </SummaryPages>
      {isLoading && (
        <div
          data-testid="loading"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            zIndex: 100,
          }}
        >
          <Loader />
        </div>
      )}

      {showmodal && (
        <SuccessModal
          showModal={showmodal}
          setShowModal={setShowmodal}
          data-testid="success-modal"
        />
      )}
    </>
  );
}
