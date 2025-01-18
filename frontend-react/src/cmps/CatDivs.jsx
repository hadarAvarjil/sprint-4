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
             <strong>Programming <br /> &  Tech</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\graphics.svg"
               alt=""
             />
            <strong> Graphic & Design</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
              <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\marketing.svg"
               alt=""
             />
            <strong> Digital Marketing</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\translation.svg"
               alt=""
             />
            <strong> Writing & Translation</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\animation.svg"
               alt=""
             />
            <strong> Video & <br />Animation</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\ai.svg"
               alt=""
             />
           <strong>  AI Services</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\music.svg"
               alt=""
             />
            <strong> Music & Audio</strong>
           </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\business.svg"
               alt=""
             />
             <strong>Business</strong>
            </div>
           <div className="cat-div" onClick={() => handleNavigation("/gig")}>
             
             <img
               style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\consulting.svg"
               alt=""
             />
            <strong> Consulting</strong>
           </div>
          </div>
    )
}