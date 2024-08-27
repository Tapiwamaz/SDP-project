import React from 'react'
import Header from '../Header/Header'
import { Body,SearchContainer,SearchInput,StyledSearchIcon,TagsStyle } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'
import Tags from '../Tags/Tags'

const HomePage = () => {


  const search=(e)=>{//function for searching for event name
    console.log(e.target.value);
  }

  const print=()=>{
    console.log("printitng");
    

  }


  return (
    <>
     <Header></Header>
     <Body>
      <SearchContainer>
          <StyledSearchIcon />
          <SearchInput placeholder="Search" onChange={(e) => search(e)} />
      </SearchContainer>


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
      
      <EventSlider></EventSlider>

     </Body>

    </>
   
   
  )
}

export default HomePage
