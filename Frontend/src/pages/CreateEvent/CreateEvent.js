import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import "./CreateEvent.css";

const CreateEvent = () => {
  return (
    <section className="wrapperCreateEvent">
      <nav className="navBarCreateEvents">
        <ArrowLeftCircleIcon width={40}/>
        <h3>Event Details</h3>
      </nav>
      <form className="form" multi-step-form></form>
    </section>
  );
};

export default CreateEvent;
