import React from "react";
import { useNavigate } from "react-router-dom";

    
    export function HomePage() {
        // const myImg='src\services\imgs\design.imgs\ad.jpeg'
        const navigate = useNavigate(); 
      
        const handleNavigation = (destination) => {
            navigate(destination); // Navigate to the specified destination
          };
        return (
        <section>
            <div>
              {/* <div onClick={() => handleNavigation('/gig')}>
                <img src="src\services\imgs\design.imgs\graphics.jpeg" alt="" />
                graphic</div> */}

                <button onClick={() => handleNavigation('/gig')}>graphic</button>
                <button onClick={() => handleNavigation('/gig')}>programming</button>
                <button onClick={() => handleNavigation('/gig')}>marketing</button>
                <button onClick={() => handleNavigation('/gig')}>animation</button>
                <button onClick={() => handleNavigation('/gig')}>translation</button>
                <button onClick={() => handleNavigation('/gig')}>music</button>
                <button onClick={() => handleNavigation('/gig')}>consulting</button>
            </div>
<div style={{ backgroundColor:"#FFF6F2" }}  className="canAd-container"> 

  <div className="canAd-text-container">
   <h1 style={{ color:"#222325", fontWeight:'150' }}><span style={{ fontWeight:'600', fontSize:'35px' }}> gigster</span> logo maker.</h1>
   {/* <h1 style={{ color:"#3F3F40" }}> <span style={{ color:"#222325" }} >gigster</span> logo maker.</h1> */}
   <p style={{ color:"#404145" , fontSize:'35px' }} >Make an incredible <br />
   logo <span style={{ color:"#FC842D" }}>in seconds</span></p>
   <button className="can-blk-btn" onClick={() => handleNavigation('/gig')}> Try Fiverr Logo Maker</button>
</div>

<img src="src\services\imgs\design.imgs\canAd.png" alt="" />
</div>
            
            
            <div className="ad-pro"
    ><img 
    src="src\services\imgs\design.imgs\ad.jpeg"  
    style={{ width: "100%" }}
  />
      <button className="blk-btn" onClick={() => handleNavigation('about')}>Try Now</button>
    </div>

<div className="divs-container">
<h1> Make it all happen with freelancers</h1>

    <div className="signup-ad icons-divs-container"> 
<div className="icons-div">
  <img src="src\services\imgs\design.imgs\squares.jpeg" alt="" width={'52px'} />
  <p>Access a pool of top talent across 700 categories</p>
</div>

<div className="icons-div">
  <img src="src\services\imgs\design.imgs\clock.jpeg" alt="" width={'52px'}/>
  <p>Enjoy a simple, easy-to-use matching experience</p>
</div>

<div className="icons-div">
  <img src="src\services\imgs\design.imgs\lightning.jpeg" alt=""width={'52px'} />
  <p>Get quality work done quickly and within budget</p>
</div>

<div className="icons-div">
  <img src="src\services\imgs\design.imgs\dollar.jpeg" alt=""width={'52px'} />
  <p>Only pay when you’re happy</p>
</div>
</div>

<button onClick={() => handleNavigation('login')} className="blk-join-btn" >join now</button>
</div>



<div style={{backgroundColor:'blue'}} className="try-now-ad"> 
<h1>div try now --- lead to explore</h1>
<button>try now </button>
</div>

    <div className="signup-ad">
    <img 
    src="src\services\imgs\design.imgs\signup.jpeg"  
    style={{ width: "100%" }}
  />
      <button className="white-join-btn" onClick={() => handleNavigation('login')}>Join Gigster</button>
    </div>
        </section >
    )
}

