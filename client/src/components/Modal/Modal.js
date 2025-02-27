import "./Modal.css";
import { useState } from "react";

export default function Modal({ handleClose }) {
  const [isOpened, setIsOpened] = useState(true);

  // Function to close modal when clicking outside
  const toggleModal = (e) => {
    setIsOpened(!isOpened);
    handleClose(isOpened);
  };

  return (
    <div className="modal-container">
      {isOpened && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Close (X) Button */}
            <button className="close-btn" onClick={toggleModal}>
              ✖
            </button>

            {/* Modal Text */}
            <p className="modal-text">
              Are you sure you want to apply these changes?
            </p>

            {/* Action Buttons */}
            <div className="modal-buttons">
              <button className="apply-btn">Apply Changes</button>
              <button className="review-btn">Continue Reviewing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
