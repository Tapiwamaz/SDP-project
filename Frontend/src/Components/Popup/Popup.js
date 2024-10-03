// import React from 'react';
// import "./Popup.css";

// function Popup(props) {
//   return (props.trigger) ? (
//     <div className="popup">
//         <div className="popup-inner">
//             <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
//             { props.children }
//         </div>
//     </div>
//   ) : "";
// }

// export default Popup;

import React, { useEffect, useRef } from 'react';
import './Popup.css';
import { Xicon } from '../Header/Header.styles';


function Popup({ trigger, setTrigger, children }) {
    const popupRef = useRef();

    useEffect(() => {
        // Close popup when clicking outside of the popup content
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setTrigger(false);
            }
        };

        // Attach event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setTrigger]);

    return trigger ? (
        <div className="popup">
            <div className="popup-inner" ref={popupRef}>
                <Xicon style={{color:"black"}} onClick={() => setTrigger(false)}>close</Xicon>
                <h3>Description for Event:</h3>
                <p>{children}</p>
            </div>
        </div>
    ) : null;
}

export default Popup;
