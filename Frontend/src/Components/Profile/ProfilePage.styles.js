import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 250px;
  padding-bottom: 5vh;
  font-family: "Khula", sans-serif;
  overflow-x: hidden;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  /* Fixed height for desktop landscape */
  @media (max-width: 480px) {
    height: 100%;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 3px;
  gap: 20px;
  padding: 10px;
  width: 100%;
  //font-weight: 400;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
  }
`;

export const PictureWrapper = styled.div`
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
  height: fit-content;
  width: 100%;

  h2 {
    font-size: 1.2rem; /* Smaller font size for landscape dropdown */
    // font-weight: 300; /* Lighter font weight */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for tablets */
    h2 {
      font-size: 1.4rem; /* Adjust font size for tablets */
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem; /* Larger size for mobile */
    }
  }
`;

export const ProfileImage = styled.img`
  width: 8vw; /* Smaller width for landscape mode */
  height: 8vw;

  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;

  input:hover {
    border-color: red;
    border: 3px solid;
  }

  @media (max-width: 768px) {
    width: 15vw; /* Adjust size for tablets */
    height: 15vw;
  }

  @media (max-width: 480px) {
    width: 25vw;
    height: 25vw; /* Keep it square for mobile */
  }

  @media (min-width: 768px) {
    width: 170px; /* Adjust size for desktop landscape */
    height: 170px;
    margin-top: 20px;
  }
`;

export const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 5px;
  color: black;
  // border-radius: 10px;
  padding: 2px 8px;
  width: inherit;
  height: fit-content;
  justify-content: center;

  h3 {
    margin: 0;
    line-height: 1.2;
    font-size: 0.9rem; /* Smaller font for desktop dropdown */
    font-weight: 400;
  }

  @media (max-width: 480px) {
    align-items: center;
    width: 100%;
    gap: 8px;
    h3 {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
`;

export const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: inherit;
  gap: 10px;

  @media (max-width: 480px) {
    align-items: center;
    gap: 0px;
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: inherit;
  align-items: left;
  justify-content: center;

  input {
    width: 90%;
    border-radius: 1.35rem;
    padding: 2%;
  }
  @media (max-width: 480px) {
    align-items: center;
    font-size: 1.2rem;
  }
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 8px;
  height: 30px;
  padding-bottom: 30px;

  h4 {
    font-size: 0.9rem; /* Smaller font size */
    font-weight: 400;
    padding-top: 5px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    h4 {
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%; /* Full width for tablets */
    padding: 5vw;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 3px;
  }
`;

export const Email = styled.div`
  display: flex;
  flex-direction: column;
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
    font-weight: 400;
    // font-weight: 300; /* Lighter font */
    font-size: 1rem; /* Default size for desktop */

    @media (max-width: 480px) {
      font-size: 1.2rem; /* Smaller font size for mobile */
    }
  }

  @media (max-width: 480px) {
    padding-top: 1.5vh; /* Smaller padding for mobile */
  }
`;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  padding-top: 2vh;
  textarea {
    width: 90%;
    border-radius: 1.35rem;
    border: 2px solid;
    padding: 2%;
  }

  button {
    background-color: var(--primary);
    color: white;
    width: fit-content;
    border-radius: 1.35rem;
    font-size: 0.85rem;
  }
  h4 {
    margin: 0;
    padding-top: 1vh;
    line-height: 1.2;
    font-weight: 400;
    //font-weight: 300;
    font-size: 1rem; /* Default size for desktop */

    @media (max-width: 480px) {
      width: 90vw;
      padding-top: 1.5vh;
      font-size: 1.2rem; /* Smaller font for mobile */
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
    padding-top: 1.5vh;
    font-size: 1.2rem; /* Smaller font for mobile */
    textarea {
      width: 90%;
      border-radius: 1.35rem;
    }
    button {
      background-color: var(--primary);
      color: white;
      width: 100%;
    }
  }
`;

export const ButtonGrp = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: inherit;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20%;
  align-items: center;
  width: inherit;
  padding: 8px;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #647eb4;
  }

  @media (max-width: 480px) {
    padding: 3%;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  color: black;
  //font-weight: 300;

  @media (max-width: 480px) {
    font-size: 1.2rem;
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
    height: 48px;
    width: 48px;
  }
`;

export const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: fit-content;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    width: 97%;
    padding-left: 5%;
    padding-right: 5%;
  }
`;
