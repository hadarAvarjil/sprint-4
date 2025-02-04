import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../store/actions/gig.actions.js";
import { useSelector, useDispatch } from "react-redux";
 

export function CatDivsContainer(){
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function setCatFilter( category) {
    dispatch(setFilter({ ...filterBy, cat: category }))
    navigate('/gig');
    }
    const handleNavigation = (destination) => {
      navigate(destination); // Navigate to the specified destination
    }; 
    return(
<div className="cat-divs-container">
            <div className="cat-div" onClick={() => setCatFilter('Programming & Tech')} to={`/gig`}>
             
              <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\programming.svg"
               alt=""
             />
             <strong>Programming <br /> &  Tech</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Graphics & Design')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\graphics.svg"
               alt=""
             />
            <strong> Graphics & Design</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Digital Marketing')} to={`/gig`}>
             
              <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\marketing.svg"
               alt=""
             />
            <strong> Digital Marketing</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Writing & Translation')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\translation.svg"
               alt=""
             />
            <strong> Writing & Translation</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Video & Animation')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\animation.svg"
               alt=""
             />
            <strong> Video & <br />Animation</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('AI Services')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\ai.svg"
               alt=""
             />
           <strong>  AI Services</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Music & Audio')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
               src="src\services\imgs\design.imgs\music.svg"
               alt=""
             />
            <strong> Music & Audio</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Business')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\business.svg"
               alt=""
             />
             <strong>Business</strong>
            </div>
           <div className="cat-div" onClick={() => setCatFilter('Data')} to={`/gig`}>
             
             <img
              //  style={{ width: "29px" }}
              src="src\services\imgs\design.imgs\consulting.svg"
               alt=""
             />
            <strong> Data</strong>
           </div>
          </div>
    )
}