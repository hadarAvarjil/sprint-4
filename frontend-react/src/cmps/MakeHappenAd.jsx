import React from "react";
import { useState } from 'react'
import { LoginSignup } from "./LoginSignup";
import ReactDOM from "react-dom"; 
import { AddImg } from "./AddImg";


export function MakeHappenAd(){
 const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); 

  const handleJoinClick = () => {
    setIsJoinDivVisible(true); 
  };

  const handleCloseModal = (e) => { 
    if (e.target.classList.contains("modal-overlay")) { 
      setIsJoinDivVisible(false);
    }
  };
    return(
        
   
        <div className="divs-container">
        <h1> Make it all happen with <br className="small-resp-br"/> freelancers</h1>

        <div className="signup-ad icons-divs-container">
          <div className="icons-div">
            <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686850/squares_eq3its.jpg'/>
            <p>Access a pool of top talent <br/> across 700 categories</p>
          </div>

          <div className="icons-div">
          <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/clock_ohfwow.jpg'/>
            <p>Enjoy a simple, easy-to-use<br/> matching experience</p>
          </div>

          <div className="icons-div">
          <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686849/lightning_dxrw6c.jpg'/>
            <p>Get quality work done quickly<br/> and within budget</p>
          </div>

          <div className="icons-div">
<AddImg  picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/dollar_ufyw3w.jpg'/>
            <p>Only pay when you’re happy</p>
          </div>
        </div>

        <button
        onClick={handleJoinClick} 
        className="blk-join-btn"
        >
          join now
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
    )
}