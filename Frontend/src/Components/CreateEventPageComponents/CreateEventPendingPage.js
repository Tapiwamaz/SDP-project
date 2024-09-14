import { NavLink } from "react-router-dom";
import WomenSvg from "../../Images/WomenHighFive.svg";
import Header from "../Header/Header";

const CreateEventPendingPage = ({ update }) => {
  return (
    <section className="wrapperCreateEvent">
      <Header />
      <section className="createEventsContainer pendingPage">
        {!update ? (
          <h3 className="textAlign">
            Your are now officialy on the waitlist - stay tuned!
          </h3>
        ) : (
          <h3 className="textAlign" data-testid="pendingUpdate">
            Your event has been updated  - stay tuned!
          </h3>
        )}
        <p className="textAlign subText">
          You will be notified as soon your event is approved.
        </p>
        {/* <NavLink to={"/"} className="btn"> Go back to home</NavLink> */}
        <NavLink to={"/"} className="btn goHomeBtn">
          {" "}
          Go back to home
        </NavLink>
        {/* <div> */}
        <img id="pendingPageImg" src={WomenSvg} alt="women high five" />
      </section>
    </section>
  );
};

export default CreateEventPendingPage;
