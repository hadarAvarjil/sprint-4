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

            <div className="cat-divs-container">
        
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\programming.jpeg" alt="" /> Programming & Tech</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\graphics.jpeg" alt="" /> Graphic & Design</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\marketing.jpeg" alt="" /> Digital Marketing</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\translation.jpeg" alt="" />Writing & Translation</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\animation.jpeg" alt="" /> Video &Animation</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\ai.jpeg" alt="" /> AI Services</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\music.jpeg" alt="" /> Music & Audio</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\consulting.jpeg" alt="" /> Consulting</div>
<div className="cat-div" onClick={() => handleNavigation('/gig')}> <img style={{width:'29px'}} src="src\services\imgs\design.imgs\buisness.jpeg" alt="" /> Business</div>

            </div>

<div style={{ backgroundColor:"#FFF6F2" }}  className="canAd-container"> 

  <div className="canAd-text-container">
   <h1 style={{ color:"#222325", fontWeight:'150' }}><span style={{ fontWeight:'600', fontSize:'35px' }}> gigster</span> logo maker.</h1>
   <p style={{ color:"#404145", maxWidth:'1336px' }} >Make an incredible <br />
   logo <span style={{ color:"#FC842D" }}>in seconds</span></p>
   <button className="can-blk-btn" onClick={() => handleNavigation('/gig')}> Try Fiverr Logo Maker</button>
</div>

<img className="canAd-pic" src="src\services\imgs\design.imgs\canAd.png" alt="" />
</div>

         {/* <div style={{backgroundColor:'#4d1727', fontFamily:
'Macan, "Helvetica Neue", Helvetica, Arial, sans-serif', fontSize:'16px', lineHeight:'26px'}}>fiverr Make it all happen with freelancers</div>   
             */}
            {/* <div className="ad-pro"
    ><img 
    src="src\services\imgs\design.imgs\ad.jpeg"  
    style={{ width: "100%" }}
  />
      <button className="blk-btn" onClick={() => handleNavigation('about')}>Try Now</button>
    </div> */}

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



{/* <div style={{backgroundColor:'blue'}} className="try-now-ad"> 
<h1>div try now --- lead to explore</h1>
<button>try now </button>
</div> */}

    <div className="purple-signup-ad">
   <h1> Freelance services at your <span>fingertips</span> </h1>

    {/* <img 
    src="src\services\imgs\design.imgs\signup.jpeg"  
    style={{ width: "100%" }}
  /> */}
      <button style={{width:'115px', height:'41px'}} className="white-join-btn" onClick={() => handleNavigation('login')}>Join Gigster</button>
    </div>
        </section >
    )
}

