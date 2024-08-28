import {
  ArrowLeftCircleIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import "./CreateEvent.css";
import { useState } from "react";

const formSections = [
  "Event Details",
  "Location and Description",
  "Media and Pricing",
];

const CreateEvent = () => {
  const todayDate = new Date().toISOString().split("T")[0];

  const [sectionID, setSectionID] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="wrapperCreateEvent">
      <nav className="navBarCreateEvents">
        <ArrowLeftCircleIcon
          width={40}
          className="backButtonCreateEvent"
          onClick={() => {
            setSectionID((id) => {
              if (id == 0) return id;
              return id - 1;
            });
          }}
        />
        <h3>{formSections[sectionID]}</h3>
      </nav>
      <progress></progress>

      <form className="formCreateEvent" multi-step-form="true">
        {/* Event Details page */}
        {sectionID === 0 && (
          <section
            className={sectionID == 0 ? `form-section  active` : "form-section"}
          >
            <section className="inputs">
              <input
                className="input"
                placeholder="Event Name"
                name="eventName"
              ></input>
              <input
                className="input"
                type="text"
                name="eventDate"
                placeholder="Date"
                min={todayDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              ></input>
              <div className="timesContainer">
                <input
                  className="timeInput input"
                  type="text"
                  min="07:00:00"
                  max="22:00:00"
                  placeholder="Start-Time"
                  name="eventStartTime"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                ></input>
                <input
                  className="timeInput input"
                  type="text"
                  min="07:00:00"
                  max="22:00:00"
                  placeholder="End-Time"
                  name="eventEndTime"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                ></input>
              </div>
            </section>
            <button
              className="btn createEventButtonNext"
              type="button"
              onClick={() => {
                setSectionID(1);
              }}
            >
              Continue
            </button>
          </section>
        )}

        {/* Location and Description */}
        {sectionID === 1 && (
          <section
            className={sectionID == 1 ? `form-section  active` : "form-section"}
          >
            <section className="inputs">
              <input
                className="input"
                placeholder="Event Type"
                name="eventType"
              ></input>
              <input
                className="input"
                placeholder="Venue Type"
                list="venueList"
                name="eventVenue"
              ></input>
              <datalist id="venueList">
                <option value="Lab"></option>
                <option value="Open Area"></option>
                <option value="Exam Hall"></option>
              </datalist>

              <input
                className="input"
                placeholder="Location"
                list="locationsList"
                name="eventLocation"
              ></input>
              <datalist id="locationsList">
                <option value="MSL"></option>
                <option value="Digs"></option>
                <option value="Hall 29"></option>
              </datalist>
              <textarea
                className="input descriptionInput"
                placeholder="Give a short description of your event to attract more attendees! ☺"
                name="eventDescription"
                maxLength={400}
              ></textarea>
            </section>

            <button
              className="btn createEventButtonNext"
              type="button"
              onClick={() => {
                setSectionID(2);
              }}
            >
              Continue
            </button>
          </section>
        )}

        {/* Pricing and media */}
        {sectionID === 2 && (
          <section
            className={sectionID == 0 ? `form-section  active` : "form-section"}
          >
            <section className="inputs">
              <input
                className="input"
                type="number"
                min={0}
                placeholder="Ticket Price (in Rands)"
                name="eventTicketPrice"
              ></input>
              <input
                id="file-upload"
                className="input"
                type="file"
                accept="image/*"
                name="eventPicture"
                onChange={handleImageChange}
              ></input>

              {imgSrc && <img src={imgSrc} alt="Preview" />}

              <label htmlFor="file-upload" className="uploadMediaLabel">
                <div className="iconsMediaUpload">
                  <CameraIcon width={30} />
                  <div id="dividerLine"></div>
                  <VideoCameraIcon width={30} />
                </div>
                <strong>Drag and drop media here</strong>
              </label>
            </section>
            <button
              className="btn createEventButtonNext"
              type="button"
              onClick={() => {
                setSectionID(2);
              }}
            >
              Continue
            </button>
          </section>
        )}
      </form>
    </section>
  );
};

export default CreateEvent;
