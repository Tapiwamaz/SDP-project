import { createEventDB, updateEventDB,delay } from "./CreateEvent";
import { toast, ToastContainer } from "react-toastify";

export const handleNextButtonClick = async (
  eventDetailsT,
  eventRefsT,
  imageT,
  locations,
  eventCollection,
  setLoader,
  setSubmitted
) => {
  console.log(eventDetailsT);
  if (!eventDetailsT.name) {
    // Handle missing event name
    eventRefsT.eventName.current.classList.add("unfilled-input");
    eventRefsT.eventName.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events name");
    return;
  }

  if (!eventDetailsT.date) {
    // Handle missing event date
    eventRefsT.eventDate.current.classList.add("unfilled-input");
    eventRefsT.eventDate.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events date");
    return;
  }

  if (isNaN(new Date(eventDetailsT.date))) {
    eventRefsT.eventDate.current.classList.add("unfilled-input");
    eventRefsT.eventDate.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    toast.warn("Please a vaild date");
    return;
  }

  if (!eventDetailsT.start_time) {
    // Handle missing event start time
    eventRefsT.eventStartTime.current.classList.add("unfilled-input");
    eventRefsT.eventStartTime.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events start time");
    return;
  }

  if (!eventDetailsT.end_time) {
    // Handle missing event end time
    eventRefsT.eventEndTime.current.classList.add("unfilled-input");
    eventRefsT.eventEndTime.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events end time");
    return;
  }

  // check type , venue type , location and descrption
  if (!eventDetailsT.type) {
    // Handle missing event type
    eventRefsT.eventType.current.classList.add("unfilled-input");
    eventRefsT.eventType.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select your event type");
    return;
  }

  if (!eventDetailsT.venue_type) {
    // Handle missing event venue type
    eventRefsT.eventVenueType.current.classList.add("unfilled-input");
    eventRefsT.eventVenueType.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select the event venue type");
    return;
  }
  if (!eventDetailsT.location) {
    // Handle missing event location
    eventRefsT.eventLocation.current.classList.add("unfilled-input");
    eventRefsT.eventLocation.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select your events location");
    return;
  }

  if (!eventDetailsT.description) {
    // Handle missing event description
    eventRefsT.eventDescription.current.classList.add("unfilled-input");
    eventRefsT.eventDescription.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events description");
    return;
  }

  // check image and price
  if (!eventDetailsT.price) {
    eventRefsT.eventTicketPrice.current.classList.add("unfilled-input");
    eventRefsT.eventTicketPrice.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events ticket price");
    return;
  }
  let price = parseFloat(eventDetailsT.price);
  eventDetailsT.price = price;

  if (!eventDetailsT.eventPicture && !eventDetailsT.image_url) {
    // eventRefsT.event.current.classList.add("unfilled-input");
    eventRefsT.eventPicture.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please upload a picture");
    return;
  }

  setLoader(true);

  try {
    if (eventDetailsT.event_id) {
      updateEventDB(eventDetailsT, eventCollection, imageT, locations);
    } else {
      createEventDB(eventDetailsT, eventCollection, imageT, locations);
    }

    await delay(5000);
    setLoader(false);
    setSubmitted(true);
  } catch (e) {
    setLoader(false);
    toast.error("Something went wrong");
  }
};
