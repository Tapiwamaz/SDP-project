import React, {useState, useEffect} from 'react'
import arrowUp from "./arrowUp.svg";
import "./ScrollToTopButton.css";



// function ScrollToTopButton() {

//     const scrollToTop = () => {
//         window.scrollTo({
//             top:0,
//             behavior: "smooth",
//         });
//     };  

//   return (
//     <button className='scroll-to-top' onClick={scrollToTop}>
//         <img src={arrowUp} alt="Scroll to top" width="24" height="24" />
//     </button>
//   )
// }

// export default ScrollToTopButton

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 100); // Button appears after 100px scroll
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <img src={arrowUp} alt="Scroll to top" width="24" height="24" />
        </button>
      )
    );
  }
  
  export default ScrollToTopButton;