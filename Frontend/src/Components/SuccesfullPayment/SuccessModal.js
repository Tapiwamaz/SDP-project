import React from 'react';
import styled from 'styled-components';
const Modal = styled.div`
  position: fixed; /* Positioning fixed to cover the whole page */
  z-index: 100; /* High z-index to make it appear on top of other elements */
  top: 0; /* Position it at the top */
  left: 0; /* Position it at the left */
  width: 50%; /* Full width */
  height: 50%; /* Full height */
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

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
`;
export default function SuccessModal({ showModal, setShowModal }) {
  return showModal ? (
    <Modal>
      <ModalContent>
        <ImageContainer>
          {/* Place your image here */}
          <img
            src="your-image-url"
            alt="Success"
            style={{ width: "100%", height: "100%" }}
          />
        </ImageContainer>
        <h2>Congratulations!</h2>
        <p>You have successfully completed your payment.</p>
        <Button onClick={() => (window.location.href = "/")}>
          Go to Homepage
        </Button>
        <Button onClick={() => (window.location.href = "/my-tickets")}>
          Go to My Tickets
        </Button>
      </ModalContent>
      {/* <Button onClick={() => setShowModal(false)}>Close</Button> */}
    </Modal>
  ) : null;
}