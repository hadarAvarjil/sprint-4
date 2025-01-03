import React from "react";
import { useNavigate } from "react-router-dom";
    
    export function HomePage() {
        const navigate = useNavigate(); 
      
        const handleButtonClick = () => {
          navigate("/gig"); 
        };
        return (
        <section>
            <div>
                <button onClick={handleButtonClick}>graphic</button>
                <button onClick={handleButtonClick}>programming</button>
                <button onClick={handleButtonClick}>marketing</button>
                <button onClick={handleButtonClick}>animation</button>
                <button onClick={handleButtonClick}>translation</button>
                <button onClick={handleButtonClick}>music</button>
                <button onClick={handleButtonClick}>consulting</button>
            </div>
        </section >
    )
}

