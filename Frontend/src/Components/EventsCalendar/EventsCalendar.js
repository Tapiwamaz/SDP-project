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

const MyCalendar = () => {
  const [activeTag, setActiveTag] = useState(null); // State to track the active tag
  const [filteredEvents, SetFilteredEvents] = useState(Events);

  const filter = (type) => {
    // console.log("filteritng")
    setActiveTag(type);

    SetFilteredEvents(Events.filter((e) => e.type.match(type)));
  };

  return (
    <>
      <Header></Header>
      <Page>
        <AsideDesktop></AsideDesktop>
        <Body>
          <TagsStyle>
            <h3>Filter by</h3>
            <div>
              <Tags
                name={"Education"}
                filter={
                  activeTag === "Education" ? null : () => filter("Education")
                }
                isActive={activeTag === "Education"}
              ></Tags>
              <Tags
                name={"Sports"}
                filter={activeTag === "Sports" ? null : () => filter("Sports")}
                isActive={activeTag === "Sports"}
              ></Tags>
              <Tags
                name={"Political"}
                filter={
                  activeTag === "Political" ? null : () => filter("Political")
                }
                isActive={activeTag === "Political"}
              ></Tags>
              <Tags
                name={"Entertainment"}
                filter={
                  activeTag === "Entertainment"
                    ? null
                    : () => filter("Entertainment")
                }
                isActive={activeTag === "Entertainment"}
              ></Tags>
              <Tags
                name={"Gaming"}
                filter={activeTag === "Gaming" ? null : () => filter("Gaming")}
                isActive={activeTag === "Gaming"}
              ></Tags>
              <Tags
                name={"IT"}
                filter={activeTag === "IT" ? null : () => filter("IT")}
                isActive={activeTag === "IT"}
              ></Tags>
              <Tags
                name={"Religious"}
                filter={
                  activeTag === "Religious" ? null : () => filter("Religious")
                }
                isActive={activeTag === "Religious"}
              ></Tags>
              <Tags
                name={"Other"}
                filter={activeTag === "Other" ? null : () => filter("Other")}
                isActive={activeTag === "Other"}
              ></Tags>
            </div>
          </TagsStyle>
          <CalendarWrapper>
            <div style={{ height: 500 }}>
              <Calendar
                localizer={localizer}
                events={filteredEvents}
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
                startAccessor={(event) => new Date(event["start-time"])} // Custom start accessor
                endAccessor={(event) => new Date(event["end-time"])} // Custom end accessor
                eventPropGetter={eventStyleGetter} // Apply styles dynamically
              />
            </div>
            {/* //{" "} */}
          </CalendarWrapper>
        </Body>
      </Page>
    </>
  );
};

export default MyCalendar;
