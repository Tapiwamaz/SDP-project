// Import necessary modules and components
import React, { useEffect, useState } from "react";
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
  EventImagePlaceholder,
  TitlePlaceHolder,
  PlaceHolderText,
  Email,
  SubmitedRating,
  SubmitedRatingTick,
} from "./EventDisplay.style";

// Main component for the Event Page
const EventDisplay = ({events}) => {
  console.log(events);
  
  // Use the useNavigate hook for navigation
  const navigate = useNavigate();
  // Get the event and booking status from the location state
  // const event = useLocation().state.event;
  // let event=events;
  // const mobile= useLocation().state.event;
  // if(!event){
  //   event=mobile;
  // }

    const location = useLocation();
    let event = null;
  
    const handleEvent = () => {
      if (events === undefined) {
        console.log("JumboTron");
        
        event = location.state.event;
      }
      else{
        event=events;
      }
      // Rest of your logic...
    };
    handleEvent();
  
    // Rest of your component...
  
  // const book = useLocation().state.booked;
  // const book = event.booked;
  const book=true;
  // console.log(book);

  // State variables for the event organizer, loading status, full status, count, hover and rating
  const [EventOrg, setEventOrg] = useState({});
  const [loading, setLoading] = useState(true);
  const [Full, SetFull] = useState(false);
  const [count, setCount] = useState(1);
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  // Log the event for debugging
  console.log(event);
  const fetchEventOrganizer = async (UserID) => {
    try {
      const response = await fetch(`api/GetUser?userID=${UserID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log(data);
      if (!data.Rates) {
        data.Rates = 0;
      }
      console.log("Data received from Azure Function:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  useEffect(() => {
    if (event.TicketCount >= event.capacity) {
      SetFull(true);
    }
    const fetchData = async () => {
      if (Object.keys(EventOrg).length === 0) {
        const eventOrgData = await fetchEventOrganizer(event.user_id);
        setEventOrg(eventOrgData);
        setLoading(false);
      }
    };

    fetchData();
  }, [EventOrg]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    return `${day} ${month} ${year}`; // change this line to change the order
  }

  // Function to format the time


  // Function to handle the rating
  const handleRating = (value) => {
    setRating(value);
    setHover(-1);
  };

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const submitRating = () =>
    fetch(`api/Rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: `${rating}`,
        userID: `${EventOrg.userID}`,
        rates: `${EventOrg.Rates}`,
        EventOrgRating: `${EventOrg.rating}`,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRated(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  // Render the component
  return (
    <EventPages>
      {loading ? (
        <EventImagePlaceholder className="EventImage" />
      ) : (
        <EventImage
          src={event.image_url}
          className="EventImage"
          alt="Event Image"
        />
      )}
      {loading ? <TitlePlaceHolder /> : <h1>{event.name}</h1>}
      {loading ? (
        <PlaceHolderText />
      ) : (
        <EventDate>
          <DateIcon />
          <p>{formatDate(event.date)}</p>
        </EventDate>
      )}

      {loading ? (
        <PlaceHolderText />
      ) : (
        <Time>
          <TimeIcon />
          <p>
            Start: {event.start_time} - End: {event.end_time}
          </p>
        </Time>
      )}

      {loading ? (
        <PlaceHolderText />
      ) : (
        <Location>
          <LocationIcon />
          <div>
            <h4
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1",
              }}
            >
              Location:
            </h4>
            <p
              style={{
                margin: "0 0 0 0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1",
              }}
            >
              {event.location}
            </p>
          </div>
        </Location>
      )}
      {loading ? (
        <PlaceHolderText />
      ) : (
        <Price>
          <PriceIcon />
          <div>
            <h4
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellih4sis",
                lineHeight: "1",
              }}
            >
              Price Per Ticket:
            </h4>
            <p
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1",
              }}
            >
              R{event.price}
            </p>
          </div>
        </Price>
      )}
      {loading ? (
        <TitlePlaceHolder />
      ) : (
        <>
          <h2
            style={{
              marginBottom: "0",
            }}
          >
            About Event :
          </h2>
          <p
            style={{
              width: "100%",
              paddingBottom: ".5em",
            }}
          >
            {event.description}
          </p>
          <EveOCard>
            <img
              src={EventOrg.imageURL}
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
              <Email>{EventOrg.email}</Email>
            </div>
            <p style={{ gridColumn: "span 2" }}>{EventOrg.description}</p>
          </EveOCard>
          {!book ? (
            <>
              {!Full ? (
                <>
                  <p>Number of Tickets</p>
                  <NumberofTickets>
                    <MinusCircleIcon
                      onClick={decrementCount}
                      style={{
                        width: "10%",
                        cursor: "pointer",
                      }}
                    />
                    <p>Current count: {count}</p>
                    <PlusCircleIcon
                      onClick={incrementCount}
                      style={{
                        width: "10%",
                        cursor: "pointer",
                      }}
                    />
                  </NumberofTickets>
                </>
              ) : null}

              <BookButton
                onClick={() =>
                  !Full &&
                  navigate("/summary", { state: { amount: count, event } })
                }
                full={Full}
                disabled={Full}
              >
                {Full ? "Sold Out" : "Book Now"}
              </BookButton>
            </>
          ) : (
            <>
              <div
                style={{
                  marginTop: "1em",
                  border: "1px solid #d9d9d9",
                  borderRadius: "25px",
                  padding: "1em",
                }}
              >
                {rated ? (
                  <>
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
                          onMouseLeave={() => setHover(-1)}
                          onMouseEnter={() => setHover(i + 1)}
                          onTouchMove={() => setHover(-1)}
                          onClick={() => handleRating(i + 1)}
                        >
                          ★
                        </Star>
                      ))}
                    </RatingStars>
                    <BookButton
                      style={{
                        fontSize: "0.8em",
                      }}
                      onClick={() =>
                        submitRating()
                      }
                    >
                      Submit
                    </BookButton>
                  </>
                ) : (
                  <SubmitedRating>
                    <h3>Thank you for your Rating</h3>
                    <SubmitedRatingTick />
                    <p>We appreciate your feedback</p>
                  </SubmitedRating>
                )}
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
        </>
      )}
    </EventPages>
  );
};

export default EventDisplay;
