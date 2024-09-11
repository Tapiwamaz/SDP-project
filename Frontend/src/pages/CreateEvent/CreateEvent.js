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
//rrd
import { NavLink, useNavigate } from "react-router-dom";
//mockdate
import { mockLocations } from "../../MockData/MockData";
//firebase work
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase_config";
//components
import Header from "../../Components/Header/Header";
// uuid
import { v4 } from "uuid";

const CreateEvent = () => {
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

  // db variables
  const eventsCollectionRef = collection(db, "Events");

  /*-----------------------------------------------------------------------------------------------------------------*/
  // Functions
  const createEvent = async (newEvent, eventCollection, imageT) => {
    const imageRef = ref(storage, `eventsImages/${imageT.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageT)
    const downloadURL = await getDownloadURL(snapshot.ref)
    newEvent.imageURL = downloadURL
    delete newEvent.eventPicture
    //add image to bucket
    await addDoc(eventCollection, newEvent);
  };
  const loadLocations = (setALocations, locations) => {
    setALocations(locations);
  };

  useEffect(() => {
    loadLocations(setAvailableLocations, mockLocations);
  }, []);

  /* ------------------------------------------------------------------------------------------------------------------------------------ 
  Functions
  ------------------------------------------------------------------------------------------------------------------------------------
  */

  const handleImageChange = (
    event,
    setImage,
    setImageError,
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

  const handleNextButtonClick = async (
    eventDetailsT,
    eventRefsT,
    imageT,
    eventCollection
  ) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    console.log(eventRefsT)
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

    let date = new Date(eventDetailsT.date);
    if (date === NaN) {
      eventRefsT.eventDate.current.classList.add("unfilled-input");
      eventRefsT.eventDate.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please a vaild date");
      return;
    }

    eventDetailsT.date = date.toLocaleDateString();

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
    let time = new Date();
    let startTime = eventDetailsT.start_time.split(":");
    time.setHours(startTime[0]);
    time.setMinutes(startTime[1]);
    time.setMilliseconds("0");
    eventDetailsT.start_time = time.toLocaleTimeString();

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

    time = new Date();
    console.log(eventDetailsT.end_time);
    let endTime = eventDetailsT.end_time.split(":");
    time.setHours(endTime[0]);
    time.setMinutes(endTime[1]);
    time.setMilliseconds("0");
    eventDetailsT.end_time = time.toLocaleTimeString();

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

    if (!eventDetailsT.eventPicture) {
      // eventRefsT.event.current.classList.add("unfilled-input");
      eventRefsT.eventPicture.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      toast.warn("Please upload a picture");
      return;
    }

    setLoader(true);
    eventDetailsT.active = true;
    eventDetailsT.approved = false;
    eventDetailsT.userID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

    createEvent(eventDetailsT, eventCollection, imageT);

    await delay(5000);
    setLoader(false);
    setSubmitted(true);
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
        <Header />
        <section className="createEventsContainer pendingPage">
          <h3 className="textAlign">
            Your are now officialy on the waitlist - stay tuned!
          </h3>
          <p className="textAlign subText">
            You will be notified as soon your event is approved.
          </p>
          {/* <NavLink to={"/"} className="btn"> Go back to home</NavLink> */}
          <NavLink to={"/"} className="btn goHomeBtn">
            {" "}
            Go back to home
          </NavLink>
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
            <p>Please fill in the all the fileds in the form. </p>
          </div>
          <img className="createEventsSvg" src={PendingSvg}></img>

          {/* <div style={{background: `url: "../../Images/Pending.svg"`}}></div> */}
          {/* {console.log(PendingSvg)} */}
        </section>

        <section className="inputs">
          {/* Image  */}
          {imgSrc && (
            // <>
            <img className="imageHolder" src={imgSrc} alt="Preview" />
          )}
          {/* {!imgSrc && ( */}
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
              ref={eventPictureRef}
              onChange={(e) => {
                handleImageChange(e, setImage, setImageError);
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
            ref={eventNameRef}
            onFocus={() =>
              eventNameRef.current.classList.remove("unfilled-input")
            }
            onChange={(e) =>
              handleChangeEventDetails(e.target.value, "name", setEventDetails)
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
              handleChangeEventDetails(e.target.value, "date", setEventDetails)
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
                    "end_time",
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
              handleChangeEventDetails(e.target.value, "type", setEventDetails)
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
              handleChangeEventDetails(e.target.value, "price", setEventDetails)
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
                eventsCollectionRef
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
