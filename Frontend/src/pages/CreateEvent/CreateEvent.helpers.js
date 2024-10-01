import { v4 } from "uuid";
import {
  formatDateToISO,
  sendNotification,
} from "../../Components/Notifications/CreateNotifications";
import {
  createEventDB,
  updateEventDB,
  delay,
  fetchStorage,
} from "./CreateEvent";
import { toast } from "react-toastify";

export const handleNextButtonClick = async (
  eventDetailsT,
  eventRefsT,
  imageT,
  locations,
  eventCollection,
  setLoader,
  setSubmitted,
  db,
  auth
) => {
  if (!eventDetailsT.name || eventDetailsT.name == "") {
    // Handle missing event name
    eventRefsT.eventName.current.classList.add("unfilled-input");
    eventRefsT.eventName.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events name");
    return;
  }

  // check type , venue type , location and descrption
  if (!eventDetailsT.type || eventDetailsT.type == "") {
    // Handle missing event type
    eventRefsT.eventType.current.classList.add("unfilled-input");
    eventRefsT.eventType.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select your event type");
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

  if (!eventDetailsT.venue_type || eventDetailsT.venue_type == "") {
    // Handle missing event venue type
    eventRefsT.eventVenueType.current.classList.add("unfilled-input");
    eventRefsT.eventVenueType.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select the event venue type");
    return;
  }
  if (!eventDetailsT.location || eventDetailsT.location == "") {
    // Handle missing event location
    eventRefsT.eventLocation.current.classList.add("unfilled-input");
    eventRefsT.eventLocation.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please select your events location");
    return;
  }

  if (
    !eventDetailsT.start_time ||
    eventDetailsT.start_time == "" ||
    new Date("2024-09-27T" + eventDetailsT.start_time) == "Invalid Date"
  ) {
    // Handle missing event start time
    eventRefsT.eventStartTime.current.classList.add("unfilled-input");
    eventRefsT.eventStartTime.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events start time");
    return;
  }

  if (
    !eventDetailsT.end_time ||
    eventDetailsT.end_time == "" ||
    new Date("2024-09-27T" + eventDetailsT.end_time) == "Invalid Date"
  ) {
    // Handle missing event end time
    eventRefsT.eventEndTime.current.classList.add("unfilled-input");
    eventRefsT.eventEndTime.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events end time");
    return;
  }

  let temp = new Date("2024-09-27T" + eventDetailsT.end_time);
  temp = temp - new Date("2024-09-27T" + eventDetailsT.start_time);
  if (temp <= 0) {
    // Handle missing event type
    eventRefsT.eventStartTime.current.classList.add("unfilled-input");
    eventRefsT.eventStartTime.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    eventRefsT.eventEndTime.current.classList.add("unfilled-input");
    toast.warn("Please choose valid start and end times");
    return;
  }

  // check  price
  if (!eventDetailsT.price || eventDetailsT.price == "") {
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

  if (!eventDetailsT.description || eventDetailsT.description == "") {
    // Handle missing event description
    eventRefsT.eventDescription.current.classList.add("unfilled-input");
    eventRefsT.eventDescription.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    toast.warn("Please enter your events description");
    return;
  }

  if (!eventDetailsT.eventPicture && !eventDetailsT.image_url) {
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
      const userData = fetchStorage("userData");
      let notification = {
        message: `${eventDetailsT.name} has been edited by the oganizer: It will need to be re-approved`,
        time: formatDateToISO(new Date()),
        notification_id: v4(),
        name: userData.name,
        organizer_id: auth?.currentUser?.uid,
        event_id: eventDetailsT.event_id,
        notification_type: "edit",
        image_url: userData.imageURL,
      };

      sendNotification(notification, db);
      let bookingID = null;
      console.log(eventDetailsT);
      try {
        bookingID = await getBookingID(
          eventDetailsT.location,
          eventDetailsT.date,
          eventDetailsT.start_time,
          eventDetailsT.end_time
        );
      } catch (e) {
        console.error("Error getting booking", e);
      }
      console.log(bookingID);
      if (bookingID) {
        deleteBooking(bookingID);
      }
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
export const deleteBooking = async (bookingID) => {
  const secretKey = process.env.REACT_APP_X_API_KEY;
  try {
    const response = await fetch(
      `https://wits-infrastructure-management.web.app/api/bookings/${bookingID}`,
      {
        method: "DELETE",
        headers: {
          "X-API-KEY": secretKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting booking");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error deleting booking:", error);
    return null;
  }
};

export const fetchVenues = async () => {
  const secretKey = process.env.REACT_APP_X_API_KEY;

  try {
    const response = await fetch(
      "https://wits-infrastructure-management.web.app/api/venues/?isClosed=False",
      {
        method: "GET",
        headers: {
          "X-API-KEY": secretKey, // or another header name depending on the API
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error fetching venues from infrastructure");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is JSON
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }
};

export const getBookingID = async (
  venueId,
  bookingDate,
  startTime,
  endTime
) => {
  const secretKey = process.env.REACT_APP_X_API_KEY;
  try {
    const response = await fetch(
      `https://wits-infrastructure-management.web.app/api/bookings/findByField?venueID=${venueId}&bookingDate=${bookingDate}&bookingStartTime=${startTime}&bookingEndTime=${endTime}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": secretKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching booking details");
    }

    const data = await response.json();

    if (data.length > 0) {
      return data[0].id;
    } else {
      console.error("No booking found for the given details");
      return null
    }
  } catch (error) {
    console.error("Error retrieving booking ID:", error);
    return null;
  }
};
