import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CatDivsContainer() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false); // State for toggling the third row of categories

  const handleNavigation = (destination) => {
    navigate(destination); // Navigate to the specified destination
  };

  const toggleMore = () => {
    setShowMore(!showMore); // Toggle the visibility of the third row
  };

  return (
    <div className="cat-divs-container">
      {/* First Row */}
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\programming.svg" alt="" />
        <strong>Programming <br /> & Tech</strong>
      </div>
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\graphics.svg" alt="" />
        <strong>Graphics & Design</strong>
      </div>
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\marketing.svg" alt="" />
        <strong>Digital Marketing</strong>
      </div>

      {/* Second Row */}
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\translation.svg" alt="" />
        <strong>Writing & Translation</strong>
      </div>
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\animation.svg" alt="" />
        <strong>Video & <br />Animation</strong>
      </div>
      <div className="cat-div" onClick={() => handleNavigation("/gig")}>
        <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\ai.svg" alt="" />
        <strong>AI Services</strong>
      </div>

      {/* Third Row - Initially hidden, will show when toggled */}
      <div className={`cat-divs-container third-row ${showMore ? "show" : ""}`}>
        <div className="cat-div" onClick={() => handleNavigation("/gig")}>
          <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\music.svg" alt="" />
          <strong>Music & Audio</strong>
        </div>
        <div className="cat-div" onClick={() => handleNavigation("/gig")}>
          <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\business.svg" alt="" />
          <strong>Business</strong>
        </div>
        <div className="cat-div" onClick={() => handleNavigation("/gig")}>
          <img style={{ width: "29px" }} src="src\services\imgs\design.imgs\consulting.svg" alt="" />
          <strong>Consulting</strong>
        </div>
      </div>

      {/* Button to toggle the third row */}
      <button className="view-more-btn" onClick={toggleMore}>
        {showMore ? "View Less" : "View 3 More"}
      </button>
    </div>
  );
}


// import React from "react"; 
// import { AddImg } from "../cmps/AddImg.jsx";
// import { useNavigate } from "react-router-dom";

 

// export function CatDivsContainer(){
//     const navigate = useNavigate();

//     const handleNavigation = (destination) => {
//       navigate(destination); // Navigate to the specified destination
//     };
//     return(
// <div className="cat-divs-container">
//             <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//               <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\programming.svg"
//                alt=""
//              />
//              <strong>Programming <br /> &  Tech</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\graphics.svg"
//                alt=""
//              />
//             <strong> Graphics & Design</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//               <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\marketing.svg"
//                alt=""
//              />
//             <strong> Digital Marketing</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\translation.svg"
//                alt=""
//              />
//             <strong> Writing & Translation</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\animation.svg"
//                alt=""
//              />
//             <strong> Video & <br />Animation</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\ai.svg"
//                alt=""
//              />
//            <strong>  AI Services</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\music.svg"
//                alt=""
//              />
//             <strong> Music & Audio</strong>
//            </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\business.svg"
//                alt=""
//              />
//              <strong>Business</strong>
//             </div>
//            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
//              <img
//                style={{ width: "29px" }}
//                src="src\services\imgs\design.imgs\consulting.svg"
//                alt=""
//              />
//             <strong> Consulting</strong>
//            </div>
//           </div>
//     )
// }