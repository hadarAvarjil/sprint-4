import React from "react";
import { AddImg } from "../cmps/AddImg.jsx";

export function GreenDiv(){

  
 
    return(
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
          <input type="search" class="long-placeholder"  placeholder="Search for any service..." value="" readOnly></input>
          <div className="search-btn">
          <div className="big-search-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736546208/big-search_e0nw3p.svg'}/></div>
          </div>
          </div>
          </div>
          
          </div>
        </section>)
}