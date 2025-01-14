import React from "react";


export function PurpleAd(){
    return(
        <div className="purple-signup-ad">
        <h1>
          
          Freelance services at your <span>fingertips</span>
        </h1>

        <button
          style={{ width: "115px" }}
          className="white-join-btn"
          onClick={() => handleNavigation("login")}
        >
          Join Gigster
        </button>
      </div>
    )
}