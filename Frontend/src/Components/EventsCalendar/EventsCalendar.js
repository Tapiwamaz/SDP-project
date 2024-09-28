import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarWrapper, Body } from "./EventsCalendar.styles";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const eventColors = {
  Sports: "#EB8497",
  Entertainment: "#6688c3",
  Education: "#eaaf41",
  Political: "#ce4a4a",
  Religious: "#6A4739",
  Gaming: "#48a56a",
  IT: "#b25da6",
  Online: "#ABCCC9",
  Other: "grey",
};

const CustomToolbar = (props) => {
  const { label, view } = props;

  const handleNavigate = (event) => {
    const action = event.target.value;

    switch (action) {
      case "today":
        props.onNavigate("TODAY");
        break;
      case "prev":
        props.onNavigate("PREV");
        break;
      case "next":
        props.onNavigate("NEXT");
        break;
      default:
        break;
    }
  };

  const handleViewChange = (event) => {
    const newView = event.target.value;
    props.onView(newView);
  };

  return (
    <div className="rbc-toolbar">
      {/* Label for the current date */}

      {/* Dropdown for navigation */}
      <select onChange={handleNavigate} defaultValue="">
        <option value="" disabled>
          Navigate
        </option>
        <option value="today">Today</option>
        <option value="prev">Previous</option>
        <option value="next">Next</option>
      </select>
      <span className="rbc-toolbar-label">{label}</span>
      {/* Dropdown for changing views */}
      <select onChange={handleViewChange} value={view}>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
    </div>
  );
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
    height: "fit-content",
  };
  return {
    style,
  };
};

const MyCalendar = ({ filter }) => {
  filter = filter ? filter : [];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const handleSelectSlot = (slotInfo) => {
    // Handle the click event to switch to day view
    setView(Views.DAY);
    setCurrentDate(slotInfo.start);
    console.log("Selected date:", slotInfo.start);
  };

  return (
    <>
      <Body>
        <CalendarWrapper>
          <div style={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={filter}
              titleAccessor="name"
              views={["month", "week", "day"]}
              style={{ height: 600 }}
              startAccessor={(event) =>
                new Date(`${event.date}T${event.start_time}:00`)
              }
              endAccessor={(event) =>
                new Date(`${event.date}T${event.end_time}:00`)
              }
              eventPropGetter={eventStyleGetter}
              date={currentDate}
              view={view}
              components={{
                toolbar: CustomToolbar, // Use custom toolbar
              }}
              onNavigate={(date) => setCurrentDate(date)}
              onView={(view) => setView(view)}
              onSelectSlot={handleSelectSlot}
              selectable
            />
          </div>
        </CalendarWrapper>
      </Body>
    </>
  );
};

export default MyCalendar;
