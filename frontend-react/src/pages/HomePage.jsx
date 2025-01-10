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
      <div className="pinkGuy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736532566/pinkGuy_olm97w.png'}/></div>
      <div className="yellowGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540342/yellowGirl-img_ibw5hf.png'}/></div>
      <div className="purpleGuy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736540770/purpleGuy-img_xhgyeo.png'}/></div>
      <div className="greenGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736539911/greenGirl_dusi9w.png'}/></div>
      <div className="blurredGirl-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736543803/blurred_v7mnmx.png'}/></div>
      <div className="trustedBy-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736548563/trustedBy-img_q3gqes.png'}/></div>
      <div className="green-search-div-inner-box"><h1>Scale your professional <br/> workforce with <span>freelancers</span></h1>
      
      <div className="search-bar-div">
      <input type="search" class="long-placeholder"  placeholder="Search for any service..." value=""></input>
      <div className="search-btn">
      <div className="big-search-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736546208/big-search_e0nw3p.svg'}/></div>
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

  <button class="home-carousel-arrow left">⬅</button>
  <div class="carousel">
    <div class="Popular-div">1</div>
    <div class="Popular-div">2</div>
    <div class="Popular-div">3</div>
    <div class="Popular-div">4</div>
    <div class="Popular-div">5</div>
    <div class="Popular-div">6</div>
    <div class="Popular-div">7</div>
    <div class="Popular-div">8</div>
    <div class="Popular-div">9</div>
    <div class="Popular-div">10</div>
  </div>
  <button class="home-carousel-arrow-right" id="home-carousel-arrow-right">➡</button>
</div>

      <div style={{ backgroundColor: "#FFF6F2" }} className="canAd-container">
        <div className="canAd-text-container">
          <h1 style={{ color: "#222325", fontWeight: "150" }}>
            <span style={{ fontWeight: "600"}}>
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
