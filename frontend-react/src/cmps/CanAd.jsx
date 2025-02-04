import React from "react";
import { setFilter } from "../store/actions/gig.actions.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AddImg } from "./AddImg.jsx";


export function CanAd(){ 
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
      const dispatch = useDispatch();
      const navigate = useNavigate();
      
      function setCatFilter( category) {
      dispatch(setFilter({ ...filterBy, cat: category }))
      navigate('/gig');
      }
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
<h2>Pre-designed by top talent. Just add your touch.</h2>

          <button
           className="can-blk-btn"
           onClick={() => setCatFilter('Graphics & Design')} to={`/gig`}         >
           
           Try Gigster Logo Maker
         </button>
       </div>
<div className="canAd-pic">
  <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738686848/canAd_ob7kl4.png' />
</div>
       {/* <img
         className="canAd-pic"
         src="src\services\imgs\design.imgs\canAd.png"
         alt=""
       /> */}
     </div>
    )
}