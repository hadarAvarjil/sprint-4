import React, { useState } from "react";
import ReactDOM from "react-dom"; // SHINOI6: Import ReactDOM
import { LoginSignup } from "./LoginSignup";

export function PurpleAd() {
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); // SHINOI6: State for Join modal

  const handleJoinClick = () => {
    setIsJoinDivVisible(true); // SHINOI6
  };

  const handleCloseModal = (e) => { 
    if (e.target.classList.contains("modal-overlay")) { // SHINOI6: Ensure only clicking outside closes modal
      setIsJoinDivVisible(false);
    }
  };

  return ( 
    <div className="purple-signup-ad">
      <h1>
        Freelance services at your <span>fingertips</span>
      </h1>

      <button
        style={{ width: "115px" }}
        className="white-join-btn"
        onClick={handleJoinClick} // SHINOI6: Open Join modal
      >
        Join Gigster
      </button>

      {/* SHINOI6: Only renders Join option */}
      {isJoinDivVisible &&
        ReactDOM.createPortal(
          <div
            className="modal-overlay"
            onClick={handleCloseModal} // SHINOI6
          >
            <div className="modal-content">
              <LoginSignup
                isLoginSignUpShow={isJoinDivVisible}
                setIsLoginSignUpShow={setIsJoinDivVisible}
                isSignup={true} // Signup mode (Join)
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
