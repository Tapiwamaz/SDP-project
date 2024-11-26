import React, { useEffect, useRef } from 'react';
import './Popup.css';
import { Xicon } from '../../Header/Header.styles';

function Popup({ trigger, setTrigger, title, children }) {
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
                {/* <button className="close-btn" onClick={() => setTrigger(false)}>×</button> */}
                <Xicon style={{color:"black", cursor: "pointer"}} onClick={() => setTrigger(false)}>close</Xicon>
                {title && <h3>{title}</h3>}
                <p>{children}</p>
            </div>
        </div>
    ) : null;
}

export default Popup;
