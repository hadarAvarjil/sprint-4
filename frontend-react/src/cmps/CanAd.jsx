
import React from "react";


export function CanAd(){
    return(
        <div style={{ backgroundColor: "#FFF6F2" }} className="canAd-container">
        <div className="canAd-text-container">
         <h1 >
            <span style={{fontWeight: '800'}}>
            gigster
            </span>
             logo maker.
         </h1>
         <p >
           Make an incredible <br />
           logo <span>in seconds</span>
         </p>
          <button
           className="can-blk-btn"
           onClick={() => handleNavigation("/gig")}
         >
           
           Try Gigster Logo Maker
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