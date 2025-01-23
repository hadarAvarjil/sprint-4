import React, { useState } from "react";
 import { AddImg } from './AddImg.jsx'

 export function JoinDiv() {
   const [NewUsername, setNewUsername] = useState("");
   const [NewFullname, setNewFullname] = useState("");
   const [NewPassword, setNewPassword] = useState("");
   const [isJoinDivVisible, setIsJoinDivVisible] = useState(true); // State to control visibility
 
   const handleClose = () => {
     setIsJoinDivVisible(false); // Hide both the modal and the overlay
   };
 
   const handleSubmit = () => {
     console.log("NewUsername:", NewUsername);
     console.log("NewFullname:", NewFullname);
     console.log("NewPassword:", NewPassword);
 
     // Save to localStorage if needed
     localStorage.setItem("NewUsername", NewUsername);
     localStorage.setItem("NewFullname", NewFullname);
     localStorage.setItem("NewPassword", NewPassword);
 
     // Clear inputs after submission
     setNewUsername("");
     setNewFullname("");
     setNewPassword("");
     handleClose(); // Optionally close the modal after submit
   };
 
   if (!isJoinDivVisible) return null; // Hide the modal and overlay if not visible
 
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
           <h2>Join Gigster</h2>
           <form
             onSubmit={(e) => {
               e.preventDefault(); // Prevents page reload
               handleSubmit();
             }}
           > 
             <div>
                <section>
                <h4>Create a new account</h4>
                <p>Already have an account? <span>Sign in</span></p>
                </section>

               <label htmlFor="username">Full name</label>
               <input
                 id="username"
                 type="text"
                 value={NewFullname}
                 onChange={(e) => setNewFullname(e.target.value)}
                 required
               />
               <label htmlFor="username">Username</label>
               <input
                 id="username"
                 type="text"
                 value={NewUsername}
                 onChange={(e) => setNewUsername(e.target.value)}
                 required
               />
             </div>
             <div>
               <label htmlFor="password">Password</label>
               <input
                 id="password"
                 type="password"
                 value={NewPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
                 required
               />
             </div>
             <button type="submit">Submit</button>
             {/* <button
               type="button" // Ensure it's not treated as a submit button
               onClick={handleClose}
             >
               Close
             </button> */}
           </form>
           <p>By joining, you agree to the Gigster Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>

         </div>
       </div>
     </>
   );
 }
 