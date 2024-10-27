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

  const handleNavigate = (action) => {
   

    switch (action) {
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

  const handleViewChange = (newView) => {
    props.onView(newView);
  };

    

  return (
    <div className="rbc-toolbar custom-toolbar">
      <div className="rbc-toolbar-label">{label}</div>

      <div className="toolbar-buttons">
        <div className="rbc-btn-group navigation-group">
          <button onClick={() => handleNavigate("prev")} aria-label="Previous">
            ←
          </button>
          <button onClick={() => handleNavigate("next")} aria-label="Next">
            →
          </button>
        </div>

        <div className="rbc-btn-group view-change-group">
          <button
            onClick={() => handleViewChange("day")}
            disabled={view === "day"}
          >
            Day
          </button>
          <button
            onClick={() => handleViewChange("week")}
            disabled={view === "week"}
          >
            Week
          </button>
          <button
            onClick={() => handleViewChange("month")}
            disabled={view === "month"}
          >
            Month
          </button>
        </div>
      </div>
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
              toolbar: CustomToolbar,
            }}
            onNavigate={(date) => setCurrentDate(date)}
            onView={(view) => setView(view)}
            onSelectSlot={handleSelectSlot}
            selectable
            longPressThreshold={50} //Reduce this threshold to make it more responsive to quick taps
          />
        </div>
      </CalendarWrapper>
    </Body>
  );
};

export default MyCalendar;
