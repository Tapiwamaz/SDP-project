// Import necessary modules and components
// rG4AF+FH
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import SecurityModal from "../SecurityModal/SecurityModal";
// Main component for the Event Page
const EventDisplay = ({
  events,
  loading,
  setLoading,
  onDisplaySummary,
  ticket,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  let event = null;
  let tick = null;
  const handleEvent = () => {
    if (events === undefined) {
      tick = location.state.ticket;
      event = location.state.event;
    } else {
      tick = ticket;
      event = events;
    }
  };
  handleEvent();
  const book = event.booking;
  // State variables for the event organizer, loading status, full status, count, hover and rating
  const [EventOrg, setEventOrg] = useState({});
  // const [loading, setLoading] = useState(true);
  const [Full, SetFull] = useState(false);
  const [screen, setScreen] = useState(null);
  const [count, setCount] = useState(1);
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [Load, setLoad] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const screenWidth = window.innerWidth; // need to adjust the slide percentage based on screen size
    if (screenWidth <= 768) {
      setScreen("phone");
    } else {
      setScreen("desktop");
    }
    if (!book) {
      setRated(tick.rated);
    }
    SetFull(event.ticket_count === 0);
    const fetchData = async () => {
      try {
        if (Object.keys(EventOrg).length === 0 || !!loading) {
          const eventOrgData = await fetchEventOrganizer(event.user_id);
          if (eventOrgData) {
            setEventOrg(eventOrgData);
          }
          setLoad(false);
          if(events){
          setLoading(false);}
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "An unexpected error occurred while fetching event organizer details."
        );
      }
    };
    fetchData();
  }, [EventOrg, Full, loading]);

  const goToSummary = () => {
    event["count"] = count;
    if (screen == "phone") {
      navigate("/summary", { state: { event } });
    } else {
      onDisplaySummary(event);
    }
  };
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
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (loading || Load) {
        toast.error("Failed to fetch event organizer details");
      }
      return null;
    }
  };
  // Function to format the time
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    return `${day} ${month} ${year}`; // change this line to change the order
  }
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
        userID: `${EventOrg.user_id}`,
        rates: `${EventOrg.Rates}`,
        EventOrgRating: `${EventOrg.rating}`,
        ticketID: `${tick.id}`,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setRated(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to submit rating");
      });

  const openSecurityModal = () => {
    setOpenModal(true);
  };
  // Render the component

  return (
    <EventPages>
      <ToastContainer />
      {!!loading || Load ? (
        <EventImagePlaceholder
          data-testid="ImagePLaceholder"
          className="EventImage"
        />
      ) : (
        <EventImage
          src={event.image_url}
          className="EventImage"
          alt="Event Image"
        />
      )}
      {!!loading || Load ? (
        <TitlePlaceHolder data-testid="Titleplaceholder" />
      ) : (
        <h1
          style={{
            color: "black",
            textAlign: "left",
          }}
        >
          {event.name}
        </h1>
      )}
      {!!loading || Load ? (
        <PlaceHolderText data-testid="Placeholdertext 1" />
      ) : (
        <EventDate>
          <DateIcon />
          <div>
            <h4
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellih4sis",
                lineHeight: "1",
              }}
            >
              Date
            </h4>
            <p
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1",
              }}
            >
              {formatDate(event.date)}
            </p>
          </div>
        </EventDate>
      )}

      {!!loading || Load ? (
        <PlaceHolderText data-testid="Placeholdertext 2" />
      ) : (
        <Time>
          <TimeIcon />
          <div>
            <h4
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellih4sis",
                lineHeight: "1",
              }}
            >
              Time:
            </h4>
            <p
              style={{
                margin: "0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1",
              }}
            >
              Start: {event.start_time} - End: {event.end_time}
            </p>
          </div>
        </Time>
      )}

      {!!loading || Load ? (
        <PlaceHolderText data-testid="Placeholdertext 3" />
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
      {!!loading || Load ? (
        <PlaceHolderText data-testid="Placeholdertext 4" />
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
      {!!loading || Load ? (
        <TitlePlaceHolder data-testid="Titleplaceholder 2" />
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
          {book ? (
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
                      data-testid="DecrementButton"
                    />
                    <p>Current count: {count}</p>
                    <PlusCircleIcon
                      onClick={incrementCount}
                      style={{
                        width: "10%",
                        cursor: "pointer",
                      }}
                      data-testid="IncrementButton"
                    />
                  </NumberofTickets>
                </>
              ) : null}
              {Full ? (
                <BookButton
                  onClick={() => !Full && goToSummary()}
                  full={true}
                  disabled={true}
                  data-testid="SoldOutButton"
                >
                  Sold Out
                </BookButton>
              ) : (
                <BookButton
                  onClick={() => goToSummary()}
                  full={false}
                  disabled={false}
                  data-testid="BookNowButton"
                >
                  Book Now
                </BookButton>
              )}
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
                {!rated ? (
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
                          data-testid={`Star-${i}`}
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
                      onClick={() => submitRating()}
                      data-testid="SubmitButton"
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
                onClick={openSecurityModal}
                data-testid="AlertButton"
              >
                Alert
              </BookButton>
              {openModal && (
                <SecurityModal
                  event={event}
                  onClose={() => setOpenModal(false)}
                />
              )}
            </>
          )}
        </>
      )}
    </EventPages>
  );
};

export default EventDisplay;
