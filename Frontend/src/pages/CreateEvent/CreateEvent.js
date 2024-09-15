import React from "react";
// icons
import {
  ArrowLeftCircleIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

// svgs
import PendingSvg from "../../Images/Pending.svg";

//css
import "./CreateEvent.css";
// react
import { useEffect, useRef, useState } from "react";
// toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//rrd
import { useNavigate } from "react-router-dom";
//mockdate
import {
  mockEventTypes,
  mockLocations,
  mockVirtualLocations,
} from "../../MockData/MockData";
//firebase work
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../firebase_config";
//components
import Header from "../../Components/Header/Header";
// uuid
import { v4 } from "uuid";
import CreateEventPendingPage from "../../Components/CreateEventPageComponents/CreateEventPendingPage";

export const handleChangeEventDetails = (
  detail,
  detailType,
  setEventDetailsT
) => {
  setEventDetailsT((prevDetails) => ({
    ...prevDetails,
    [detailType]: detail,
  }));
};

export const loadLocations = (setALocations, locations) => {
  setALocations(locations);
};

export const handleImageChange = (
  event,
  setImageSrc,
  setImage,
  setImageError
) => {
  const file = event.target.files[0];

  if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > img.height) {
        setImage(file);
        setImageError(null);
        // Create a preview URL for the image
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageError("Please upload a landscape image.");
        setImage(null);
      }
      URL.revokeObjectURL(img.src); // Clean up memory
    };
  } else {
    setImageError("Something went wrong uploading your picture");
  }
};
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    setLoader("false");
    toast.error("Something went wrong");
  }
};

export const createEventDB = async (
  newEvent,
  eventCollection,
  imageT,
  locations
) => {
  try {
    const capacity = locations.filter(
      (loc) => loc.location === newEvent.location
    )[0].capacity;

    const imageRef = ref(storage, `eventsImages/${imageT.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageT);
    const downloadURL = await getDownloadURL(snapshot.ref);

    newEvent.image_url = downloadURL;
    newEvent.capacity = capacity;
    newEvent.ticket_count = capacity;
    newEvent.event_id = v4();
    newEvent.active = true;
    // newEvent.approved = false;
    newEvent.approved = true;
    newEvent.status = "pending";
    delete newEvent.eventPicture;
    newEvent.user_id = "fMgS0KN8UBXu9uW63wAfzfxPfXy1";

    // Add image to bucket and event to Firestore
    await addDoc(eventCollection, newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event. Please try again.");
  }
};

export const updateEventDB = async (
  updatedEvent,
  eventCollection,
  imageT,
  locations
) => {
  console.log(updatedEvent);
  try {
    const capacity = locations.filter(
      (loc) => loc.location === updatedEvent.location
    )[0].capacity;
    updatedEvent.capacity = capacity;

    const oldImageUrl = updatedEvent.image_url;

    // If the old image URL exists, delete the old image from storage
    // this should only be done if there another image uploaded
    if (imageT.name) {
      if (oldImageUrl) {
        const oldImageRef = ref(storage, oldImageUrl);
        await deleteObject(oldImageRef);
      }

      const imageRef = ref(storage, `eventsImages/${imageT.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageT);
      const downloadURL = await getDownloadURL(snapshot.ref);
      updatedEvent.image_url = downloadURL;
    }

    const q = query(
      eventCollection,
      where("event_id", "==", updatedEvent.event_id)
    );
    delete updatedEvent.eventPicture;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = docSnapshot.ref;
      await updateDoc(docRef, updatedEvent);
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event. Please try again.");
  }
};

const CreateEvent = ({ inputEventDetails }) => {
  const navigate = useNavigate();
  // todays date to start date picker
  const todayDate = new Date().toISOString().split("T")[0];
  //preview image
  const [imgSrc, setImgSrc] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [hovered, setHovered] = useState(false);

  // new event details
  const [image, setImage] = useState(null);
  const [eventDetails, setEventDetails] = useState({});
  const [filterVenueType, setFilterVenueType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  // get DOM elements to dynamically change input fields
  const eventNameRef = useRef(null);
  const eventStartTimeRef = useRef(null);
  const eventEndTimeRef = useRef(null);
  const eventDateRef = useRef(null);
  const eventVenueTypeRef = useRef(null);
  const eventTypeRef = useRef(null);
  const eventLocationRef = useRef(null);
  const eventDescriptionRef = useRef(null);
  const eventTicketPriceRef = useRef(null);
  const eventPictureRef = useRef(null);

  const [eventRefs, setEventRefs] = useState({
    eventName: eventNameRef,
    eventStartTime: eventStartTimeRef,
    eventEndTime: eventEndTimeRef,
    eventVenueType: eventVenueTypeRef,
    eventDescription: eventDescriptionRef,
    eventDate: eventDateRef,
    eventTicketPrice: eventTicketPriceRef,
    eventLocation: eventLocationRef,
    eventType: eventTypeRef,
    eventPicture: eventPictureRef,
  });

  const [availableLocations, setAvailableLocations] = useState([]);
  const [eventTypes, setEventTypes] = useState(mockEventTypes);

  // db variables
  const eventsCollectionRef = collection(db, "Events");

  /*-----------------------------------------------------------------------------------------------------------------*/
  // Functions

  useEffect(() => {
    // loadLocations(setAvailableLocations, mockLocations );
    setAvailableLocations(mockLocations);
    setEventTypes(mockEventTypes);
    if (inputEventDetails) {
      setImgSrc(inputEventDetails.image_url);
      setEventDetails(inputEventDetails);
    }
  }, []);

  /* ------------------------------------------------------------------------------------------------------------------------------------ 
  Functions
  ------------------------------------------------------------------------------------------------------------------------------------
  */

  if (submitted) {
    return <CreateEventPendingPage update={!!inputEventDetails} />;
  } else
    return (
      <section className="wrapperCreateEvent">
        {/* <ToastContainer /> */}

        {loader && (
          <div className="loader">
            <div className="centerLoader" />
          </div>
        )}
        <Header />

        <section className="createEventsContainer">
          <section className="desktopAside">
            <div className="formInfoContainer">
              <nav className="navBarCreateEvents" onClick={() => navigate(-1)}>
                <ArrowLeftCircleIcon
                  width={40}
                  className="backButtonCreateEvent"
                />
              </nav>
              <h4 data-testid="title">Create your event</h4>
              <p>Please fill in the all the fields in the form. </p>
            </div>
            <img
              className="createEventsSvg"
              src={PendingSvg}
              alt="pending"
            ></img>
          </section>

          <section className="inputs">
            {/* Image  */}
            {imgSrc && (
              // <>
              <img className="imageHolder" src={imgSrc} alt="Preview" />
            )}

            <div
              className="drop-file-container"
              style={{
                position: imgSrc ? "absolute" : "static",
                background: !imgSrc
                  ? "var(--primary)"
                  : hovered
                  ? "rgba(54, 69, 79,0.4)"
                  : "transparent",
                color: !imgSrc ? "white" : hovered ? "white" : "transparent",
              }}
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => setHovered(false)}
            >
              <input
                id="file-upload"
                className="input"
                type="file"
                accept="image/*"
                name="eventPicture"
                data-testid="pictureInput"
                ref={eventPictureRef}
                onChange={(e) => {
                  handleImageChange(e, setImgSrc, setImage, setImageError);
                  handleChangeEventDetails(
                    e.target.value,
                    "eventPicture",
                    setEventDetails
                  );
                }}
              ></input>
              <label htmlFor="file-upload" className="uploadMediaLabel">
                <div className="iconsMediaUpload">
                  <CameraIcon width={30} />
                  <div id="dividerLine" />
                  <VideoCameraIcon width={30} />
                </div>
                <strong>Drag and drop media here</strong>
                {imageError && (
                  <strong style={{ color: "red" }}>{imageError}</strong>
                )}
              </label>
            </div>

            {/* event name */}
            <label className="label" htmlFor="eventName">
              Event Name
            </label>
            <input
              className="input"
              name="eventName"
              data-testid="name"
              ref={eventNameRef}
              value={eventDetails.name || ""}
              onFocus={() =>
                eventNameRef.current.classList.remove("unfilled-input")
              }
              onChange={(e) =>
                handleChangeEventDetails(
                  e.target.value,
                  "name",
                  setEventDetails
                )
              }
            />

            <label className="label" htmlFor="eventDate">
              Date
            </label>
            <input
              className="input"
              type="date"
              data-testid="date"
              name="eventDate"
              ref={eventDateRef}
              min={todayDate}
              value={eventDetails.date || ""}
              onFocus={(e) => {
                eventDateRef.current.classList.remove("unfilled-input");
              }}
              onChange={(e) =>
                handleChangeEventDetails(
                  e.target.value,
                  "date",
                  setEventDetails
                )
              }
            ></input>

            {/* Time inputs */}
            <div className="doubleInputContainer">
              <div
                className="doubleInput"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label className="label" htmlFor="eventDate">
                  Start Time
                </label>
                <input
                  className="input"
                  type="time"
                  min="08:00"
                  data-testid="start_time"
                  name="eventStartTime"
                  ref={eventStartTimeRef}
                  value={eventDetails.start_time || ""}
                  onFocus={(e) => {
                    eventStartTimeRef.current.classList.remove(
                      "unfilled-input"
                    );
                  }}
                  onChange={(e) =>
                    handleChangeEventDetails(
                      e.target.value,
                      "start_time",
                      setEventDetails
                    )
                  }
                ></input>
              </div>

              <div
                className="doubleInput"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label className="label" htmlFor="eventDate">
                  End Time
                </label>
                <input
                  className="input"
                  value={eventDetails.end_time || ""}
                  type="time"
                  data-testid="end_time"
                  min="08:00"
                  placeholder="e.g 08:00"
                  ref={eventEndTimeRef}
                  name="eventEndTime"
                  onFocus={(e) => {
                    eventEndTimeRef.current.classList.remove("unfilled-input");
                  }}
                  onChange={(e) =>
                    handleChangeEventDetails(
                      e.target.value,
                      "end_time",
                      setEventDetails
                    )
                  }
                />
              </div>
            </div>

            {/* Event type */}
            <label className="label" htmlFor="eventType">
              Event Type
            </label>
            <datalist id="eventTypeList" data-testid="locationsList">
              {eventTypes.map((type, index) => (
                <option key={index} value={type} />
              ))}
            </datalist>

            <input
              className="input"
              name="eventType"
              list="eventTypeList"
              data-testid="type"
              placeholder="e.g Education"
              ref={eventTypeRef}
              value={eventDetails.type || ""}
              onFocus={() =>
                eventTypeRef.current.classList.remove("unfilled-input")
              }
              onChange={(e) => {
                handleChangeEventDetails(
                  e.target.value,
                  "type",
                  setEventDetails
                );
                if (e.target.value === "Online") {
                  setAvailableLocations(mockVirtualLocations);
                }
              }}
            />
            {/* Venue and location */}
            <div className="doubleInputContainer">
              {/* Venue type */}
              <div
                className="doubleInput"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label className="label" htmlFor="eventVenueType">
                  {eventDetails.type==="Online" ? "Platform" : "Venue Type"}
                </label>
                <input
                  className="input"
                  list="venueList"
                  data-testid="venue_type"
                  placeholder="e.g Lecture room"
                  ref={eventVenueTypeRef}
                  value={eventDetails.venue_type || ""}
                  onFocus={() =>
                    eventVenueTypeRef.current.classList.remove("unfilled-input")
                  }
                  name="eventVenueType"
                  onChange={(e) => {
                    handleChangeEventDetails(
                      e.target.value,
                      "venue_type",
                      setEventDetails
                    );
                    setFilterVenueType(e.target.value);
                  }}
                ></input>

                <datalist id="venueList" data-testid="locationsList">
                  
                  {
        
                    [...new Set(availableLocations.map(platform => platform.type))].map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
              </div>

              {/* Location */}
              <div
                className="doubleInput"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label className="label" htmlFor="eventLocation">
                  Location
                </label>
                <input
                  className="input"
                  list="locationsList"
                  data-testid="location"
                  onFocus={() =>
                    eventLocationRef.current.classList.remove("unfilled-input")
                  }
                  ref={eventLocationRef}
                  value={eventDetails.location || ""}
                  name="eventLocation"
                  onChange={(e) =>
                    handleChangeEventDetails(
                      e.target.value,
                      "location",
                      setEventDetails
                    )
                  }
                ></input>

                <datalist id="locationsList">
                  {availableLocations
                    .filter((x) => x.type === filterVenueType)
                    .map((loc) => (
                      <option value={loc.location} />
                    ))}
                </datalist>
              </div>
            </div>

            {/* Ticket Price  Label*/}
            <label className="label" htmlFor="eventTicketPrice">
              Ticket Price
            </label>
            {/* Ticket Price  input*/}
            <input
              className="input"
              type="number"
              ref={eventTicketPriceRef}
              data-testid="price"
              value={eventDetails.price || null}
              placeholder="e.g R 50"
              step={10}
              onFocus={() =>
                eventTicketPriceRef.current.classList.remove("unfilled-input")
              }
              min={0}
              name="eventTicketPrice"
              onChange={(e) =>
                handleChangeEventDetails(
                  e.target.value,
                  "price",
                  setEventDetails
                )
              }
            ></input>

            {/* Event description  Label*/}
            <label className="label" htmlFor="eventDescription">
              Description
            </label>
            {/* Event description input*/}
            <textarea
              className="input descriptionInput"
              value={eventDetails.description}
              placeholder="Give a short description of your event to attract more attendees! ☺"
              name="eventDescription"
              data-testid="description"
              maxLength={200}
              ref={eventDescriptionRef}
              onFocus={() =>
                eventDescriptionRef.current.classList.remove("unfilled-input")
              }
              onChange={(e) =>
                handleChangeEventDetails(
                  e.target.value,
                  "description",
                  setEventDetails
                )
              }
            ></textarea>

            <button
              className="btn createEventButtonNext"
              type="button"
              onClick={() => {
                handleNextButtonClick(
                  eventDetails,
                  eventRefs,
                  image,
                  availableLocations,
                  eventsCollectionRef,
                  setLoader,
                  setSubmitted
                );
              }}
            >
              Submit
            </button>
          </section>
        </section>
      </section>
    );
};

export default CreateEvent;
