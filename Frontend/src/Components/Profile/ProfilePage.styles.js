import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 100vh;
  //background-color: red;
  //justify-content: center;
  align-items: center;
`;

export const Summary = styled.div`
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  //background-color: aliceblue;
`;
export const ProfileImage = styled.img`
  width: 10vw; /* Adjust size as needed */
  height: 20vh;
  border-radius: 50%; /* This makes the image circular */
  object-fit: cover; /* Ensures the image fits within the circular shape */
  border: 2px solid #ddd;
  align-items: center; /* Optional: adds a border around the image */
  display: flex;
  justify-content: center;
  //flex-direction: column;
`;

export const EventsGrp = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vh;
`;

export const Count = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 2vw;
`;
