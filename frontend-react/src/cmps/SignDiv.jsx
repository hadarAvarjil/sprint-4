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
         <div className="right-user-sign">
           <h2>Sign In</h2>
           <form
             onSubmit={(e) => {
               e.preventDefault(); // Prevents page reload
               handleSubmit();
             }}
           >
             <div>
                <section>
                <h4>Sign in to your account</h4>
                <p>Don't have an account? <span>Join here</span></p>
                </section>

               <label htmlFor="username">Username:</label>
               <input
                 id="username"
                 type="text"
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
         </div>
       </div>
     </>
   );
 }
 







// import React from "react";
// import { AddImg } from './AddImg.jsx'



// export function SignDiv({ onClose }) {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="sign-div" onClick={(e) => e.stopPropagation()}>
//         <div className="left-purple-ad">
//          <AddImg  picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736802265/standard.0638957_sespel.png'}/>

//         </div>

//         <div className="right-user-sign">
//           <h3>Sign In</h3>
//           <form>
//             <label>
//               Username:
//               <input type="text" name="username" />
//             </label>
//             <label>
//               Password:
//               <input type="password" name="password" />
//             </label>
//             <button type="submit">Sign In</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// export function SignDiv(){
//     return(
//         <div className="sign-div">
// <div style={{width:'200px', height:'350px'}} className="left-purple-ad">
// <AddImg  picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736802265/standard.0638957_sespel.png'}/>

// </div>

// <div className="right-user-sign"> user</div>

//         </div>
//     )
// }


// <div className="sign-div">
// <h2>Sign In</h2>
// <p>Welcome to the sign-in form!</p>
// <button onClick={() => setIsSignDivVisible(false)}>Close</button>
// </div>