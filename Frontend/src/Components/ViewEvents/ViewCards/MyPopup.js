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
import './MyPopup.css';

function MyPopup({ trigger, setTrigger, children }) {
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
        <div className="mypopup">
            <div className="mypopup-inner" ref={popupRef}>
                <button className="myclose-btn" onClick={() => setTrigger(false)}>close</button>
                {children}
            </div>
        </div>
    ) : null;
}

export default MyPopup;
