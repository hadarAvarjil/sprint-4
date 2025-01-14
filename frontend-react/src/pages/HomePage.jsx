import React from "react";
import { useNavigate } from "react-router-dom";
import { AddImg } from "../cmps/AddImg.jsx";


export function HomePage() {
  // const myImg='src\services\imgs\design.imgs\ad.jpeg'
  const navigate = useNavigate();

  const handleNavigation = (destination) => {
    navigate(destination); // Navigate to the specified destination
  };
  return (
    <section>



      <div className="green-search-div">
        <div className="pinkGuy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736532566/pinkGuy_olm97w.png'} /></div>
        <div className="yellowGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540342/yellowGirl-img_ibw5hf.png'} /></div>
        <div className="purpleGuy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540770/purpleGuy-img_xhgyeo.png'} /></div>
        <div className="greenGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736539911/greenGirl_dusi9w.png'} /></div>
        <div className="blurredGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736543803/blurred_v7mnmx.png'} /></div>
        <div className="trustedBy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736548563/trustedBy-img_q3gqes.png'} /></div>
        <div className="green-search-div-inner-box"><h1>Scale your professional <br /> workforce with <span>freelancers</span></h1>

          <div className="search-bar-div">
            <input type="search" class="long-placeholder" placeholder="Search for any service..." value=""></input>
            <div className="search-btn">
              <div className="big-search-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736546208/big-search_e0nw3p.svg'} /></div>
            </div>
          </div>
        </div>
      </div>

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


      <div class="home-carousel-container">
        <h1 style={{ fontFamily: 'macan-regular' }}> Popular Services</h1>

        <div class="home-carousel">
          <div class="popular-div light-green-div"><h3>Website <br />Development</h3><div className="pop-inner-pic website-development-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551937/website-development_gig20i.webp'} /></div></div>
          <div class="popular-div orange-div"><h3>Logo Design</h3> <div className="pop-inner-pic logo-design-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551938/logo-design_xgy1r3.webp'} /></div></div>
          <div class="popular-div dark-green-div"><h3>SEO</h3> <div className="pop-inner-pic seo-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551932/seo_dsq2bi.webp'} /></div></div>
          <div class="popular-div purple-div"><h3>Archlterctur &<br /> Interior Design</h3> <div className="pop-inner-pic Archlterctur-Interior-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551927/architecture-design_jrrbas.webp'} /></div></div>
          <div class="popular-div green-shrek-div"><h3>Social Media <br /> Marketing</h3> <div className="pop-inner-pic social-media-marketing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551929/social-media-marketing_iqwnam.webp'} /></div></div>
          <div class="popular-div brown-div"><h3>Voice Over</h3> <div className="voice-over-img pop-inner-pic"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551933/voice-over_uhjbg2.webp'} /></div></div>
          {/* <div class="Popular-div pink-div"><h3>UGC Videos</h3> <div className="pop-inner-pic ugc-videos-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/UGC_Video_img_zhwx4i.webp'}/></div></div>
    <div class="Popular-div green-swamp-div"><h3>Software <br/> Development</h3> <div className="pop-inner-pic software-development-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/software-development_y9qxvb.webp'}/></div></div>
    <div class="Popular-div light-brown-div"><h3>Data Science & ML</h3> <div className="pop-inner-pic data-science-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551930/data-science_nhnvos.webp'}/></div></div>
    <div class="Popular-div green-shrek-div"><h3>Product <br/> Photography</h3> <div className="pop-inner-pic photography-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551931/product-photography_qofjrg.webp'}/></div></div>
    <div class="Popular-div light-green-div"><h3>E-Commerce <br/> Marketing </h3><div className="pop-inner-pic e-commerce-marketing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551934/e-commerce_ozwc08.webp'}/></div></div>
    <div class="Popular-div pink-div"><h3>Video Editing </h3><div className="pop-inner-pic video-editing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551935/video-editing_xcfy43.webp'}/></div></div> */}
        </div>
      </div>



      <div style={{ position: "relative", width: "fit-content", borderRadius: '20px' }}>
        <video
          width="90%"
          controls
          src="https://res.cloudinary.com/dtpewh2wk/video/upload/v1736687788/vid1_oqigku.mp4"
          style={{ display: "block", borderRadius: '20px' }}
        >
          Your browser does not support the video tag.
        </video>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "35%",
            zIndex: 2,
            background: "rgba(255, 255, 255, 0.37)", // Optional semi-transparent background
            padding: "5px",
            borderRadius: "5px",
            width: '15%',
            height: '15%',
            alignItems: "center", // Centers vertically
            justifyContent: "center",
          }}
        >
          <img
            src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736688661/logo_pwhgid.png"
            alt="My Logo"
            style={{ width: "100%", height: '100%' }}
          />
        </div>
      </div>




      <div style={{ backgroundColor: "#FFF6F2" }} className="canAd-container">
        <div className="canAd-text-container">
          <h1 style={{ color: "#222325", fontWeight: "150" }}>
            <span style={{ fontWeight: "600" }}>
              gigster
            </span>
            logo maker.
          </h1>
          <p style={{ color: "#404145", maxWidth: "1336px" }}>
            Make an incredible <br />
            logo <span style={{ color: "#FC842D" }}>in seconds</span>
          </p>
          <button
            className="can-blk-btn"
            onClick={() => handleNavigation("/gig")}
          >

            Try Fiverr Logo Maker
          </button>
        </div>

        <img
          className="canAd-pic"
          src="src\services\imgs\design.imgs\canAd.png"
          alt=""
        />
      </div>


      <div className="divs-container">
        <h1> Make it all happen with freelancers</h1>

        <div className="signup-ad icons-divs-container">
          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\squares.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Access a pool of top talent across 700 categories</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\clock.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Enjoy a simple, easy-to-use matching experience</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\lightning.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Get quality work done quickly and within budget</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\dollar.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Only pay when you’re happy</p>
          </div>
        </div>

        <button
          onClick={() => handleNavigation("login")}
          className="blk-join-btn"
        >
          join now
        </button>
      </div>



      <div className="purple-signup-ad">
        <h1>

          Freelance services at your <span>fingertips</span>
        </h1>

        <button
          style={{ width: "115px", height: "41px" }}
          className="white-join-btn"
          onClick={() => handleNavigation("login")}
        >
          Join Gigster
        </button>
      </div>
    </section>
  );
}
