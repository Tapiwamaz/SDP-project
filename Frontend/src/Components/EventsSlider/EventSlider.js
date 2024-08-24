import React from 'react'
import { useEffect,useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


import { Card ,CustomCarousel,Container} from './EventSlider.styles';

const EventSlider = () => {
    const [slidePercentage, setSlidePercentage] = useState(60);
  
    useEffect(() => {
      const updateSlidePercentage = () => {
        const screenWidth = window.innerWidth;
         if (screenWidth <= 768) {
          setSlidePercentage(60); // Closer to full width on small screens
        } else {
          setSlidePercentage(15); // Default for larger screens
        }
      };
  
      window.addEventListener('resize', updateSlidePercentage);
      updateSlidePercentage(); // Initial check
  
      return () => {
        window.removeEventListener('resize', updateSlidePercentage);
      };
    }, []);
  
    return (
        <Container>
            <CustomCarousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                emulateTouch={true}
                centerMode={true}
                centerSlidePercentage={slidePercentage}
                showArrows={true} // Optional: Hide arrows for a cleaner look
            >
                <Card>Hello</Card>
                <Card>Hello</Card>
                <Card>Hello</Card>
                <Card>Hello</Card>
      </CustomCarousel>

        </Container>
      
    );
  }
  export default EventSlider