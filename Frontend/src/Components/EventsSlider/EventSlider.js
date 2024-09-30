import React from "react";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import  Tags from '../Tags/Tags'
import EventPage from '../../pages/EventPage/EventPage';
import { useNavigate } from 'react-router-dom';

import {LoadingCard, Card ,CustomCarousel,Container,Aside} from './EventSlider.styles';

import { auth } from '../../firebase_config';


const EventSlider = ({events,onDisplayEvent}) => {
    const [slidePercentage, setSlidePercentage] = useState(60);
    const[screen,setScreen]=useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const noEvents = [
      { events: "no" },
      { events: "no" },
      { events: "no" },
      { events: "no" },
      { events: "no" },
    ];
    const navigate = useNavigate();


  
  useEffect(() => {
      const updateSlidePercentage = () => {
        const screenWidth = window.innerWidth; // need to adjust the slide percentage based on screen size
         if (screenWidth <= 768) {
          setSlidePercentage(70); // Closer to full width on small screens
          setScreen("phone");
        }
       

         else {
          setSlidePercentage(20); // Default for larger screens
          setScreen("desktop");
        }
      };
  
      window.addEventListener('resize', updateSlidePercentage);
      updateSlidePercentage(); // Initial check
  
      return () => {
        window.removeEventListener('resize', updateSlidePercentage);
      };


      
    }, []);
    let formattedDate;
const formatDate=(date)=>{
  const eventDate = new Date(date);
 formattedDate = eventDate.toLocaleDateString('en-US', {
  weekday: 'long',  // Full name of the day (e.g., "Sunday")
  month: 'short',   // Short month name (e.g., "Nov")
  day: 'numeric'    // Numeric day of the month (e.g., "2")
});

return formattedDate;

}
const formatTime=(time)=>{
  // console.log(time);
  

  const eventStartTime = new Date(time);
  // console.log(eventStartTime);
  // console.log("hey");
  
  
  const formattedTime = eventStartTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true      // Use 12-hour time (AM/PM)
  });
  return formattedTime
}

const goToEvent=(event)=>{
  console.log(screen);
  event["booking"]=true;
  if(auth?.currentUser?.email){
    if(screen==="desktop"){
      onDisplayEvent(event);
      
    }
    else{
      navigate('/event' , {state: {event}}); 
    }


  }
  else{
    navigate('/welcome')
  }
  
// navigate('/event' , {state: {event,booked:true}}); 
}
  
    return (
        <Container>
            <CustomCarousel
                showThumbs={false}
                showStatus={false}
                emulateTouch={true}
                centerMode={true}
                centerSlidePercentage={slidePercentage}
                showArrows={true} // Optional: Hide arrows for a cleaner look
            >
              {events?//to check if the events are loaded
              events.filter(e=>e.approved===true).map((event) => (

                
                <Card key={event.event_id} onClick={()=>goToEvent(event)}>
                    <img src={event.image_url} alt='eventImage'/>
                    <h3>{event.name}</h3>
                    <div>
                      <p>{formatDate(event.date)}</p>
                      <p>{event.start_time}</p>
                      <p>{event.location}</p>


                    </div>
                    <Tags name={event.type}></Tags>

                  



                  </Card>
                
                
              ))
             :
             noEvents.map((events)=>(
              <LoadingCard></LoadingCard>

             ))

             }
                
          </CustomCarousel>
          {/* {screen==="desktop"?
          <EventPage></EventPage>
          :<p>bruh</p>} */}


        </Container>
      
    );
  }
  export default EventSlider