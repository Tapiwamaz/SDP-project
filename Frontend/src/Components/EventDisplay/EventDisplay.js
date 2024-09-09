import React, { useEffect, useState } from "react";
import eventImage from "../../Images/ds.jpeg";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EventDate,
  Location,
  Price,
  DateIcon,
  EventPages,
  LocationIcon,
  PriceIcon,
  Star,
  BookButton,
  EventImage,
  NumberofTickets,
  Time,
  TimeIcon,
  EveOCard,
  RatingStars,
} from "./EventDisplay.style";
import Header from "../Header/Header";
import { Page } from "../HomePage/HomePage.styles";
import AsideDesktop from "../AsideDesktop/AsideDesktop";
// import Tags from '../../Components/Tags/Tags';

const EventPage = () => {
  const navigate = useNavigate();
  const event = useLocation().state.event;
  const book = useLocation().state.booked;
  console.log(event);
  useEffect(() => {}, []);

  const EventOrg = {
    name: "Event Organiser",
    email: "eventorg@gmail.com",
    description: "This is a description of the event organiser",
    profilepicture:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F717761877898013%2F&psig=AOvVaw3Q6Z",
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    return `${day} ${month} ${year}`; // change this line to change the order
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const [count, setCount] = useState(1);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
        <EventPages>
          <EventImage
            src={eventImage}
            className="EventImage"
            alt="Event Image"
          />
          <h1>{event.name}</h1>
          <EventDate>
            <DateIcon />
            <p>{formatDate(event.date)}</p>
          </EventDate>
          <Time>
            <TimeIcon />
            <p>
              Start: {formatTime(event.start_time)} - End:{" "}
              {formatTime(event.end_time)}
            </p>
          </Time>
          <Location>
            <LocationIcon />
            <p>{event.location}</p>
          </Location>
          <Price>
            <PriceIcon />
            <p>R{event.price}</p>
          </Price>

          <h2
            style={{
              marginBottom: "0",
            }}
          >
            About Event :
          </h2>
          <p
            style={{
              width: "70%",
              paddingBottom: ".5em",
            }}
          >
            {event.description}
          </p>
          <EveOCard>
            <img
              src={eventImage}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                gridColumn: "span 1",
                justifySelf: "center",
                alignSelf: "center",
              }}
              alt=""
            ></img>
            <div className="top-right">
              <h3
                style={{
                  margin: "0",
                }}
              >
                {EventOrg.name}
              </h3>
              <p
                style={{
                  fontWeight: "lighter", // Add this line
                  marginTop: "-2px",
                }}
              >
                {EventOrg.email}
              </p>
            </div>
            <p style={{ gridColumn: "span 2" }}>{EventOrg.description}</p>
          </EveOCard>
          {!book ? (
            <>
              <p>Number of Tickets</p>
              <NumberofTickets>
                <MinusCircleIcon
                  onClick={decrementCount}
                  style={{
                    width: "10%",
                  }}
                />
                <p>Current count: {count}</p>
                <PlusCircleIcon
                  onClick={incrementCount}
                  style={{
                    width: "10%",
                  }}
                />
              </NumberofTickets>
              <BookButton
                onClick={() =>
                  navigate("/summary", { state: { amount: count, event } })
                }
              >
                Book Now
              </BookButton>
            </>
          ) : (
            <>
              <div
                style={{
                  marginTop: "1em",
                  border: "1px solid #d9d9d9",
                  borderRadius: "25px",
                  marginLeft: "1em",
                  marginRight: "1em",
                }}
              >
                <h3
                  style={{
                    marginTop: "1em",
                    marginBottom: "-.5em",
                  }}
                >
                  Are you enjoying The event:
                </h3>
                <p>Please consider leaving us a Rating</p>
                <RatingStars>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      hover={i < hover}
                      selected={i < rating}
                      onMouseEnter={() => setHover(i + 1)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => handleRating(i + 1)}
                    >
                      ★
                    </Star>
                  ))}
                </RatingStars>
              </div>
              <BookButton
                style={{
                  background: "crimson",
                }}
              >
                Alert
              </BookButton>
            </>
          )}
        </EventPages>
  );
};

export default EventPage;
