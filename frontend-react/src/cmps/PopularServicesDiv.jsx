import React, { useState } from "react";
import { AddImg } from './AddImg.jsx' 
import { setFilter } from "../store/actions/gig.actions.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";



export function PopularServices() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function setCatFilter( category) {
    dispatch(setFilter({ ...filterBy, cat: category }))
    navigate('/gig');
    }
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; 
  const totalItems = 12; 

  const handleSlide = (direction) => {
    if (direction === "right" && currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + itemsPerPage); 
    } else if (direction === "left" && currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage); 
    }
  };

  return (
    <div className="home-carousel-container">
      <h1 style={{ fontFamily: "helvetica-neue" }}>Popular services</h1>
      <div className="carousel-wrapper">
        {/* Left Arrow */}
        <button
          className={`arrow-btn left-arrow ${currentIndex > 0 ? "visible" : ""}`}
          onClick={() => handleSlide("left")}
        >
          <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737161680/left-arrow_udeeev.svg'}/>
        </button>

        {/* Carousel */}
        <div className="home-carousel">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            {/* Divs */}
            
            <div onClick={() => setCatFilter('Programming & Tech')} to={`/gig`} 
             className="popular-div light-green-div first-pop-div">
              <h3 className="pop-div-title">Programming & Tech</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.56_1_pyspmu.jpg'}/>
              </div>
            </div> 
            <div onClick={() => setCatFilter('Graphics & Design')} to={`/gig`} className="popular-div orange-div">
              <h3 className="pop-div-title">Graphics & Design</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.55_2_hckvzx.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('AI Services')} to={`/gig`} className="popular-div dark-green-div"> 
              <h3 className="pop-div-title">AI Services</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_1_hivb1p.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Graphics & Design')} to={`/gig`} className="popular-div purple-div">
              <h3 className="pop-div-title">Digital Marketing</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_eofkkc.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div green-shrek-div">
              <h3 className="pop-div-title">Video & Animation</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.55_1_pxgamn.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Music & Audio')} to={`/gig`} className="popular-div brown-div">
              <h3 className="pop-div-title">Music & Audio</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.53_xq2w2p.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div pink-div">
              <h3 className="pop-div-title">Data Science</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.53_1_r1e8aj.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Programming & Tech')} to={`/gig`} className="popular-div green-swamp-div">
              <h3 className="pop-div-title">Data</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.53_2_ndgpxw.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Data')} to={`/gig`} className="popular-div light-brown-div">
              <h3 className="pop-div-title">Business</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.55_zcb4lf.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Photography')} to={`/gig`} className="popular-div green-shrek-div">
              <h3 className="pop-div-title">Photography</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_2_st7oyu.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div light-green-div">
              <h3 className="pop-div-title">Writing & Translation</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.55_3_aagztg.jpg'}/>
              </div>
            </div>
            <div onClick={() => setCatFilter('Video & Animation')} to={`/gig`} className="popular-div pink-div">
              <h3 className="pop-div-title">SEO & Advertising</h3>
              <div className="pop-inner-pic">
              <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.56_zhxfha.jpg'}/>
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className={`arrow-btn right-arrow ${
            currentIndex + itemsPerPage < totalItems ? "visible" : ""
          }`}
          onClick={() => handleSlide("right")}
        >
          <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737161680/right-arrow_s1msdo.svg'}/>
          </button>
      </div>
    </div>
  );
}