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
  const itemsPerPage = 6; // Number of items visible at a time
  const totalItems = 12; // Total number of divs

  const handleSlide = (direction) => {
    if (direction === "right" && currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + itemsPerPage); // Move forward by 6
    } else if (direction === "left" && currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage); // Move backward by 6
    }
  };

  return (
    <div className="home-carousel-container">
      <h1 style={{ fontFamily: "helvetica-neue" }}>Popular Services</h1>
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
              <h3 className="pop-div-title">Website Development</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551937/website-development_gig20i.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Graphics & Design')} to={`/gig`} className="popular-div orange-div">
              <h3 className="pop-div-title">Logo Design</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551938/logo-design_xgy1r3.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('AI Services')} to={`/gig`} className="popular-div dark-green-div"> 
              <h3 className="pop-div-title">SEO</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551932/seo_dsq2bi.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Graphics & Design')} to={`/gig`} className="popular-div purple-div">
              <h3 className="pop-div-title">Architecture & Interior Design</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551927/architecture-design_jrrbas.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div green-shrek-div">
              <h3 className="pop-div-title">Social Media Marketing</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551929/social-media-marketing_iqwnam.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Music & Audio')} to={`/gig`} className="popular-div brown-div">
              <h3 className="pop-div-title">Voice Over</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551933/voice-over_uhjbg2.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div pink-div">
              <h3 className="pop-div-title">UGC Videos</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/UGC_Video_img_zhwx4i.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Programming & Tech')} to={`/gig`} className="popular-div green-swamp-div">
              <h3 className="pop-div-title">Software Development</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/software-development_y9qxvb.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Data')} to={`/gig`} className="popular-div light-brown-div">
              <h3 className="pop-div-title">Data Science & ML</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551930/data-science_nhnvos.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Photography')} to={`/gig`} className="popular-div green-shrek-div">
              <h3 className="pop-div-title">Product Photography</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551931/product-photography_qofjrg.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Digital Marketing')} to={`/gig`} className="popular-div light-green-div">
              <h3 className="pop-div-title">E-Commerce Marketing</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551934/e-commerce_ozwc08.webp" />
              </div>
            </div>
            <div onClick={() => setCatFilter('Video & Animation')} to={`/gig`} className="popular-div pink-div">
              <h3 className="pop-div-title">Video Editing</h3>
              <div className="pop-inner-pic">
                <img src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551935/video-editing_xcfy43.webp" />
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

// import React, { useState, useRef } from "react";
// import { AddImg } from "../cmps/AddImg.jsx";

// export function PopularServices() {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [showRightArrow, setShowRightArrow] = useState(true); // Initially show the right arrow
//   const [showLeftArrow, setShowLeftArrow] = useState(false);  // Initially hide the left arrow
//   const carouselRef = useRef(null);

//   const handleScroll = (direction) => {
//     const scrollAmount = (208 + 30) * 6; // 6 divs per scroll (208px + 30px gap)

//     if (direction === "right") {
//       setScrollPosition(scrollPosition + scrollAmount);
//       setShowLeftArrow(true); // After scrolling, show the left arrow
//       if (scrollPosition + scrollAmount >= (208 + 30) * 6 * 2) { // Assuming total of 12 divs
//         setShowRightArrow(false); // Disable right arrow after the last set
//       }
//     } else if (direction === "left") {
//       setScrollPosition(scrollPosition - scrollAmount);
//       setShowRightArrow(true); // After scrolling, show the right arrow again
//       if (scrollPosition - scrollAmount <= 0) {
//         setShowLeftArrow(false); // Disable left arrow when at the first set
//       }
//     }
//   };

//   return (
//     <div className="home-carousel-container">
//       <h1 style={{ fontFamily: "helvetica-neue" }}>Popular Services</h1>
//       <div className="carousel-wrapper">
//         {/* Left Arrow Button */}
//         <button
//           className={`arrow-btn left-arrow ${showLeftArrow ? "visible" : ""}`}
//           onClick={() => handleScroll("left")}
//         >
//           &#8592;
//         </button>

//         {/* Carousel Container */}
//         <div
//           className="home-carousel"
//           ref={carouselRef}
//           style={{ transform: `translateX(-${scrollPosition}px)` }}
//         >
//           {/* Popular Divs */}
//           {[
//             {
//               title: "Website Development",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551937/website-development_gig20i.webp",
//               className: "light-green-div",
//             },
//             {
//               title: "Logo Design",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551938/logo-design_xgy1r3.webp",
//               className: "orange-div",
//             },
//             {
//               title: "SEO",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551932/seo_dsq2bi.webp",
//               className: "dark-green-div",
//             },
//             {
//               title: "Architecture & Interior Design",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551927/architecture-design_jrrbas.webp",
//               className: "purple-div",
//             },
//             {
//               title: "Social Media Marketing",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551929/social-media-marketing_iqwnam.webp",
//               className: "green-shrek-div",
//             },
//             {
//               title: "Voice Over",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551933/voice-over_uhjbg2.webp",
//               className: "brown-div",
//             },
//             {
//               title: "UGC Videos",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/UGC_Video_img_zhwx4i.webp",
//               className: "pink-div",
//             },
//             {
//               title: "Software Development",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/software-development_y9qxvb.webp",
//               className: "green-swamp-div",
//             },
//             {
//               title: "Data Science & ML",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551930/data-science_nhnvos.webp",
//               className: "light-brown-div",
//             },
//             {
//               title: "Product Photography",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551931/product-photography_qofjrg.webp",
//               className: "green-shrek-div",
//             },
//             {
//               title: "E-Commerce Marketing",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551934/e-commerce_ozwc08.webp",
//               className: "light-green-div",
//             },
//             {
//               title: "Video Editing",
//               imgUrl:
//                 "https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551935/video-editing_xcfy43.webp",
//               className: "pink-div",
//             },
//           ].map((item, idx) => (
//             <div key={idx} className={`popular-div ${item.className}`}>
//               <h3>{item.title}</h3>
//               <div className="pop-inner-pic">
//                 <AddImg picUrl={item.imgUrl} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Arrow Button */}
//         <button
//           className={`arrow-btn right-arrow ${showRightArrow ? "visible" : ""}`}
//           onClick={() => handleScroll("right")}
//         >
//           &#8594;
//         </button>
//       </div>
//     </div>
//   );
// }



// // import React, { useState, useRef } from "react";
// // import { AddImg } from "../cmps/AddImg.jsx";

// // export function PopularServices() {
// //   const [scrollPosition, setScrollPosition] = useState(0);
// //   const [showRightArrow, setShowRightArrow] = useState(true);  // Initially show the right arrow
// //   const [showLeftArrow, setShowLeftArrow] = useState(false);   // Initially hide the left arrow
// //   const carouselRef = useRef(null);

// //   const handleScroll = (direction) => {
// //     const scrollAmount = (208 + 30) * 6; // 6 divs per scroll (208px + 30px gap)

// //     if (direction === 'right') {
// //       setScrollPosition(scrollPosition + scrollAmount);
// //       setShowLeftArrow(true);   // After scrolling, show the left arrow
// //       if (scrollPosition + scrollAmount >= (208 + 30) * 6 * 2) { // Assuming total of 12 divs
// //         setShowRightArrow(false); // Disable right arrow after the last set
// //       }
// //     } else if (direction === 'left') {
// //       setScrollPosition(scrollPosition - scrollAmount);
// //       setShowRightArrow(true);  // After scrolling, show the right arrow again
// //       if (scrollPosition - scrollAmount <= 0) { 
// //         setShowLeftArrow(false); // Disable left arrow when we are at the first set
// //       }
// //     }
// //   };

// //   return (
// //     <div className="home-carousel-container">
// //       <h1 style={{ fontFamily: 'helvetica-neue' }}>Popular Services</h1>
// //       <div className="carousel-wrapper">
// //         {/* Left Arrow Button */}
// //         <button
// //           className={`arrow-btn left-arrow ${showLeftArrow ? 'visible' : ''}`}
// //           onClick={() => handleScroll('left')}
// //         >
// //           &#8592;
// //         </button>

// //         {/* Carousel Container */}
// //         <div
// //           className="home-carousel"
// //           ref={carouselRef}
// //           style={{ transform: `translateX(-${scrollPosition}px)` }}
// //         >
// //           {/* All popular divs */}
// //           <div className="popular-div light-green-div">
// //             <h3>Website <br />Development</h3>
// //             <div className="pop-inner-pic website-development-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551937/website-development_gig20i.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div orange-div">
// //             <h3>Logo Design</h3>
// //             <div className="pop-inner-pic logo-design-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551938/logo-design_xgy1r3.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div dark-green-div">
// //             <h3>SEO</h3>
// //             <div className="pop-inner-pic seo-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551932/seo_dsq2bi.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div purple-div">
// //             <h3>Architecture &<br />Interior Design</h3>
// //             <div className="pop-inner-pic Archlterctur-Interior-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551927/architecture-design_jrrbas.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div green-shrek-div">
// //             <h3>Social Media <br />Marketing</h3>
// //             <div className="pop-inner-pic social-media-marketing-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551929/social-media-marketing_iqwnam.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div brown-div">
// //             <h3>Voice Over</h3>
// //             <div className="voice-over-img pop-inner-pic">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551933/voice-over_uhjbg2.webp'} />
// //             </div>
// //           </div>
// //           {/* Other 6 divs */}
          
// //           <div className="popular-div pink-div">
// //             <h3>UGC Videos</h3>
// //             <div className="pop-inner-pic ugc-videos-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/UGC_Video_img_zhwx4i.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div green-swamp-div">
// //             <h3>Software <br />Development</h3>
// //             <div className="pop-inner-pic software-development-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/software-development_y9qxvb.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div light-brown-div">
// //             <h3>Data Science & ML</h3>
// //             <div className="pop-inner-pic data-science-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551930/data-science_nhnvos.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div green-shrek-div">
// //             <h3>Product <br />Photography</h3>
// //             <div className="pop-inner-pic photography-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551931/product-photography_qofjrg.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div light-green-div">
// //             <h3>E-Commerce <br />Marketing</h3>
// //             <div className="pop-inner-pic e-commerce-marketing-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551934/e-commerce_ozwc08.webp'} />
// //             </div>
// //           </div>
// //           <div className="popular-div pink-div">
// //             <h3>Video Editing </h3>
// //             <div className="pop-inner-pic video-editing-img">
// //               <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551935/video-editing_xcfy43.webp'} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Arrow Button */}
// //         <button
// //           className={`arrow-btn right-arrow ${showRightArrow ? 'visible' : ''}`}
// //           onClick={() => handleScroll('right')}
// //         >
// //           &#8594;
// //         </button>
// //       </div>

// //     </div>
// //   );
// // }
