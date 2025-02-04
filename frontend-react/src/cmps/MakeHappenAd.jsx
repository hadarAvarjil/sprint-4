import React from "react";
import { useState } from 'react'
import { LoginSignup } from "./LoginSignup";
import ReactDOM from "react-dom"; // SHINOI6: Import ReactDOM
import { AddImg } from "./AddImg";


export function MakeHappenAd(){
 const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); // SHINOI6: State for Join modal

  const handleJoinClick = () => {
    setIsJoinDivVisible(true); // SHINOI6
  };

  const handleCloseModal = (e) => { 
    if (e.target.classList.contains("modal-overlay")) { // SHINOI6: Ensure only clicking outside closes modal
      setIsJoinDivVisible(false);
    }
  };
    return(
        
   
        <div className="divs-container">
        <h1> Make it all happen with <br className="small-resp-br"/> freelancers</h1>

        <div className="signup-ad icons-divs-container">
          <div className="icons-div">
            <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686850/squares_eq3its.jpg'/>
            {/* <img
              src="src\services\imgs\design.imgs\squares.jpeg"
              alt=""
              width={"52px"}
            /> */}
            <p>Access a pool of top talent <br/> across 700 categories</p>
          </div>

          <div className="icons-div">
          <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/clock_ohfwow.jpg'/>
            {/* <img
              src="src\services\imgs\design.imgs\clock.jpeg"
              alt=""
              width={"52px"}
            /> */}
            <p>Enjoy a simple, easy-to-use<br/> matching experience</p>
          </div>

          <div className="icons-div">
          <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686849/lightning_dxrw6c.jpg'/>
            {/* <img
              src="src\services\imgs\design.imgs\lightning.jpeg"
              alt=""
              width={"52px"}
            /> */}
            <p>Get quality work done quickly<br/> and within budget</p>
          </div>

          <div className="icons-div">
<AddImg  picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/dollar_ufyw3w.jpg'/>
            {/* <img
              src="src\services\imgs\design.imgs\dollar.jpeg"
              alt=""
              width={"75px"}
            /> */}
            <p>Only pay when you’re happy</p>
          </div>
        </div>

        <button
        onClick={handleJoinClick} // SHINOI6: Open Join modal
        className="blk-join-btn"
        >
          join now
        </button>
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
    )
}