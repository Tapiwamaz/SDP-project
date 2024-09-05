import React, { useEffect,useState } from 'react';
import eventImage from "../../images/ds.jpeg";
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

import { EventDate,Location,Price,DateIcon,EventPages,LocationIcon,PriceIcon,BookButton,EventImage, NumberofTickets} from './EventPage.style';

const EventPage = () => {
  const event ={
    "eventID": "1b6d1a8a-fb3f-4d0e-8f7a-7e733ff99e4f",
    "name": "Tech Innovations 2024",
    "type": "IT",
    "date": "2024-09-15T10:00:00.000Z",
    "description": "A conference showcasing the latest in technology and IT innovations.",
    "start-time": "2024-09-15T10:00:00.000Z",
    "end-time": "2024-09-15T16:00:00.000Z",
    "userID": "b23e47cb-784f-4851-b7a9-0a7a6df5a2e8",
    "active": true,
    "imageURL": "techconference2024.com/image",
    "price": 50,
    "location": "1234 Tech Street, Silicon Valley",
    "approved": true
  }

  useEffect(() => {


  }, []);

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.toLocaleString('en-US', { year: 'numeric' });
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return `${day} ${month} ${year}, ${time}`; // change this line to change the order
}

const dateString = "2024-09-15T10:00:00.000Z";
console.log(formatDate(dateString)); // Outputs: 15 September 2024, 10:00 AM
 const [count, setCount] = useState(0);

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
      <EventPages>
        <EventImage src={eventImage} alt="Event Image" />
        <h1>{event.name}</h1>
        <EventDate>
          <DateIcon />
          <p>{formatDate(event.date)}</p>
        </EventDate>
        <Location>
          <LocationIcon />
          <p>{event.location}</p>
        </Location>
        <Price>
          <PriceIcon />
          <p>{event.price}</p>
        </Price>

        <h2>About Event :</h2>
        <p
          style={{
            width: "70%",
          }}
        >
          {event.description}
        </p>
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

        <BookButton>Book Now</BookButton>
      </EventPages>
    </>
  );
};

export default EventPage;