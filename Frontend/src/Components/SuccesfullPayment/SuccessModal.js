import React from "react";
import styled from "styled-components";
import { BookButton } from "../EventDisplay/EventDisplay.style";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

import womanHighFive from "../../Images/WomenHighFive.svg"

const Modal = styled.div`
  position: fixed; /* Positioning fixed to cover the whole page */
  z-index: 100; /* High z-index to make it appear on top of other elements */
  top: 0; /* Position it at the top */
  left: 0; /* Position it at the left */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  display: flex; /* To center the modal content */
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
`;
export default function SuccessModal({ showModal, setShowModal }) {
  const navigate = useNavigate();
  return showModal ? (
    <Modal  data-testid="success-modal">
      <Confetti />
      <ModalContent>
        <ImageContainer>
          <img src={womanHighFive} alt="Success" style={{ width: "100%", height: "100%" }} />
        </ImageContainer> 
        <h2>Congratulations!</h2>
        <p>You have successfully completed your payment.</p>
        <BookButton
          style={{
            width: "100%",
          }}
          onClick={() => setShowModal(false)}
        >
          Go to Homepage
        </BookButton>
        <BookButton
          style={{
            width: "100%",
          }}
          onClick={() => navigate("/myBooking")}
        >
          Go to My Tickets
        </BookButton>
      </ModalContent>
      {/* <Button onClick={() => setShowModal(false)}>Close</Button> */}
    </Modal>
  ) : null;
}
