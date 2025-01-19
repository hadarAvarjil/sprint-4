import React from "react";


export function MakeHappenAd(){
    return(
        
   
        <div className="divs-container">
        <h1> Make it all happen with <br className="small-resp-br"/> freelancers</h1>

        <div className="signup-ad icons-divs-container">
          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\squares.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Access a pool of top talent <br/> across 700 categories</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\clock.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Enjoy a simple, easy-to-use<br/> matching experience</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\lightning.jpeg"
              alt=""
              width={"52px"}
            />
            <p>Get quality work done quickly<br/> and within budget</p>
          </div>

          <div className="icons-div">
            <img
              src="src\services\imgs\design.imgs\dollar.jpeg"
              alt=""
              width={"75px"}
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
    )
}