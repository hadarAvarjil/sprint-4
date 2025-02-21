import React from "react";


export function VideoDiv(){
    return(
    <div className="vid-container" style={{ position: "relative", width: "fit-content", }}>
     <h1 className="vid-h1">What success on gigster looks like</h1> 
    <video
     width="100%"
     controls
     src="https://res.cloudinary.com/dtpewh2wk/video/upload/v1736687788/vid1_oqigku.mp4"
     style={{ display: "block", borderRadius:'20px', borderStyle:'solid', borderColor:'#4b3239cb',borderWidth:'1px' }}
   >
      Your browser does not support the video tag.
    </video>

    <div className="vid-logo"
     style={{
       position: "absolute",
       bottom: "20px",
       left: "5%",
       zIndex: 2,
       background: "rgba(255, 255, 255, 0.37)", 
       padding: "5px",
       borderRadius: "5px",
       width:'15%',
       height:'12%',
       alignItems: "center", 
       justifyContent: "center",  
      display:'flex',
    textAlign:'center'      }}
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