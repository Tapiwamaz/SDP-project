import React from 'react'
import { useEffect,useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import  Tags from '../Tags/Tags'
import { useNavigate } from 'react-router-dom';

import {LoadingCard, Card ,CustomCarousel,Container} from './EventSlider.styles';

const EventSlider = ({events}) => {
  const navigate = useNavigate();
    const [slidePercentage, setSlidePercentage] = useState(60);
    const [noEvents, setNoEvents] = useState([
      {events:"no"},
      {events:"no"},
      {events:"no"},
      {events:"no"},
      {events:"no"}

    ]);

  
  useEffect(() => {
      const updateSlidePercentage = () => {
        const screenWidth = window.innerWidth; // need to adjust the slide percentage based on screen size
         if (screenWidth <= 768) {
          setSlidePercentage(70); // Closer to full width on small screens
        }
       

         else {
          setSlidePercentage(20); // Default for larger screens
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

  const eventStartTime = new Date(time);
  const formattedTime = eventStartTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true      // Use 12-hour time (AM/PM)
  });
  return formattedTime
}

const goToEvent=(event)=>{
  console.log(event);
navigate('/event' , {state: {event,booked:true}}); 
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

                
                <Card key={event.id} onClick={()=>goToEvent(event)}>
                    <img src='https://images.hdqwalls.com/wallpapers/water-through-rocks-4k-kl.jpg' alt='eventImage'/>
                    <h3>{event.name}</h3>
                    <div>
                      <p>{formatDate(event.date.split("T")[0])}</p>
                      <p>{formatTime(event.start_time)}</p>
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

        </Container>
      
    );
  }
  export default EventSlider