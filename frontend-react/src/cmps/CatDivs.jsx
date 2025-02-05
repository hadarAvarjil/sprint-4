import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../store/actions/gig.actions.js";
import { useSelector, useDispatch } from "react-redux";
import { AddImg } from "./AddImg.jsx";
 
 
export function CatDivsContainer(){
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function setCatFilter( category) {
    dispatch(setFilter({ ...filterBy, cat: category }))
    navigate('/gig');
    }
    const handleNavigation = (destination) => {
      navigate(destination); 
    }; 
    return(
<div className="cat-divs-container">
            <div className="cat-div" onClick={() => setCatFilter('Programming & Tech')} to={`/gig`}>
             <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686850/programming_fcxx6u.svg'/>
  
             <strong>Programming <br /> &  Tech</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Graphics & Design')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/graphics_bg8cls.svg'/>

            <strong> Graphics & Design</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Digital Marketing')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686849/marketing_msidoa.svg'/>

            <strong> Digital Marketing</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Writing & Translation')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686850/translation_ogytoi.svg'/>

            <strong> Writing & Translation</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Video & Animation')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686851/animation_nhj0nn.svg'/>
  
            <strong> Video & <br />Animation</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('AI Services')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686851/ai_vpzq5x.svg'/>

           <strong>  AI Services</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Music & Audio')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686849/music_iiy6ah.svg'/>

            <strong> Music & Audio</strong>
           </div>
           <div className="cat-div" onClick={() => setCatFilter('Business')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686847/business_q9beex.svg'/>

             <strong>Business</strong>
            </div>
           <div className="cat-div" onClick={() => setCatFilter('Data')} to={`/gig`}>
           <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/consulting_q2ummq.svg'/>
  
            <strong> Data</strong>
           </div>
          </div>
    )
}