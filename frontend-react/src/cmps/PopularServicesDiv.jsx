import React from "react";
import { AddImg } from "../cmps/AddImg.jsx";


export function PopularServices(){
    return( 
    <div className="home-carousel-container">
        <h1 style={{fontFamily:'helvetica-neue'}}> Popular Services</h1>
       
          <div className="home-carousel"> 
            <div className="popular-div light-green-div"><h3>Website <br/>Development</h3><div className="pop-inner-pic website-development-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551937/website-development_gig20i.webp'}/></div></div>
            <div className="popular-div orange-div"><h3>Logo Design</h3> <div className="pop-inner-pic logo-design-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551938/logo-design_xgy1r3.webp'}/></div></div>
            <div className="popular-div dark-green-div"><h3>SEO</h3> <div className="pop-inner-pic seo-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551932/seo_dsq2bi.webp'}/></div></div>
            <div className="popular-div purple-div"><h3>Archlterctur &<br/> Interior Design</h3> <div className="pop-inner-pic Archlterctur-Interior-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551927/architecture-design_jrrbas.webp'}/></div></div>
            <div className="popular-div green-shrek-div"><h3>Social Media <br/> Marketing</h3> <div className="pop-inner-pic social-media-marketing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551929/social-media-marketing_iqwnam.webp'}/></div></div>
            <div className="popular-div brown-div"><h3>Voice Over</h3> <div className="voice-over-img pop-inner-pic"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551933/voice-over_uhjbg2.webp'}/></div></div>
            {/* <div className="Popular-div pink-div"><h3>UGC Videos</h3> <div className="pop-inner-pic ugc-videos-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/UGC_Video_img_zhwx4i.webp'}/></div></div>
            <div className="Popular-div green-swamp-div"><h3>Software <br/> Development</h3> <div className="pop-inner-pic software-development-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551928/software-development_y9qxvb.webp'}/></div></div>
            <div className="Popular-div light-brown-div"><h3>Data Science & ML</h3> <div className="pop-inner-pic data-science-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551930/data-science_nhnvos.webp'}/></div></div>
            <div className="Popular-div green-shrek-div"><h3>Product <br/> Photography</h3> <div className="pop-inner-pic photography-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551931/product-photography_qofjrg.webp'}/></div></div>
            <div className="Popular-div light-green-div"><h3>E-Commerce <br/> Marketing </h3><div className="pop-inner-pic e-commerce-marketing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551934/e-commerce_ozwc08.webp'}/></div></div>
            <div className="Popular-div pink-div"><h3>Video Editing </h3><div className="pop-inner-pic video-editing-img"><AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736551935/video-editing_xcfy43.webp'}/></div></div> */}
          </div>
        </div>
       )
}