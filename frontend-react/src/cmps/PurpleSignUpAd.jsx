import React from "react";
import { useState } from 'react'

import { JoinDiv } from "./JoinDiv"; 

export function PurpleAd() {
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false);

  const handleOpenJoinDiv = () => {
    setIsJoinDivVisible(true);
  };
  const handleCloseJoinDiv = (e) => {
    if (e.target.className === "modal-overlay") {
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
        onClick={handleOpenJoinDiv}
      >
        Join Gigster
      </button>
      {isJoinDivVisible && (
        <div className="modal-overlay" onClick={handleCloseJoinDiv}>
          <JoinDiv />
        </div>
      )}
    </div>
  );
}
