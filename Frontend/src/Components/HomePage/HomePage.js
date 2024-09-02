import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import {Page, Body,SearchContainer,SearchInput,StyledSearchIcon,TagsStyle } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'
import Tags from '../Tags/Tags'
import { Events } from '../MockData/EventsMock'

const HomePage = () => {

  const [searchValue,setSearchValue]=useState(null);
  const [filteredEvents,SetFilteredEvents]=useState(Events);

  const [activeTag, setActiveTag] = useState(null); // State to track the active tag


  // const newEvents=Events.sort((a, b) => new Date(a.date) - new Date(b.date));



  const search=(e)=>{//function for searching for event name
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  useEffect(()=>{

  },[filteredEvents])

  const filter=(type)=>{
    // console.log("filteritng")
    setActiveTag(type);

    SetFilteredEvents(Events.filter(e=>e.type.match(type)));

       
  }




  return (
    <>
     <Header></Header>
     <Page>
      {/* <Aside >
            <AsideNavItem href="#home" >Home</AsideNavItem>
            <AsideNavItem href="#about" >About</AsideNavItem>
            <AsideNavItem href="#services" >Services</AsideNavItem>
            <AsideNavItem href="#contact" >Contact</AsideNavItem>

      </Aside> */}
      <Body>
        <SearchContainer>
            <StyledSearchIcon />
            <SearchInput placeholder="Search" onChange={ (e) => search(e) } />
        </SearchContainer>



        {searchValue &&
            <>
            <h3>Results for {`"${searchValue}"`}</h3>
            <EventSlider events={Events.filter(e=>e.name.includes(searchValue))}></EventSlider>

            </>
            
            
        }

        <TagsStyle>
          <h3>
            Tags
          </h3>
          <div>
          <Tags name={"Education"} filter={activeTag === "Education" ? null : () => filter("Education")} isActive={activeTag === "Education"}></Tags>
          <Tags name={"Sports"} filter={activeTag === "Sports" ? null : () => filter("Sports")} isActive={activeTag === "Sports"} ></Tags>
          <Tags name={"Political"} filter={activeTag === "Political" ? null : () => filter("Political")} isActive={activeTag === "Political"}></Tags>
          <Tags name={"Entertainment"} filter={activeTag === "Entertainment" ? null : () => filter("Entertainment")} isActive={activeTag === "Entertainment"}></Tags>
          <Tags name={"Gaming"} filter={activeTag === "Gaming" ? null : () => filter("Gaming")} isActive={activeTag === "Gaming"}></Tags>
          <Tags name={"IT"} filter={activeTag === "IT" ? null : () => filter("IT")} isActive={activeTag === "IT"}></Tags>
          <Tags name={"Religious"} filter={activeTag === "Religious" ? null : () => filter("Religious")} isActive={activeTag === "Religious"}></Tags>
          <Tags name={"Other"} filter={activeTag === "Other" ? null : () => filter("Other")} isActive={activeTag === "Other"}></Tags>
          </div>
        </TagsStyle>
        


        <h3>Trending Events</h3>
        
        <EventSlider events={filteredEvents}></EventSlider>

        <h3>Latest Events</h3>

        
        <EventSlider events={Events}></EventSlider>



      </Body>
     </Page>

    </>
   
   
  )
}

export default HomePage
