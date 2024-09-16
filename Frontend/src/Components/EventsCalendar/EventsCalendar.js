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
  Other: "grey",
};

const MyCalendar = ({ events }) => {
  const [activeTag, setActiveTag] = useState(null); // State to track the active tag
  const [filteredEvents, SetFilteredEvents] = useState(Events);
  const [view, setView] = useState(Views.MONTH);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setView("day");
    // You can add your custom logic here, e.g., navigate to a different view or open a modal.
  };
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

  // const EventComponent = ({ event }) => (
  //   <div>
  //     <strong>{event.title}</strong>
  //     {event.location && ` - ${event.location}`}
  //     {event.description && (
  //       <div style={{ fontSize: "small", marginTop: "5px" }}>
  //         {event.description}
  //       </div>
  //     )}
  //   </div>
  // );
  // const filter = (type) => {
  //   // console.log("filteritng")
  //   setActiveTag(type);

  //   SetFilteredEvents(Events.filter((e) => e.type.match(type)));
  // };

  return (
    <>
      {/* <Header></Header> */}
      {/* <Page> */}
      {/* <AsideDesktop></AsideDesktop> */}
      <Body>
        <CalendarWrapper>
          <div style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              titleAccessor="name"
              // views={["month", "day", "week"]}
              view={view} // Use `view` for the selected view, not `views`
              onView={setView} // Sync the calendar view with the dropdown
              style={{ height: 700 }}
              components={{
                event: ({ event }) => (
                  <EventStyle>{/* Custom event content */}</EventStyle>
                ),
                month: {
                  dateCellWrapper: ({ children, value }) => (
                    // <DateCellWrapper onClick={() => handleDateClick(value)}>
                    <DateCellWrapper>{children}</DateCellWrapper>
                  ),
                },
                day: {
                  event: ({ event }) => (
                    <DaySlot>
                      <EventStyle>
                        <EventTitle>{event.name}</EventTitle>
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
              startAccessor={(event) => new Date(event.start_time)} // Custom start accessor
              endAccessor={(event) => new Date(event.end_time)} // Custom end accessor
              eventPropGetter={eventStyleGetter} // Dynamic styles for events
            />
          </div>
        </CalendarWrapper>
      </Body>
      {/* </Page> */}
    </>
  );
};

export default MyCalendar;
