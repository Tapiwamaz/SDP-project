import React, { useEffect,useState } from 'react';
import eventImage from "../../Images/ds.jpeg";
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventDate,Location,Price,DateIcon,EventPages,LocationIcon,PriceIcon,BookButton,EventImage, NumberofTickets, Time,TimeIcon,EveOCard} from './EventPage.style';
import Header from '../../Components/Header/Header';
import { Page } from '../../Components/HomePage/HomePage.styles';
import AsideDesktop from '../../Components/AsideDesktop/AsideDesktop';
import Tags from '../../Components/Tags/Tags';

const EventPage = () => {
  const navigate = useNavigate();
  const event = useLocation().state.event;
  const book = useLocation().state.booked;
  console.log(event);
  useEffect(() => {


  }, []);

  const EventOrg = {
    name: "Event Organiser",
    email: "eventorg@gmail.com",
    description: "This is a description of the event organiser",
    profilepicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F717761877898013%2F&psig=AOvVaw3Q6Z"
  }

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.toLocaleString('en-US', { year: 'numeric' });

    return `${day} ${month} ${year}`; // change this line to change the order
}


function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
 const [count, setCount] = useState(1);

 const incrementCount = () => {
   setCount(count + 1);
 };

 const decrementCount = () => {
   if (count > 0) {
     setCount(count - 1);
   }
 };
  return (
    <>
      <Header />
      <Page
        style={{
          width: "100%",
        }}
      >
        <AsideDesktop />
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
          {/* <h3
            style={{
              marginBottom: "0",
            }}
          >
            Tag
          </h3>
          <Tags name={event.type}  isActive ={false} filter={null} style={{
            color: "black",
            margin: "2px",
            }}></Tags> */}

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
          {book ? (
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
            <BookButton
              style={{
                background: "red",
              }}
            >
              Alert
            </BookButton>
          )}
        </EventPages>
      </Page>
    </>
  );
};

export default EventPage;