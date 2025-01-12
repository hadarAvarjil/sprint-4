import React from "react";


export function VideoDiv(){
    return(
    <div style={{ position: "relative", width: "fit-content", borderRadius:'20px' }}>
    <video
     width="90%"
     controls
     src="https://res.cloudinary.com/dtpewh2wk/video/upload/v1736687788/vid1_oqigku.mp4"
     style={{ display: "block", borderRadius:'20px' }}
   >
      Your browser does not support the video tag.
    </video>

    <div
     style={{
       position: "absolute",
       bottom: "20px",
       left: "35%",
       zIndex: 2,
       background: "rgba(255, 255, 255, 0.37)", // Optional semi-transparent background
       padding: "5px",
       borderRadius: "5px",
       width:'15%',
       height:'15%',
       alignItems: "center", // Centers vertically
       justifyContent: "center",        }}
   >
      <img
       src="https://res.cloudinary.com/dtpewh2wk/image/upload/v1736688661/logo_pwhgid.png"
       alt="My Logo"
       style={{ width: "100%", height:'100%' }}
     />
   </div>
 </div>
    )

}