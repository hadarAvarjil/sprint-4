
import React from "react";


export function CanAd(){
    return(
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
    )
}