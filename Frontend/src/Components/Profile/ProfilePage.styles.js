import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 100vh;
  align-items: center;
  padding-top: 3vw;
  overflow-x: hidden;

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
    padding-top: 3vh;
  }
`;

export const Summary = styled.div`
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  height: 50vh;

  h2 {
    font-size: 2rem; /* Desktop size */
    font-weight: 300; /* Lighter font weight */
    @media (max-width: 480px) {
      font-size: 1.5rem;
      align-items: center; /* Smaller size for iPhone */
    }
  }

  @media (max-width: 480px) {
    padding-top: 4vh;
    gap: 2vh;
    align-items: center; /* Increase gap for better spacing on smaller screens */
  }
`;

export const ProfileImage = styled.img`
  width: 10vw;
  height: 20vh;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;

  @media (max-width: 480px) {
    width: 25vw;
    height: 25vw; /* Keep it square */
  }
`;

export const EventsGrp = styled.div`
  width: 180px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  /* background-color: var(--primary);
  opacity: 80%; */
  color: black;
  border-radius: 15px;
  align-items: center;
  padding-top: 10px;
  h3 {
    margin: 0;
    padding: 5px;
    line-height: 1.2; /* Adjusts spacing between number and label */
    font-size: 1.2rem; /* Desktop size */
    font-weight: 300; /* Lighter font */
    align-items: center;
    @media (max-width: 480px) {
      font-size: 1rem; /* Smaller size for mobile */
      width: 150px;
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    /* Reduce gap for smaller screens */
  }
`;

export const Count = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;

  @media (max-width: 480px) {
    gap: 10px;
    width: 350px;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
`;

export const Rating = styled.div`
  width: 250px;
  display: flex;
  padding-top: 10px;
  padding-bottom: 40px;
  flex-direction: row;
  align-items: center;
  height: 60px;
  gap: 10px;

  h4 {
    font-size: 1.1rem; /* Desktop size */
    font-weight: 300; /* Lighter font */
    @media (max-width: 480px) {
      font-size: 0.9rem; /* Smaller size for mobile */
    }
  }

  @media (max-width: 480px) {
    width: 200px;
    height: auto;
    padding-top: 20px;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 30vw;
  align-items: flex-start;
  padding-left: 80px;
  gap: 20px;

  @media (max-width: 480px) {
    width: 90%;
    padding-left: 3px;
  }
`;

export const Email = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-top: 2vh;
  width: 25vw;
  /* border: 1px solid var(--primary);
  border-radius: 8px; 
  background-color: var(--primary);
  opacity: 80%; */
  h4 {
    margin: 0;
    padding-top: 1vh;
    line-height: 1.2;
    font-weight: 300; /* Lighter font */
    justify-content: center;
    font-size: 1rem; /* Desktop size */

    @media (max-width: 480px) {
      font-size: 0.85rem; /* Smaller size for mobile */
    }
  }

  @media (max-width: 480px) {
    padding-top: 1.5vh;
  }
`;

export const About = styled.div`
  display: flex;
  width: 25vw;
  flex-direction: column;
  margin: 0;
  padding-top: 2vh;
  margin-bottom: 2vh;
  /* border: 1px solid var(--primary); /* Adds a thin grey border */
  /* border-radius: 8px;
  background-color: var(--primary);
  opacity: 80%;  */
  color: black;
  h4 {
    margin: 0;
    padding-top: 1vh;
    line-height: 1.2;
    font-weight: 300; /* Lighter font */
    text-align: justify;
    font-size: 1rem; /* Desktop size */

    @media (max-width: 480px) {
      width: 90vw;
      padding-top: 1.5vh;
      font-size: 0.85rem; /* Smaller size for mobile */
      text-align: left;
      padding-right: 40px;
      text-align: justify;
    }
  }
`;

export const ButtonGrp = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 480px) {
    width: 90vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #8b99b5;
  }

  @media (max-width: 480px) {
    padding: 8px 0;
    padding-right: 10px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Spacing between the icon and text

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  color: black;
  font-weight: 300; /* Lighter font */

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Icon = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;

  @media (max-width: 480px) {
    height: 28px; /* Increased size for mobile */
    width: 28px; /* Increased size for mobile */
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  height: fit-content;
`;
