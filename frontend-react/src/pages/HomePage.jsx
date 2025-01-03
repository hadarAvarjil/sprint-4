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
                <button onClick={() => handleNavigation('/gig')}>graphic</button>
                <button onClick={() => handleNavigation('/gig')}>programming</button>
                <button onClick={() => handleNavigation('/gigv')}>marketing</button>
                <button onClick={() => handleNavigation('/gig')}>animation</button>
                <button onClick={() => handleNavigation('/gig')}>translation</button>
                <button onClick={() => handleNavigation('/gig')}>music</button>
                <button onClick={() => handleNavigation('/gig')}>consulting</button>
            </div>
            <div className="ad-pro"
    ><img 
    src="src\services\imgs\design.imgs\ad.jpeg"  
    style={{ width: "100%" }} 
  />
      <button className="ad-btn" onClick={() => handleNavigation('about')}>Try Now</button>
    </div>
        </section >
    )
}

