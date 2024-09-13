import React from "react";
import {
  Wrapper,
  ProfileImage,
  Summary,
  EventsGrp,
  Count,
  Text,
  Rating,
  Details,
  Email,
  About,
  ButtonWrapper,
  LeftSection,
  ButtonGrp,
  Bottom,
} from "./ProfilePage.styles";
import profileimg from "../../Images/profileimg.jpg";
import {
  StarIcon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Header from "../Header/Header";

const profile = () => {
  return (
    <Wrapper>
      <Summary>
        <ProfileImage src={profileimg} />
        <h2>Emily Smith</h2>
        <Count>
          <EventsGrp>
            {" "}
            <h3>26</h3>
            <h3>Events Done</h3>
          </EventsGrp>

          <EventsGrp>
            {" "}
            <h3>41</h3>
            <h3>Events Attended</h3>
          </EventsGrp>
        </Count>
        <Rating>
          <StarIcon
            style={{ height: "3vh", width: "3vw", color: "black" }}
          ></StarIcon>{" "}
          {/* Star Icon */}
          {/* <h4 style={{ color: "#676363" }}>4.0 rating from 48 users</h4> */}
          <h4 style={{ color: "black" }}>4.0 rating from 48 users</h4>
        </Rating>
      </Summary>

      <Details>
        <Email>
          <h4 style={{ color: "black" }}>Email</h4>
          <h4 style={{ color: "#676363" }}>emily.smith@eventsgrp.co.za</h4>
        </Email>

        <About>
          <h4>About</h4>
          <h4 style={{ color: "#676363" }}>
            I'm an organized and passionate event planner who loves turning
            ideas into unforgettable experiences. With a keen eye for detail and
            a talent for bringing people together, I use this app to create
            seamless, personalized events that leave a lasting impression.
          </h4>
        </About>
      </Details>
      <ButtonGrp>
        <ButtonWrapper>
          <LeftSection>
            <BellIcon
              style={{ height: "25px", width: "22px", color: "black" }}
            />

            <Text>Notifications</Text>
          </LeftSection>
          <ArrowRightIcon
            style={{ height: "25px", width: " 22px", color: "black" }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <LeftSection>
            <ArrowRightStartOnRectangleIcon
              style={{ height: "25px", width: "22px", color: "black" }}
              isLogout={true}
            >
              {/* <LogoutIcon /> */}
            </ArrowRightStartOnRectangleIcon>

            <Text isLogout={true}>Log Out</Text>
          </LeftSection>
          <ArrowRightIcon
            style={{ height: "25px", width: "22px", color: "black" }}
          />
        </ButtonWrapper>
      </ButtonGrp>
    </Wrapper>
  );
};

export default profile;
