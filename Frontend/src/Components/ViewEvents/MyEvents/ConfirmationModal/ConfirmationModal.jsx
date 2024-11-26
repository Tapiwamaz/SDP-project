// import React from "react";
// import "./ConfirmationModal.css"; // Add styles for the modal here

// const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <p>{message}</p>
//         <div className="modal-buttons">
//           <button onClick={onConfirm} className="confirm-button">
//             Confirm
//           </button>
//           <button onClick={onCancel} className="cancel-button">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;

import React from 'react';
import "./ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p><b>{message}</b></p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onClose} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

