import React from "react";
// icons
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

// svgs
import PendingSvg from "../../Images/Pending.svg";

//css
import "./CreateEvent.css";
// react
import { useEffect, useRef, useState } from "react";
// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//rrd
import { useLocation } from "react-router-dom";
//mockdate
import {
  mockEventTypes,
  mockLocations,
  mockVirtualLocations,
} from "../../MockData/MockData";
//firebase work
import { collection } from "firebase/firestore";

import { auth, db, storage } from "../../firebase_config";
//components
import Header from "../../Components/Header/Header";

import CreateEventPendingPage from "../../Components/CreateEventPageComponents/CreateEventPendingPage";
import {
  fetchVenues,
  filterVenues,
  handleNextButtonClick,
} from "./CreateEvent.helpers";

import { addDoc, query, getDocs, updateDoc, where } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

// uuid
import { v4 } from "uuid";
import AsideDesktop from "../../Components/AsideDesktop/AsideDesktop";

export const fetchStorage = (key) => {
  try {
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
      return JSON.parse(storedItem);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching object from localStorage:", error);
    return null;
  }
};

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

export const createEventDB = async (
  newEvent,
  eventCollection,
  imageT,
  locations
) => {
  try {
    const capacity = parseInt(
      locations.filter((loc) => loc.venueName === newEvent.location)[0]
        .venueCapacity
    );
    const venueId = locations.filter(
      (loc) => loc.venueName === newEvent.location
    )[0].id;

    const imageRef = ref(storage, `eventsImages/${imageT.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageT);
    const downloadURL = await getDownloadURL(snapshot.ref);

    newEvent.image_url = downloadURL;
    newEvent.venue_id = venueId;
    newEvent.capacity = capacity;
    newEvent.ticket_count = capacity;
    newEvent.event_id = v4();
    newEvent.active = true;
    newEvent.approved = false;
    newEvent.status = "pending";
    delete newEvent.eventPicture;

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
  try {
    const capacity = locations.filter(
      (loc) => loc.venueName === updatedEvent.location
    )[0].venueCapacity;
    updatedEvent.capacity = capacity;

    const oldImageUrl = updatedEvent.image_url;
    updatedEvent.approved = false;
    updatedEvent.status = "pending";

    // If the old image URL exists, delete the old image from storage
    // this should only be done if there another image uploaded
    if (imageT && imageT.name && oldImageUrl) {
      const oldImageRef = ref(storage, oldImageUrl);
      await deleteObject(oldImageRef);
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
  const userData = fetchStorage("userData") || {};
  const location = useLocation();
  if (location && location.state && location.state.inputEventDetails) {
    inputEventDetails = location.state.inputEventDetails;
  }
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

  const [availableLocations, setAvailableLocations] = useState(mockLocations);
  const [eventTypes, setEventTypes] = useState(mockEventTypes);

  // db variables
  const eventsCollectionRef = collection(db, "Events");

  /*-----------------------------------------------------------------------------------------------------------------*/
  // Functions

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    const data = fetchVenues();
    data.then((res) => {
      if (res) {
        setAvailableLocations(
          res.sort((a, b) => a.venueName.localeCompare(b.venueName))
        );
      } else {
        setAvailableLocations(mockLocations);
        console.error("Error fetching data from venues");
      }
    });

    setEventTypes(mockEventTypes);
    if (inputEventDetails) {
      setImgSrc(inputEventDetails.image_url);
      setEventDetails(inputEventDetails);
    } else if (userId) {
      setEventDetails({ user_id: userId });
    } else if (userData.user_id) {
      setEventDetails({ user_id: userData.user_id });
    }
  }, []);

  /* ------------------------------------------------------------------------------------------------------------------------------------ 
  Functions
  ------------------------------------------------------------------------------------------------------------------------------------
  */

  if (submitted) {
    return (
      <>
        <Header />
        <div className="separationContainer">
          <AsideDesktop />
          <CreateEventPendingPage update={!!inputEventDetails} />
        </div>
      </>
    );
  } else
    return (
      <div>
        <Header />
        <ToastContainer />
        <div className="separationContainer">
          <AsideDesktop />
          <section className="wrapperCreateEvent">
            {loader && (
              <div className="loader">
                <div className="centerLoader" />
              </div>
            )}

            <section className="createEventsContainer">
              <section className="desktopAside">
                <div className="formInfoContainer">
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
                  <img className="imageHolder" src={imgSrc} alt="Preview" />
                )}

                <div
                  className="drop-file-container"
                  data-testid="drop-file-container"
                  style={{
                    position: imgSrc ? "absolute" : "static",
                    background: !imgSrc
                      ? "var(--primary)"
                      : hovered
                      ? "rgba(54, 69, 79,0.4)"
                      : "transparent",
                    color: !imgSrc
                      ? "white"
                      : hovered
                      ? "white"
                      : "transparent",
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
                  placeholder="e.g Vibes Night"
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
                {/* Event type */}
                <label className="label" htmlFor="eventType">
                  Event Type
                </label>

                <select
                  className="input"
                  name="eventType"
                  data-testid="type"
                  ref={eventTypeRef}
                  value={eventDetails.type}
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
                >
                  <option
                    value=""
                    selected
                    disabled
                    hidden
                  >
                    e.g Education
                  </option>
                  {eventTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {!inputEventDetails && (
                  <label className="label" htmlFor="eventDate">
                    Date
                  </label>
                )}
                {!inputEventDetails && (
                  <input
                    className="input"
                    type="date"
                    id="eventDate"
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
                )}

                {/* Venue and location */}
                {!inputEventDetails && (
                  <div className="doubleInputContainer">
                    {/* Venue type */}
                    <div
                      className="doubleInput"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label className="label" htmlFor="eventVenueType">
                        {eventDetails.type === "Online"
                          ? "Platform"
                          : "Venue Type"}
                      </label>
                      <select
                        className="input"
                        id="eventVenueType"
                        data-testid="venue_type"
                        ref={eventVenueTypeRef}
                        onFocus={() =>
                          eventVenueTypeRef.current.classList.remove(
                            "unfilled-input"
                          )
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
                      >
                        <option selected value={"-1"} hidden disabled>
                          e.g Lecture Room
                        </option>
                        {filterVenues(availableLocations, "venueType").map(
                          (type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Location */}
                    <div
                      className="doubleInput"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label className="label" htmlFor="eventLocation">
                        Location
                      </label>
                      <select
                        className="input"
                        id="eventLocation"
                        data-testid="location"
                        onFocus={() =>
                          eventLocationRef.current.classList.remove(
                            "unfilled-input"
                          )
                        }
                        ref={eventLocationRef}
                        name="eventLocation"
                        onChange={(e) =>
                          handleChangeEventDetails(
                            e.target.value,
                            "location",
                            setEventDetails
                          )
                        }
                      >
                        <option value={"-1"} selected disabled hidden>
                          e.g NCB4
                        </option>
                        {availableLocations
                          .filter((x) => x.venueType === filterVenueType)
                          .map((loc, i) => (
                            <option key={i} value={loc.venueName}>
                              {loc.venueName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Time inputs */}
                {!inputEventDetails && (
                  <div className="doubleInputContainer">
                    <div
                      className="doubleInput"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label className="label" htmlFor="eventStartTime">
                        Start Time
                      </label>
                      <select
                        className="input"
                        id="eventStartTime"
                        data-testid="start_time"
                        name="eventStartTime"
                        disabled={!eventDetails.location}
                        ref={eventStartTimeRef}
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
                      >
                        <option value={"-1"} hidden selected disabled>
                          e.g 08:00
                        </option>
                        {availableLocations.filter(
                          (v) => v.venueName === eventDetails.location
                        )[0] &&
                          availableLocations
                            .filter(
                              (v) => v.venueName === eventDetails.location
                            )[0]
                            .timeSlots.map((t, index) => (
                              <option key={index} value={t}>
                                {t}
                              </option>
                            ))}
                      </select>
                    </div>

                    <div
                      className="doubleInput"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label className="label" htmlFor="eventEndTime">
                        End Time
                      </label>
                      <select
                        className="input"
                        id="eventEndTime"
                        data-testid="end_time"
                        disabled={!eventDetails.location}
                        ref={eventEndTimeRef}
                        name="eventEndTime"
                        onFocus={(e) => {
                          eventEndTimeRef.current.classList.remove(
                            "unfilled-input"
                          );
                        }}
                        onChange={(e) =>
                          handleChangeEventDetails(
                            e.target.value,
                            "end_time",
                            setEventDetails
                          )
                        }
                      >
                        <option value={"-1"} hidden selected disabled>
                          e.g 09:00
                        </option>
                        {availableLocations.filter(
                          (v) => v.venueName === eventDetails.location
                        )[0] &&
                          availableLocations
                            .filter(
                              (v) => v.venueName === eventDetails.location
                            )[0]
                            .timeSlots.map((t, index) => (
                              <option key={index} value={t}>
                                {t}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Ticket Price  Label*/}
                <label className="label" htmlFor="eventTicketPrice">
                  Ticket Price
                </label>
                {/* Ticket Price  input*/}
                <input
                  className="input"
                  type="number"
                  id="eventTicketPrice"
                  ref={eventTicketPriceRef}
                  data-testid="price"
                  value={eventDetails.price || null}
                  placeholder="e.g R 50"
                  step={10}
                  onFocus={() =>
                    eventTicketPriceRef.current.classList.remove(
                      "unfilled-input"
                    )
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
                    eventDescriptionRef.current.classList.remove(
                      "unfilled-input"
                    )
                  }
                  onChange={(e) =>
                    handleChangeEventDetails(
                      e.target.value,
                      "description",
                      setEventDetails
                    )
                  }
                ></textarea>
                {eventDetails.description && (
                  <p
                    data-testid="chrLeft"
                    className="chrsLeft"
                    style={{
                      color: `rgb(${eventDetails.description.length},${
                        200 - eventDetails.description.length
                      },0)`,
                    }}
                  >
                    Characters left: {200 - eventDetails.description.length}
                  </p>
                )}

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
                      setSubmitted,
                      db,
                      auth
                    );
                  }}
                >
                  Submit
                </button>
              </section>
            </section>
          </section>
        </div>
      </div>
    );
};

export default CreateEvent;
