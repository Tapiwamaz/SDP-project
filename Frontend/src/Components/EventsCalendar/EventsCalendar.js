import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
} from "./EventsCalendar.styles";
const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => (
  <div>
    <strong>{event.title}</strong>
    {event.location && ` - ${event.location}`}
    {event.description && (
      <div style={{ fontSize: "small", marginTop: "5px" }}>
        {event.description}
      </div>
    )}
  </div>
);

const MyCalendar = () => {
  return (
    // <CalendarContainer>
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={Events}
        titleAccessor="name"
        views={["month", "week", "day"]}
        components={{
          event: ({ event }) => (
            <EventStyle>
              <strong>{event.title}</strong>
              {event.location && ` - ${event.location}`}
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
                  {event.location && (
                    <EventLocation>{event.location}</EventLocation>
                  )}
                  {event.description && (
                    <EventDescription>{event.description}</EventDescription>
                  )}
                </EventStyle>
              </DaySlot>
            ),
          },
        }}
        style={{ height: 500 }}
        startAccessor={(event) => new Date(event["start-time"])} // Custom start accessor
        endAccessor={(event) => new Date(event["end-time"])} // Custom end accessor
      />
    </div>
    // </CalendarContainer>
  );
};

export default MyCalendar;
