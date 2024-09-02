import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import {Page, Body,SearchContainer,SearchInput,StyledSearchIcon,TagsStyle } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'
import AsideDesktop from '../AsideDesktop/AsideDesktop'
import Tags from '../Tags/Tags'
import { Events } from '../MockData/EventsMock'

import noResultsImage from '../../Images/noResults.svg';




const HomePage = () => {

  const [searchValue,setSearchValue]=useState(null);
  const [filteredEvents,SetFilteredEvents]=useState(Events);
  const [filteredDateEvents,SetFilteredDateEvents]=useState(Events.sort((a, b) => new Date(a.date) - new Date(b.date)));


  const [activeTag, setActiveTag] = useState(null); // State to track the active tag





  const search=(e)=>{//function for searching for event name
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  // useEffect(()=>{

  // },[filteredEvents])

  const filter=(type)=>{
    // console.log("filteritng")
    setActiveTag(type);

    SetFilteredEvents(Events.filter(e=>e.type.match(type)));

       
  }




  return (
    <>
     <Header></Header>
     <Page>
      <AsideDesktop></AsideDesktop>{/*Global aside called */}
      <Body>
        <SearchContainer>
            <StyledSearchIcon />
            <SearchInput placeholder="Search" onChange={ (e) => search(e) } maxLength={50}/> {/*max lenght of input */}
        </SearchContainer>



        {searchValue && (
            <>
              <h3>Results for {`"${searchValue}"`}</h3>
              {Events.filter(e => e.name.includes(searchValue)).length > 0 ? (//if the array is empty display no results svg
                <EventSlider events={Events.filter(e => e.name.includes(searchValue))} />
              ) : (
                <>
                <img src={noResultsImage} alt="No Results" />
                <h3>No Results found</h3>
                </>
                
              )}
            </>
          )}


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

        
        <EventSlider events={filteredDateEvents}></EventSlider>



      </Body>
    </Page>

    </>
   
   
  )
}

export default HomePage
