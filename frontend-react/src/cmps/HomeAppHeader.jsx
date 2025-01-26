import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { NavBar } from "./NavBar";
import SvgIcon from "./SvgIcon.jsx";
import { setFilter } from "../store/actions/gig.actions.js";
import { SearchBar } from "./SearchBar.jsx";
import { category } from "../services/gig.service.js";
import { useSelector, useDispatch } from "react-redux";
import { AsideMenu } from "../cmps/AsideMenu.jsx";
import { logout } from "../store/actions/user.actions";
import { LoginSignup } from "./LoginSignup.jsx";
import { UserDropdownMenu } from "./UserDropdownMenu.jsx";
import outsideClick from "../customHooks/outsideClick.js";
import ReactDOM from "react-dom"; // shinoi6

export function HomeAppHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [headerStage, setHeaderStage] = useState(0);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState("");
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();

  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);

  const [isSignup, setIsSignup] = useState(true);
  const [isLoginSignUpShow, setIsLoginSignUpShow] = useState(false);

  const categories = category;

  const userInfoRef = useRef(null);
  const ordersRef = useRef(null);
  const asideMenuRef = useRef(null);
  const dispatch = useDispatch();

  const userRef = useRef(null);
  outsideClick(userRef, () => setShowUserDropdownMenu(false));

  const loggedinUser = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);

  function setCatFilter(category) {
    dispatch(setFilter({ ...filterBy, cat: category }));
  }

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
      const scrollPosition = window.scrollY - 200;

      setShowMiniHeader(scrollPosition > greenDivOffset);

      const categoriesOffset = greenDivOffset + 450;
      setShowCategories(scrollPosition > categoriesOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSignDivVisible, setIsSignDivVisible] = useState(false); // shinoi6: State for Sign modal
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); // shinoi6: State for Join modal

  const handleOpenSignDiv = () => {
    setIsSignDivVisible(true); // shinoi6
  };

  const handleOpenJoinDiv = () => {
    setIsJoinDivVisible(true); // shinoi6
  };

  const handleCloseModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false); // shinoi6
      setIsJoinDivVisible(false); // shinoi6
    }
  };

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    setFilter({ ...filterBy, search: searchQuery });
    navigate(`/gig`);
    setSearchQuery("");
  }

  return (
    <>
      <header className="app-header-home full">
        <nav className="home-nav-bar">
          <div
            className={`dropdown flex ${notification ? "notification" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowAsideMenu(!showAsideMenu);
              setNotification(false);
            }}
            ref={asideMenuRef}
          >
            <SvgIcon iconName={"headerDropdownGray"} />
            {showAsideMenu && (
              <AsideMenu
                loggedInUser={loggedinUser}
                onClose={() => setShowAsideMenu(false)}
              />
            )}
          </div>
          <Link to="/">
            <h1
              style={{
                color: "$fiverr-classic-dark-grey",
                fontSize: "30px",
                lineHeight: "24px",
                fontWeight: "bold",
                fontFamily: "$fiverr-defult-font",
              }}
              className="logo flex row"
            >
              gigster
              <span className="dot-icon flex">
                <SvgIcon iconName={"greenDotIcon"} />
              </span>
            </h1>
          </Link>

          {showMiniHeader && (
            <div className="app-header-home-search-bar">
              <SearchBar
                placeholder="Search for services..."
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
              />
            </div>
          )}

          <div className="header-options">
            <NavLink to="gig">
              <div className="sign-header-btn explore-btn">Explore</div>
            </NavLink>
            {loggedinUser ? (
              <>
                <NavLink to="/orders">
                  <div className="sign-header-btn">Orders</div>
                </NavLink>
                <div className="user-container" ref={userRef}>
                  <div
                    className="user-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdownMenu((prev) => !prev);
                    }}
                  >
                    <img src={loggedinUser.imgUrl} alt="User avatar" />
                  </div>
                  {showUserDropdownMenu && (
                    <UserDropdownMenu
                      loggedInUser={loggedinUser}
                      onClose={() => setShowUserDropdownMenu(false)}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="signIn-btn">
                  <button onClick={handleOpenSignDiv}>Sign In</button> {/* shinoi6 */}
                </div>

                <div className="join-btn">
                  <button onClick={handleOpenJoinDiv}>Join</button> {/* shinoi6 */}
                </div>
              </>
            )}
          </div>
        </nav>
        <div className="header-inner-border"></div>
        {showCategories && (
          <NavBar categories={categories} setCatFilter={setCatFilter} />
        )}
      </header>

      {/* Modal logic */}
      {(isSignDivVisible || isJoinDivVisible) &&
        ReactDOM.createPortal(
          <div
            className="modal-overlay"
            onClick={handleCloseModal} // shinoi6
          >
            <div className="modal-content">
              {isSignDivVisible && (
                <LoginSignup
                  isLoginSignUpShow={isSignDivVisible}
                  setIsLoginSignUpShow={setIsSignDivVisible}
                  isSignup={false} // Login mode
                />
              )}
              {isJoinDivVisible && (
                <LoginSignup
                  isLoginSignUpShow={isJoinDivVisible}
                  setIsLoginSignUpShow={setIsJoinDivVisible}
                  isSignup={true} // Signup mode
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}



// import React, { useState, useEffect, useRef } from "react"
// import { Link, NavLink } from "react-router-dom"
// import { useNavigate } from "react-router"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
// import { NavBar } from "./NavBar"
// import { SignDiv } from "./SignDiv"
// import { JoinDiv } from "./JoinDiv"
// import SvgIcon from "./SvgIcon.jsx"
// import { setFilter } from "../store/actions/gig.actions.js"
// import { SearchBar } from "./SearchBar.jsx"
// import { category } from "../services/gig.service.js"
// import { useSelector, useDispatch } from "react-redux"
// import { AsideMenu } from "../cmps/AsideMenu.jsx"
// import { logout } from "../store/actions/user.actions"
// import { LoginSignup } from "./LoginSignup.jsx"
// import { UserDropdownMenu } from "./UserDropdownMenu.jsx"
// import outsideClick from "../customHooks/outsideClick.js"





// export function HomeAppHeader() {

//   const [searchQuery, setSearchQuery] = useState("")
//   const [headerStage, setHeaderStage] = useState(0)
//   const [showUserDropdown, setShowUserDropdown] = useState(false)
//   const [showOrdersDropdown, setShowOrdersDropdown] = useState(false)
//   const [showAsideMenu, setShowAsideMenu] = useState(false)
//   const [notification, setNotification] = useState(false)
//   const [headerPlaceholderText, setHeaderPlaceholderText] = useState("")
//   const user = useSelector((storeState) => storeState.userModule.user)
//   const navigate = useNavigate()


//   const [showMiniHeader, setShowMiniHeader] = useState(false)
//   const [showCategories, setShowCategories] = useState(false)
//   const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false)

//   const [isSignup, setIsSignup] = useState(true)
//   const [isLoginSignUpShow, setIsLoginSignUpShow] = useState(false)

//   const categories = category

//   const userInfoRef = useRef(null)
//   const ordersRef = useRef(null)
//   const asideMenuRef = useRef(null)
//   const dispatch = useDispatch()

//   const userRef = useRef(null)
//   outsideClick(userRef, () => setShowUserDropdownMenu(false))


//   const loggedinUser = useSelector((storeState) => storeState.userModule.user)
//   const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

//   function setCatFilter(category) {
//     dispatch(setFilter({ ...filterBy, cat: category }));
//   }
//   async function onLogout() {
//     try {
//       await logout()
//       navigate("/")
//       showSuccessMsg(`Bye now`)
//     } catch (err) {
//       showErrorMsg("Cannot logout")
//     }
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       const greenDiv = document.querySelector(".green-search-div")
//       const greenDivOffset = greenDiv?.offsetTop || 0
//       const scrollPosition = window.scrollY - 200

//       setShowMiniHeader(scrollPosition > greenDivOffset)

//       const categoriesOffset = greenDivOffset + 450
//       setShowCategories(scrollPosition > categoriesOffset)
//     }

//     window.addEventListener("scroll", handleScroll)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     };
//   }, [])

//   const [isSignDivVisible, setIsSignDivVisible] = useState(false)
//   const [isJoinDivVisible, setIsJoinDivVisible] = useState(false)

//   const handleOpenSignDiv = () => {
//     setIsSignDivVisible(true)
//   }
//   const handleOpenJoinDiv = () => {
//     setIsJoinDivVisible(true)
//   }

//   const handleCloseSignDiv = (e) => {
//     if (e.target.className === "modal-overlay") {
//       setIsSignDivVisible(false)
//     }
//   }

//   const handleCloseJoinDiv = (e) => {
//     if (e.target.className === "modal-overlay") {
//       setIsJoinDivVisible(false)
//     }
//   }

//   function handleSearchChange(e) {
//     const newSearchQuery = e.target.value
//     setSearchQuery(newSearchQuery)
//   }

//   function handleSearchSubmit(e) {
//     e.preventDefault()
//     if (!searchQuery) return
//     setFilter({ ...filterBy, search: searchQuery })
//     navigate(`/gig`)
//     setSearchQuery("")
//   }

//   const handleJoinClick = () => {
//     setIsSignup(true)
//     setIsLoginSignUpShow(true)
//   }

//   const handleLoginClick = () => {
//     setIsSignup(false)
//     setIsLoginSignUpShow(true)
//   }

//   return (
//     <>
//       <header className="app-header-home full">
//         <nav className="home-nav-bar">
//           <div
//             className={`dropdown flex ${notification ? "notification" : ""}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAsideMenu(!showAsideMenu);
//               setNotification(false);
//             }}
//             ref={asideMenuRef}
//           >
//             <SvgIcon
//               iconName={
//                 "headerDropdownGray"
//               }
//             />
//             {showAsideMenu && (
//               <AsideMenu
//                 loggedInUser={loggedinUser}
//                 onClose={() => setShowAsideMenu(false)}
//               />
//             )}
//           </div>
//           <Link to="/" >
//             <h1 style={{
//               color: "$fiverr-classic-dark-grey",
//               fontSize: "30px",
//               lineHeight: "24px",
//               fontWeight: "bold",
//               fontFamily: "$fiverr-defult-font",
//             }} className="logo flex row">
//               gigster
//               <span className=" dot-icon flex">
//                 <SvgIcon iconName={"greenDotIcon"} />
//               </span>
//             </h1>
//           </Link>
//           {/* shinoi4 */}
//           {/* <NavLink to="/">
//             <h1
//               style={{
//                 color: "$fiverr-classic-dark-grey",
//                 fontSize: "30px",
//                 lineHeight: "24px",
//                 fontWeight: "bold",
//                 fontFamily: "$fiverr-defult-font",
//               }}
//               className="flex row"
//             >
//               gigster
//               <span className="flex">
//                 <SvgIcon iconName={"greenDotIcon"} />
//               </span>
//             </h1>
//           </NavLink> */}

//           {showMiniHeader && (
//             <div className="app-header-home-search-bar">
//               <SearchBar
//                 placeholder="Search for services..."
//                 searchQuery={searchQuery}
//                 onSearchChange={handleSearchChange}
//                 onSearchSubmit={handleSearchSubmit}
//               />
//             </div>
//           )}

//           <div className="header-options">
//             <NavLink to="gig">
//               <div className="sign-header-btn explore-btn">Explore</div>
//             </NavLink>
//             {loggedinUser ? (
//               <>
//                 <NavLink to="/orders">
//                   <div className="sign-header-btn">Orders</div>
//                 </NavLink>
//                 <div className="user-container" ref={userRef}>
//                   <div
//                     className="user-circle"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       setShowUserDropdownMenu((prev) => !prev)
//                     }}
//                   >
//                     <img src={loggedinUser.imgUrl} alt="User avatar" />
//                   </div>
//                   {showUserDropdownMenu && (
//                     <UserDropdownMenu
//                       loggedInUser={loggedinUser}
//                       onClose={() => setShowUserDropdownMenu(false)}
//                     />
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="signIn-btn" >
//                   <button
//                     onClick={handleLoginClick}
//                   >
//                     Sign In
//                   </button>
//                 </div>

//                 <div className="join-btn" >
//                   <button
//                     onClick={handleJoinClick}
//                   >
//                     Join
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* {isSignDivVisible && ( 
//               <div className="modal-overlay" onClick={handleCloseSignDiv}>
//                 <SignDiv />
//               </div>
//             )}
//             {isJoinDivVisible && (
//               <div className="modal-overlay" onClick={handleCloseJoinDiv}>
//                 <JoinDiv />
//               </div>
//             )}

//             <div onClick={handleOpenSignDiv} className="sign-header-btn sign-btn">
//               Sign in
//             </div>

//             <div onClick={handleOpenJoinDiv} className="join-btn">
//               Join
//             </div> */}

//           </div>
//         </nav>
//         {/* shinoi4 */}
//         <div className="header-inner-border"></div>
//         {showCategories && (
//           <NavBar
//             categories={categories}
//             setCatFilter={setCatFilter}
//           />
//         )}
//         {isLoginSignUpShow && <LoginSignup
//           isLoginSignUpShow={isLoginSignUpShow}
//           setIsLoginSignUpShow={setIsLoginSignUpShow}
//           isSignup={isSignup}
//           setIsSignup={setIsSignup}

//         />}
//       </header>
//     </>
//   )
// }
