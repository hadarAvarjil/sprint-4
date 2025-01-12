import React from "react";
import { AddImg } from "../cmps/AddImg.jsx";
import { useNavigate } from "react-router-dom";



export function CatDivsContainer(){
    const navigate = useNavigate();

    const handleNavigation = (destination) => {
      navigate(destination); // Navigate to the specified destination
    };
    return(
<div className="cat-divs-container">
            <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
              <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\programming.svg"
               alt=""
             />
             Programming & Tech
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\graphics.svg"
               alt=""
             />
             Graphic & Design
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
              <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\marketing.svg"
               alt=""
             />
             Digital Marketing
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\translation.svg"
               alt=""
             />
             Writing & Translation
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\animation.svg"
               alt=""
             />
             Video &Animation
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\ai.svg"
               alt=""
             />
             AI Services
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\music.svg"
               alt=""
             />
             Music & Audio
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\consulting.svg"
               alt=""
             />
             Consulting
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\business.svg"
               alt=""
             />
             Business
            </div>
          </div>
    )
}