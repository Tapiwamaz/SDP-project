import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  Page,
  Body,
  SearchContainer,
  SearchInput,
  StyledSearchIcon,
  TagsStyle,
  EventRight,
} from "./HomePage.styles";

import EventSlider from "../EventsSlider/EventSlider";
import AsideDesktop from "../AsideDesktop/AsideDesktop";
import Tags from "../Tags/Tags";

import noResultsImage from "../../Images/noResults.svg";

import MyCalendar from "../EventsCalendar/EventsCalendar";

import EventDisplay from "../EventDisplay/EventDisplay";
import { Xicon } from "../Header/Header.styles";
import Summary from "../Summary/Summary";



const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState(null);

  const [filteredEvents, SetFilteredEvents] = useState(null);
  const [filteredTrendingEvents, SetFilteredTrendingEvents] = useState(null);
  
  const [searchValue, setSearchValue] = useState(null);

  const [activeTag, setActiveTag] = useState("No-Filter"); // State to track the active tag
  const [noEvents, setNoEvents] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Using relative URL
        const response = await fetch("/api/Basic", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // const eventsRef = collection(db,"Events"); //this is to get a reference to the collection you want to work on 
        // const data = await getDocs(eventsRef); //since this function is to get documents from events collection

        // let events = data.docs.map((doc) => ({...doc.data(), eventID: doc.id})); // formatting the output to a usable format string
        
        setAllEvents(  data.filter((e) => e.approved === true && new Date(e.date) >= new Date()));
        SetFilteredEvents(  data.filter((e) => e.approved === true && new Date(e.date) >= new Date()) );
        SetFilteredTrendingEvents ( data.filter((e) => e.approved === true && new Date(e.date) >= new Date()) );
        // console.log(data.length);
        
        if(data.length===1){
          setNoEvents(true);
        }
        // console.log('Data received from Azure Function:', data);
        // console.log(data);

        // setAllEvents(data.filter((e) => e.approved === true));
        // SetFilteredEvents(data.filter((e) => e.approved === true));
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
    fetchEvents();
  }, []);

  // const[clickedBooked,setClickedBooked]=useState(false);

  const search = (e) => {
    //function for searching for event name
    setSearchValue(e.target.value);
  };

  // useEffect(()=>{

  // },[filteredEvents])
  const [EventsDisplay, setEventsDisplay] = useState(null);
  const displayEvent = (event) => {
    setEventsDisplay(event);
    setLoading(true);
    setSummary(null);
  };
  const [summary, setSummary] = useState(null);
  const displaySummary = (event) => {
    setSummary(event);
  }

  const filter = (type) => {
    if (type === "No-Filter") {
      setActiveTag(type);
      SetFilteredEvents(allEvents.filter((e) => e.approved === true));
      SetFilteredTrendingEvents(allEvents.filter((e) => e.approved === true));

      
      setNoEvents(false);
    } else {
      setActiveTag(type);
      if (
        allEvents
          .filter((e) => e.type.match(type))
          .filter((e) => e.approved === true).length > 0
      ) {
        SetFilteredEvents(
          allEvents
            .filter((e) => e.type.match(type))
            .filter((e) => e.approved === true)
        );
        SetFilteredTrendingEvents(
          allEvents
            .filter((e) => e.type.match(type))
            .filter((e) => e.approved === true)
        );
        setNoEvents(false);
      } else {
        setNoEvents(true);
        SetFilteredEvents(null);
        SetFilteredTrendingEvents(null)
      }
    }
  };

  return (
    <>
      <Header></Header>
      <Page>
        <AsideDesktop></AsideDesktop>
        {/*Global aside called */}
        <Body>
          {/* <img src='https://images.hdqwalls.com/wallpapers/water-through-rocks-4k-kl.jpg' alt='eventImage' style={{

        height:"100%",
        width:"100%"
      }}/> */}

          <SearchContainer>
            <StyledSearchIcon />
            <SearchInput
              placeholder="Search"
              onChange={(e) => search(e)}
              maxLength={50}
            />{" "}
            {/*max lenght of input */}
          </SearchContainer>

          {searchValue && (
            <>
              <h3>Results for {`"${searchValue}"`}</h3>
              {allEvents.filter((e) => e.name.toLowerCase().includes(searchValue.toLowerCase())).length >0 ? ( //if the array is empty display no results svg
                <EventSlider
                  events={allEvents.filter((e) => e.name.toLowerCase().includes(searchValue.toLowerCase()))}
                  onDisplayEvent={displayEvent}
                />
              ) : (
                <>
                  <img src={noResultsImage} alt="No Results" />
                  <h3>No Results found</h3>
                </>
              )}
            </>
          )}

          <TagsStyle>
            <h3>Tags</h3>
            <div>
              <Tags
                name={"No-Filter"}
                filter={
                  activeTag === "No-Filter" ? null : () => filter("No-Filter")
                }
                isActive={activeTag === "No-Filter"}
              ></Tags>
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
                name={"Online"}
                filter={activeTag === "Online" ? null : () => filter("Online")}
                isActive={activeTag === "Online"}
              ></Tags>
              <Tags
                name={"Other"}
                filter={activeTag === "Other" ? null : () => filter("Other")}
                isActive={activeTag === "Other"}
              ></Tags>
            </div>
          </TagsStyle>

          <div
            style={{
              width: "90%",
            }}
          >
            <h3>Trending Events</h3>
          </div>
          {noEvents ? (
            <>
\              <img src={noResultsImage} alt="No Results" />
              <h3>{`No Results found, Try Another Tag :)`}</h3>
            </>
          ) : (
            <EventSlider
              events={filteredTrendingEvents?.sort((a, b) => (a.ticket_count / a.capacity) - (b.ticket_count / b.capacity))}
              onDisplayEvent={displayEvent}
            ></EventSlider>
          )}
          {/* {console.log(filteredTrendingEvents)} */}

          <div
            style={{
              width: "90%",
            }}
          >
            <h3> Upcoming Events</h3>
          </div>
          {noEvents ? null : (
            <EventSlider
              events={filteredEvents?.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              )}
              onDisplayEvent={displayEvent}
            ></EventSlider>
          )}

          <div
            style={{
              width: "90%",
            }}
          >
            <h3>Calendar</h3>
          </div>
          {filteredEvents ? (
            <>
              <MyCalendar filter={filteredEvents}></MyCalendar>
            </>
          ) : (
            <p>No Events to display</p>
          )}
        </Body>
      </Page>
      {EventsDisplay && (
        <>
          <EventRight >
            <Xicon
              onClick={() => setEventsDisplay(null)}
              style={{ color: "black" }}
            ></Xicon>
            {!summary ? (
              <EventDisplay
                events={EventsDisplay}
                loading={loading}
                setLoading={setLoading}
                onDisplaySummary={displaySummary}
              ></EventDisplay>
            ) : (
              <Summary event={summary} setEventsDisplay={setEventsDisplay}/>
            )}
          </EventRight>
        </>
      )}
    </>
  );
};

export default HomePage;
