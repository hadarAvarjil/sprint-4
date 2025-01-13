import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";
import { NavBar } from "./NavBar";
import { SignDiv } from "./SignDiv";
import { JoinDiv } from "./JoinDiv";

export function HomeAppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();
  const [showMiniHeader, setShowMiniHeader] = useState(false);

  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const greenDiv = document.querySelector(".green-search-div");
      const greenDivOffset = greenDiv?.offsetTop || 0;
      const scrollPosition = window.scrollY-300;

      // Toggle the mini-header based on scroll position
      setShowMiniHeader(scrollPosition > greenDivOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSignDivVisible, setIsSignDivVisible] = useState(false);
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false);

  const handleOpenSignDiv = () => {
    setIsSignDivVisible(true);
  };
  const handleOpenJoinDiv = () => {
    setIsJoinDivVisible(true);
  };

  const handleCloseSignDiv = (e) => {
    // Close the modal only if clicking outside the sign-div
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false);
    }
  };
  const handleCloseJoinDiv = (e) => {
    // Close the modal only if clicking outside the sign-div
    if (e.target.className === "modal-overlay") {
      setIsJoinDivVisible(false);
    }
  };

  return (
    <>
      <header className="app-header-home full">
        <nav className="home-nav-bar">
          <NavLink to="/">
            <img
              className="logo"
              src="src/services/imgs/design.imgs/logo.png"
              alt="Navigate to Target Page"
              style={{ width: "90px", height: "70px" }}
            />
          </NavLink>
          <div className="header-options">
            <NavLink to="/become-seller">
              <div className="sign-header-btn">Become a Seller</div>
            </NavLink>
            <NavLink to="gig">
              <div className="sign-header-btn">Explore</div>
            </NavLink>
            
            {isSignDivVisible && (
        <div className="modal-overlay" onClick={handleCloseSignDiv}>
          <SignDiv/>
         
        </div>
            )}
            {isJoinDivVisible && (
        <div className="modal-overlay" onClick={handleCloseJoinDiv}>
          <JoinDiv/>
         
        </div>
            )}
         <div onClick={handleOpenSignDiv} className="sign-header-btn">Sign in</div>

              <div onClick={handleOpenJoinDiv} className="join-btn">Join</div>

            {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </div>
          {user && (
            <div className="user-info">
              <Link to={`user/${user._id}`}>
                {user.fullname}
              </Link>
              <button onClick={onLogout}>logout</button>
            </div>
          )}
        </nav>
        {showMiniHeader && (
          <NavBar 
            categories={["Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation", "Writing & Translation", "Music & Audio", "Business"]}
            // display="flex"
          />
        )}
      </header>
    </>
  );
}




// import { Link, NavLink } from "react-router-dom";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
// import { logout } from "../store/actions/user.actions";

// export function HomeAppHeader() {
//   const user = useSelector((storeState) => storeState.userModule.user);
//   const navigate = useNavigate();

//   async function onLogout() {
//     try {
//       await logout();
//       navigate("/");
//       showSuccessMsg(`Bye now`);
//     } catch (err) {
//       showErrorMsg("Cannot logout");
//     }
//   }

//   return (
//     <header className="app-header-home full">
//       <nav className="home-nav-bar">
//         <NavLink to="/">
//           <img
//             className="logo"
//             src="src\services\imgs\design.imgs\logo.png"
//             alt="Navigate to Target Page"
//             style={{ width: "90px", height: "70px" }}
//           />
//         </NavLink>
//         <div className="header-options">
//           {/* <NavLink to="about">About</NavLink> */}
//           <NavLink to="/become-seller">
//             <div className="sign-header-btn">Become a Seller</div>
//           </NavLink>
//           <NavLink to="gig">
//             <div className="sign-header-btn">Explore</div>
//           </NavLink>
//           <NavLink to="gig">
//             <div className="sign-header-btn">Sign in</div>
//           </NavLink>
//           <NavLink to="gig">
//             <div className="join-btn">Join</div>
//           </NavLink>
//           {/* <NavLink to="chat">Chat</NavLink> */}
//           {/* <NavLink to="review">Review</NavLink> */}

//           {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

//           {/* {!user && <NavLink to="login" className="login-link">Login</NavLink>} */}
//         </div>
//         {user && (
//           <div className="user-info">
//             <Link to={`user/${user._id}`}>
//               {/* {user.imgUrl && <img src={user.imgUrl} />} */}
//               {user.fullname}
//             </Link>
//             {/* <span className="score">{user.score?.toLocaleString()}</span> */}
//             <button onClick={onLogout}>logout</button>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }
