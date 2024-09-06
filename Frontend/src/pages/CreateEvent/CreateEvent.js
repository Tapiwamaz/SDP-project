// icons
import {
  ArrowLeftCircleIcon,
  CameraIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

// svgs
import PendingSvg from "../../Images/Pending.svg";
import WomenSvg from "../../Images/WomenHighFive.svg";

// import {NavLink} from "react-router-dom"

//css
import "./CreateEvent.css";
// react
import { useEffect, useRef, useState } from "react";
// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mockLocations } from "../../MockData/MockData";

const CreateEvent = () => {
  // todays date to start date picker
  const todayDate = new Date().toISOString().split("T")[0];

  //preview image src
  const [imgSrc, setImgSrc] = useState(null);
  const [imageError, setImageError] = useState(null);

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
  const eventVenueRef = useRef(null);
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
    eventVenue: eventVenueRef,
    eventLocation: eventLocationRef,
    eventType: eventTypeRef,
    eventPicture: eventPictureRef,
  });

  const [availableLocations, setAvailableLocations] = useState([]);

  useEffect(() => {
    // imitate doing a fetch to get mock locations

    const loadLocations = (setALocations, locations) => {
      setALocations(locations);
    };
    loadLocations(setAvailableLocations, mockLocations);
  }, []);

  /* ------------------------------------------------------------------------------------------------------------------------------------ 
  Functions
  ------------------------------------------------------------------------------------------------------------------------------------
  */

  const handleImageChange = (event) => {
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
            setImgSrc(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImageError("Please upload a landscape image.");
          setImage(null);
        }
        URL.revokeObjectURL(img.src); // Clean up memory
      };
    }
  };

  const handleNextButtonClick = async (eventDetailsT, eventRefsT) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    setLoader(true);
    await delay(5000);
    setLoader(false);
    setSubmitted(true);
    return;

    if (!eventDetailsT.eventName) {
      // Handle missing event name
      eventRefsT.eventName.current.classList.add("unfilled-input");
      eventRefsT.eventName.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please enter your events name");
      return;
    }

    if (!eventDetailsT.eventDate) {
      // Handle missing event date
      eventRefsT.eventDate.current.classList.add("unfilled-input");
      eventRefsT.eventDate.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please enter your events date");
      return;
    }

    if (!eventDetailsT.eventStartTime) {
      // Handle missing event start time
      eventRefsT.eventStartTime.current.classList.add("unfilled-input");
      eventRefsT.eventStartTime.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please enter your events start time");
      return;
    }

    if (!eventDetailsT.eventEndTime) {
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
    if (!eventDetailsT.eventType) {
      // Handle missing event type
      eventRefsT.eventType.current.classList.add("unfilled-input");
      eventRefsT.eventType.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please select your event type");
      return;
    }

    if (!eventDetailsT.eventVenueType) {
      // Handle missing event venue type
      eventRefsT.eventVenueType.current.classList.add("unfilled-input");
      eventRefsT.eventVenueType.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please selcet the event venue type");
      return;
    }
    if (!eventDetailsT.eventLocation) {
      // Handle missing event location
      eventRefsT.eventLocation.current.classList.add("unfilled-input");
      eventRefsT.eventLocation.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please select your events location");
      return;
    }

    if (!eventDetailsT.eventDescription) {
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
    if (!eventDetailsT.eventTicketPrice) {
      eventRefsT.eventTicketPrice.current.classList.add("unfilled-input");
      eventRefsT.eventTicketPrice.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please enter your events ticket price");
      return;
    }
    if (!eventDetailsT.eventPicture) {
      // eventRefsT.event.current.classList.add("unfilled-input");
      eventRefsT.eventPicture.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast("Please upload a picture");
      return;
    }

    // if everything is done and added then submited
    // setSubmitted(true)
  };

  const handleChangeEventDetails = (detail, detailType, setEventDetailsT) => {
    setEventDetailsT((prev) => {
      let temp = prev;
      temp[detailType] = detail;
      return temp;
    });
  };

  if (submitted) {
    return (
      <section className="wrapperCreateEvent">
        <section className="createEventsContainer pendingPage">
          <h3 className="textAlign">
            Your are now officialy on the waitlist - stay tuned!
          </h3>
          <p className="textAlign subText">
            You will be notified as soon your event is approved.
          </p>
          {/* <NavLink to={"/"} className="btn"> Go back to home</NavLink> */}
          <button type="button" className="btn goHomeBtn">
            {" "}
            Go back to home
          </button>
          {/* <div> */}
          <img id="pendingPageImg" src={WomenSvg}></img>
        </section>
      </section>
    );
  }
  return (
    <section className="wrapperCreateEvent">
      {loader && (
        <div className="loader">
          <div className="centerLoader" />
        </div>
      )}
      <nav className="navBarCreateEvents">
        <ArrowLeftCircleIcon width={40} className="backButtonCreateEvent" />
      </nav>

      <section className="createEventsContainer">
        <section className="desktopAside">
          <div className="formInfoContainer">
          <h4>Create your event</h4>
          <p>Please fill in the all the fileds in the form. </p>
          </div>
          <img className="createEventsSvg" src={PendingSvg}></img>

          {/* <div style={{background: `url: "../../Images/Pending.svg"`}}></div> */}
          {/* {console.log(PendingSvg)} */}
        </section>

        <section className="inputs">
          {/* Image  */}
          {imgSrc && <img className="imageHolder" src={imgSrc} alt="Preview" />}
          {!imgSrc && (
            <div className="drop-file-container">
              <input
                id="file-upload"
                className="input"
                type="file"
                accept="image/*"
                name="eventPicture"
                ref={eventPictureRef}
                onChange={(e) => {
                  handleImageChange(e);
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
                  <div id="dividerLine"></div>
                  <VideoCameraIcon width={30} />
                </div>
                <strong>Drag and drop media here</strong>
                {imageError && (
                  <strong style={{ color: "red" }}>{imageError}</strong>
                )}
              </label>
            </div>
          )}

          {imgSrc && (
            <button
              className="clearButton"
              type="button"
              onClick={() => {
                console.log(image);
                setImgSrc(null);
              }}
            >
              <TrashIcon width={35} />
              {/* Reset Image */}
            </button>
          )}

          <label className="label" htmlFor="eventName">
            Event Name
          </label>
          <input
            className="input"
            name="eventName"
            ref={eventNameRef}
            onFocus={() =>
              eventNameRef.current.classList.remove("unfilled-input")
            }
            onChange={(e) =>
              handleChangeEventDetails(
                e.target.value,
                "eventName",
                setEventDetails
              )
            }
          ></input>

          <label className="label" htmlFor="eventDate">
            Date
          </label>
          <input
            className="input"
            type="date"
            name="eventDate"
            ref={eventDateRef}
            min={todayDate}
            onFocus={(e) => {
              eventDateRef.current.classList.remove("unfilled-input");
            }}
            onChange={(e) =>
              handleChangeEventDetails(
                e.target.value,
                "eventDate",
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
                min="07:00"
                placeholder="08:00"
                step={108000}
                name="eventStartTime"
                ref={eventStartTimeRef}
                onFocus={(e) => {
                  eventStartTimeRef.current.classList.remove("unfilled-input");
                }}
                onChange={(e) =>
                  handleChangeEventDetails(
                    e.target.value,
                    "eventStartTime",
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
                type="time"
                min="08:00"
                placeholder="08:00"
                ref={eventEndTimeRef}
                name="eventEndTime"
                onFocus={(e) => {
                  eventEndTimeRef.current.classList.remove("unfilled-input");
                }}
                onChange={(e) =>
                  handleChangeEventDetails(
                    e.target.value,
                    "eventEndTime",
                    setEventDetails
                  )
                }
              ></input>
            </div>
          </div>

          <div className="doubleInputContainer">
            {/* Venue type */}
            <div
              className="doubleInput"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="label" htmlFor="eventVenueType">
                Venue Type
              </label>
              <input
                className="input"
                list="venueList"
                ref={eventVenueTypeRef}
                onFocus={() =>
                  eventVenueTypeRef.current.classList.remove("unfilled-input")
                }
                name="eventVenue"
                onChange={(e) => {
                  handleChangeEventDetails(
                    e.target.value,
                    "eventVenueType",
                    setEventDetails
                  );
                  setFilterVenueType(e.target.value);
                }}
              ></input>

              <datalist id="venueList">
                {availableLocations.map((loc) => (
                  <option value={loc.type} />
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
                onFocus={() =>
                  eventLocationRef.current.classList.remove("unfilled-input")
                }
                ref={eventLocationRef}
                name="eventLocation"
                onChange={(e) =>
                  handleChangeEventDetails(
                    e.target.value,
                    "eventLocation",
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

          {/* Event type */}
          <label className="label" htmlFor="eventType">
            Type
          </label>

          <input
            className="input"
            name="eventType"
            ref={eventTypeRef}
            onFocus={() =>
              eventTypeRef.current.classList.remove("unfilled-input")
            }
            onChange={(e) =>
              handleChangeEventDetails(
                e.target.value,
                "eventType",
                setEventDetails
              )
            }
          ></input>

          {/* Ticket Price  Label*/}
          <label className="label" htmlFor="eventTicketPrice">
            Ticket Price
          </label>
          {/* Ticket Price  input*/}
          <input
            className="input"
            type="number"
            ref={eventTicketPriceRef}
            placeholder={"R 50"}
            step={10}
            onFocus={() =>
              eventTicketPriceRef.current.classList.remove("unfilled-input")
            }
            min={0}
            name="eventTicketPrice"
            onChange={(e) =>
              handleChangeEventDetails(
                e.target.value,
                "eventTicketPrice",
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
            placeholder="Give a short description of your event to attract more attendees! ☺"
            name="eventDescription"
            maxLength={400}
            ref={eventDescriptionRef}
            onFocus={() =>
              eventDescriptionRef.current.classList.remove("unfilled-input")
            }
            onChange={(e) =>
              handleChangeEventDetails(
                e.target.value,
                "eventDescription",
                setEventDetails
              )
            }
          ></textarea>

          <button
            className="btn createEventButtonNext"
            type="button"
            onClick={() => {
              handleNextButtonClick(eventDetails, eventRefs);
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
