import React, {  useEffect, useState } from 'react'
import Header from '../Header/Header'
import {Page, Body,SearchContainer,SearchInput,StyledSearchIcon,TagsStyle } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'
import AsideDesktop from '../AsideDesktop/AsideDesktop'
import Tags from '../Tags/Tags'
import { Events } from '../MockData/EventsMock'

import noResultsImage from '../../Images/noResults.svg';

import MyCalendar from '../EventsCalendar/EventsCalendar'

import EventDisplay from '../EventDisplay/EventDisplay'




const HomePage = () => {
  const[allEvents,setAllEvents]=useState(null);

  const [filteredEvents,SetFilteredEvents]=useState(null);

  useEffect(() => {
    const fetchEvents = async () =>{
      try {
          // Using relative URL
          const response = await fetch('/api/Basic', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          // console.log('Data received from Azure Function:', data);
          // console.log(data);

          setAllEvents(data);
          SetFilteredEvents(data);
          return data;
      } catch (error) {
          console.error('Error fetching data:', error);
          return null;
      }
  }
  fetchEvents();

  },[])
  
 
  const [searchValue,setSearchValue]=useState(null);
  const filteredDateEvents= Events.sort((a, b) => new Date(a.date) - new Date(b.date));
  const [activeTag, setActiveTag] = useState('No-Filter'); // State to track the active tag
  const[noEvents,setNoEvents]=useState(false);
  // const[clickedBooked,setClickedBooked]=useState(false);




  const search=(e)=>{//function for searching for event name
    setSearchValue(e.target.value);
  }

  // useEffect(()=>{

  // },[filteredEvents])
  const[EventsDisplay,setEventsDisplay]=useState(null);
  const displayEvent=(event)=>{
    setEventsDisplay(event);
  }

  const filter=(type)=>{
    if(type==="No-Filter"){
      setActiveTag(type);
      SetFilteredEvents(allEvents);
      setNoEvents(false);


    }
    else{
      setActiveTag(type);
      if(allEvents.filter(e=>e.type.match(type)).filter(e=>e.approved===true).length>0){
        SetFilteredEvents(allEvents.filter(e=>e.type.match(type)).filter(e=>e.approved===true));
        setNoEvents(false);


      }
      else{
        setNoEvents(true);
        SetFilteredEvents(null);
      }



    }


    
  }




  return (
    <>
      <Header ></Header>
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
              {allEvents.filter((e) => e.name.includes(searchValue)).length > 0 ? ( //if the array is empty display no results svg
                <EventSlider
                  events={allEvents.filter((e) => e.name.includes(searchValue))}
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
                filter={
                  activeTag === "Online" ? null : () => filter("Online")
                }
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
          {noEvents?
           <>  <img src={noResultsImage} alt="No Results" />

           <h3>{`No Results found, Try Another Tag :)`}</h3>
           </>
          :
           <EventSlider
           events={filteredEvents}
           onDisplayEvent={displayEvent}

         ></EventSlider>
         
          
        }

         
          <div
            style={{
              width: "90%",
            }}
          >
            <h3>Latest Events</h3>
          </div>
          {noEvents?
          null
                    
          :
          <EventSlider
          events={filteredEvents}
          onDisplayEvent={displayEvent}

          ></EventSlider>


          }

        
              <div
            style={{
              width: "90%",
            }}
          >
            <h3>Calendar</h3>
          </div>
            {filteredEvents?
            <>
                      <MyCalendar filter={filteredEvents}></MyCalendar>
                      </>:
                      <p>No Events to display</p>

            }
        </Body>
        {console.log(`${EventsDisplay} from home page`)
        }
      </Page>
      {EventsDisplay && <EventDisplay events={EventsDisplay}></EventDisplay>}
    </>
  );
}

export default HomePage
