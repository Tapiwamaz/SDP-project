import React from 'react'
import Header from '../Header/Header'
import { Body,SearchContainer,SearchInput,StyledSearchIcon,Tags } from './HomePage.styles'

import EventSlider from '../EventsSlider/EventSlider'

const HomePage = () => {


  const search=(e)=>{//function for searching for event name
    console.log(e.target.value);
  }


  return (
    <>
     <Header></Header>
     <Body>
      <SearchContainer>
          <StyledSearchIcon />
          <SearchInput placeholder="Search" onChange={(e) => search(e)} />
      </SearchContainer>

      <Tags>
        <h3>
          Tags
        </h3>
        <div>
          <button className='education'>Educational</button>
          <button className='Sports'>Sports</button>
          <button className='Entertainment'>Entertainment</button>
          <button className='Political'>Political</button>
          <button className='Religious'>Religious</button>
          <button className='Gaming'>Gaming</button>
          <button className='IT'>IT</button>
          <button className='Other'>Other</button>


        </div>
      </Tags>

      <h3>Trending Events</h3>
      <EventSlider></EventSlider>

     </Body>

    </>
   
   
  )
}

export default HomePage
