import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const PayPalButton = ({event,count,user_ID}) => {
    const navigate = useNavigate();
    const paypal = useRef();
  const submitTicket = async () => {
    fetch("api/BookTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventID: event.eventID,
        userID: user_ID,
        ticketQuantity: count,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/", { state: { amount: count, event } });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

    useEffect(() => {
        window.fetchScript = (url) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.onload = () => resolve();
                script.onerror = () => reject('Error loading script.');
                document.head.appendChild(script);
            });
        };

        const paypal_sdk_url = "https://www.paypal.com/sdk/js";
        const client_id = process.env.REACT_APP_CLIENT_ID;
        const currency = "USD";
        const intent = "capture";

        window.fetchScript(paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent)
            .then(() => {
                window.paypal.Buttons({
                    onClick: (data) => {
                        // Custom JS here
                    },
                    style: {
                        shape: 'rect',
                        color: 'gold',
                        layout: 'vertical',
                        label: 'paypal'
                    },
                    createOrder: function(data, actions) {
                        return fetch("/api/create_order", {
                            method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
                            body: JSON.stringify({ "intent": intent, "amount": event.price * count })
                        })
                        .then((response) => response.json())
                        .then((order) => { return order.id; });
                    },
                    onApprove: function(data, actions) {
                        let order_id = data.orderID;
                        return fetch("/api/complete_order", {
                            method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
                            body: JSON.stringify({
                                "intent": intent,
                                "order_id": order_id
                            })
                        })
                        .then((response) => response.json())
                        .then((order_details) => {
                            console.log(order_details);
                            submitTicket();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    },
                    onCancel: function (data) {
                        // Order cancelled!
                    },
                    onError: function(err) {
                        console.log(err);
                    }
                }).render(paypal.current);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default PayPalButton;