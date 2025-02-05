import React, { useState } from "react";
import ReactDOM from "react-dom"; 
import { LoginSignup } from "./LoginSignup";

export function PurpleAd() {
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); 

  const handleJoinClick = () => {
    setIsJoinDivVisible(true); 
  };

  const handleCloseModal = (e) => { 
    if (e.target.classList.contains("modal-overlay")) { 
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
        onClick={handleJoinClick} 
      >
        Join Gigster
      </button>

      {isJoinDivVisible &&
        ReactDOM.createPortal(
          <div
            className="modal-overlay"
            onClick={handleCloseModal} 
          >
            <div className="modal-content">
              <LoginSignup
                isLoginSignUpShow={isJoinDivVisible}
                setIsLoginSignUpShow={setIsJoinDivVisible}
                isSignup={true} 
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
