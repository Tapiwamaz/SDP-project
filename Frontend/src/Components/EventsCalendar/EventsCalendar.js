import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Events } from "../MockData/EventsMock";
import {
  CalendarContainer,
  EventStyle,
  DateCellWrapper,
  DaySlot,
  EventDescription,
  EventTitle,
  EventLocation,
  CalendarWrapper,
  TagsStyle,
  Body,
  Page,
} from "./EventsCalendar.styles";

import Tags from "../Tags/Tags";
import Header from "../Header/Header";
import AsideDesktop from "../AsideDesktop/AsideDesktop";

const localizer = momentLocalizer(moment);

const eventColors = {
  Sports: "#EB8497",
  Entertainment: "#6688c3",
  Education: "#eaaf41",
  Political: "#ce4a4a",
  Religious: "#6A4739",
  Gaming: "#48a56a",
  IT: "#b25da6",
  Online:"lime",
  Other: "grey",
};

// const MyCalendar = ({ events }) => {
//   const [activeTag, setActiveTag] = useState(null); // State to track the active tag
//   const [filteredEvents, SetFilteredEvents] = useState(Events);
//   const [view, setView] = useState(Views.MONTH);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setView("day");
//     // You can add your custom logic here, e.g., navigate to a different view or open a modal.
//   };
  const eventStyleGetter = (event) => {
    const backgroundColor = eventColors[event.type] || "grey"; // Default color
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

const MyCalendar = ({filter}) => {
  filter=filter?filter:[];


  return (
    <>
  
        <Body>
         
          <CalendarWrapper>
            <div style={{ height: 500 }}>
              <Calendar
                localizer={localizer}
                events={filter}
                titleAccessor="name"
                views={["month", "week", "day"]}
                components={{
                  event: ({ event }) => (
                    <EventStyle>
                      {/* <strong>{event.name}</strong> */}
                      {/* {event.location && ` - ${event.location}`} */}
                    </EventStyle>
                  ),
                  month: {
                    dateCellWrapper: ({ children }) => (
                      <DateCellWrapper>{children}</DateCellWrapper>
                    ),
                  },
                  day: {
                    event: ({ event }) => (
                      <DaySlot>
                        <EventStyle>
                          <EventTitle>{event.name}</EventTitle>
                          {/* {event.location && (
                            <EventLocation>{event.location}</EventLocation>
                          )} */}
                          {event.description && (
                            <EventDescription>
                              {event.description}
                            </EventDescription>
                          )}
                        </EventStyle>
                      </DaySlot>
                    ),
                  },
                }}
                style={{ height: 600 }}
                startAccessor={(event) => new Date(`${event.date}T${event.start_time}:00`)}
                endAccessor={(event) => new Date(`${event.date}T${event.end_time}:00`)}
                
                eventPropGetter={eventStyleGetter} // Apply styles dynamically
              />
            </div>
            {/* //{" "} */}
          </CalendarWrapper>
        </Body>
      {/* </Page> */}
    </>
  );
};

export default MyCalendar;