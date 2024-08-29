import React, { useState } from 'react'
import Header from '../Header/Header'
import {Aside, Body,SearchContainer,SearchInput,StyledSearchIcon,TagsStyle,SearchBack } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'
import Tags from '../Tags/Tags'
import { Events } from '../MockData/EventsMock'

const HomePage = () => {

  const [searchValue,setSearchValue]=useState(null);
  const EventsOld=Events;
  // const newEvents=Events.sort((a, b) => new Date(a.date) - new Date(b.date));


  const search=(e)=>{//function for searching for event name
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  const print=()=>{
    console.log("printitng");
  }


  return (
    <>
     <Header></Header>
     <Aside>

     </Aside>
     <Body>
      <SearchContainer>
          <StyledSearchIcon />
          <SearchInput placeholder="Search" onChange={ (e) => search(e) } />
      </SearchContainer>



      {searchValue?
          <>
          <h3>Results for {`"${searchValue}"`}</h3>
          <EventSlider events={Events.filter(e=>e.name.includes(searchValue))}></EventSlider>

          </>

          
              
            :null
      
      }

      <TagsStyle>
        <h3>
          Tags
        </h3>
        <div>
        <Tags name={"Education"} print={print}></Tags>
        <Tags name={"Sports"} print={print}></Tags>
        <Tags name={"Political"} print={print}></Tags>
        <Tags name={"Entertainment"} print={print}></Tags>
        <Tags name={"Gaming"} print={print}></Tags>
        <Tags name={"IT"} print={print}></Tags>
        <Tags name={"Religious"} print={print}></Tags>
        <Tags name={"Other"} print={print}></Tags>
        </div>
      </TagsStyle>
      


      <h3>Trending Events</h3>
      
      <EventSlider events={EventsOld}></EventSlider>

      <h3>Latest Events</h3>

      
      <EventSlider events={Events}></EventSlider>



     </Body>

    </>
   
   
  )
}

export default HomePage
