import React, { useState } from "react";
 import { AddImg } from './AddImg.jsx'

 export function SignDiv() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isSignDivVisible, setIsSignDivVisible] = useState(true); // State to control visibility
 
   const handleClose = () => {
     setIsSignDivVisible(false); // Hide both the modal and the overlay
   };
 
   const handleSubmit = () => {
     console.log("Username:", username);
     console.log("Password:", password);
 
     // Save to localStorage if needed
     localStorage.setItem("username", username);
     localStorage.setItem("password", password);
 
     // Clear inputs after submission
     setUsername("");
     setPassword("");
     handleClose(); // Optionally close the modal after submit
   };
 
   if (!isSignDivVisible) return null; // Hide the modal and overlay if not visible
 
   return (
     <>
       {/* Overlay */}
       <div
         className="overlay"
         onClick={handleClose} // Close the modal if the overlay is clicked
       ></div>
 
       {/* Modal */}
       <div className="sign-div">
         <div className="left-purple-ad">

         <div className="left-purple-ad-text">
            <div className="content">  
            <h2>Success starts here</h2>
            <ul className="flex ">
                <li>
                ✓  Over 700 categories
                </li>

                <li>
                ✓  Quality work done faster
                </li>

                <li>
                ✓  Access to talent and businesses<br/> across the globe
                </li>
            </ul>
         </div>
        <AddImg  picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736802265/standard.0638957_sespel.png'}/>
         </div>
         </div>

         <div className="right-user-sign">
           <h2>Sign in to your account</h2>
           <form
             onSubmit={(e) => {
               e.preventDefault(); // Prevents page reload
               handleSubmit();
             }}
           >
             <div>

               <label htmlFor="username">Username:</label>
               <input
                 id="username"
                 type="text"
                 style={{width:'100%', borderColor:'black'}}
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 required
               />
             </div>

             <div>
               <label htmlFor="password">Password:</label>
               <input
                 id="password"
                 type="password"
                 style={{width:'100%', borderColor:'black'}}

                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>
             <button type="submit">Submit</button>
             <button
               type="button" // Ensure it's not treated as a submit button
               onClick={handleClose}
             >
               Close
             </button>
           </form>
           <p>By joining, you agree to the Gigster Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>
         </div>
       </div>
     </>
   );
 }
 