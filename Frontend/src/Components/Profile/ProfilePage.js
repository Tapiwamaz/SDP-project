import React from "react";
import {
  Wrapper,
  ProfileImage,
  Summary,
  EventsGrp,
  Count,
} from "./ProfilePage.styles";
import profileimg from "../../Images/profileimg.jpg";
const profile = () => {
  return (
    <Wrapper>
      <Summary>
        <ProfileImage src={profileimg} />
        <h2>Emily Smith</h2>
        <Count>
          <EventsGrp>
            <h3>26</h3>
            <h3>Events Done</h3>
          </EventsGrp>

          <EventsGrp>
            <h3>38</h3>
            <h3>Events Attended</h3>
          </EventsGrp>
        </Count>
      </Summary>
    </Wrapper>
  );
};

export default profile;
