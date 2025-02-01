import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDeviceType } from "../customHooks/DeviceTypeContext.jsx";
import outsideClick from "../customHooks/outsideClick.js";
import { loadGigs } from "../store/actions/gig.actions.js";
import { SearchBar } from "./SearchBar.jsx";
import { NavBar } from "./NavBar.jsx";
import { AsideMenu } from "../cmps/AsideMenu.jsx";
import SvgIcon from "./SvgIcon.jsx";
import { category } from "../services/gig.service.js";
import { setFilter } from "../store/actions/gig.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";
import { LoginSignup } from "./LoginSignup.jsx";
import { UserDropdownMenu } from "./UserDropdownMenu.jsx";
import ReactDOM from "react-dom"; // shinoi6

import { UserOrdersDropdownMenu } from "./UserOrdersDropdownMenu.jsx";

<cmp></cmp>

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [headerStage, setHeaderStage] = useState(0);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const [showUserOrdersDropdownMenu,  setShowUserOrdersDropdownMenu] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState("");
  const [isSignDivVisible, setIsSignDivVisible] = useState(false); // shinoi6
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); // shinoi6
  const [isHovered, setIsHovered] = useState(false);

  const navBarStyles = {
    borderBottom: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
    borderTop: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
    // display: isDashboardSellerPage || isDashboardBuyerPage ? "none" : "",
  };

  const userRef = useRef(null);
  outsideClick(userRef, () => setShowUserDropdownMenu(false));

  const ordersRef = useRef(null);
  outsideClick(ordersRef, () => setShowOrdersDropdown(false));

  const asideMenuRef = useRef(null);
  outsideClick(asideMenuRef, () => setShowAsideMenu(false));

  const dispatch = useDispatch();

  const loggedinUser = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);
  const deviceType = useDeviceType();

  // console.log(loggedinUser, 'userrrrrr');
  

  const categories = category;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  // const isDashboardSellerPage = location.pathname === "/dashboard"

  const handleJoinClick = () => {
    setIsJoinDivVisible(true); // shinoi6
  };

  const handleLoginClick = () => {
    setIsSignDivVisible(true); // shinoi6
  };

  const handleCloseModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false); // shinoi6
      setIsJoinDivVisible(false); // shinoi6
    }
  }; // shinoi6

  const logoColor = headerStage === 0 ? "#fff" : "$fiverr-classic-dark-grey";
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? "#fff" : "transparent",
    color: isHomePage && headerStage === 0 ? "#fff" : "#62646a",
  };

  useEffect(() => {
    if (!isHomePage) {
      setHeaderStage(2);
      setHeaderPlaceholderText("What service are you looking for today?");
    } else {
      setHeaderStage(0);
      setHeaderPlaceholderText("What service are you looking for today?");
    }
  }, [deviceType, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      if (deviceType !== "mini-tablet" && deviceType !== "mobile") {
        const newStage = window.scrollY < 50 ? 0 : window.scrollY < 150 ? 1 : 2;
        setHeaderStage(newStage);
      }
    };
    if (isHomePage && deviceType !== "mini-tablet" && deviceType !== "mobile") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage, deviceType]);

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;

    const newFilterBy = { ...filterBy, txt: searchQuery };
    console.log("Setting filter with:", newFilterBy);
    dispatch(setFilter(newFilterBy));

    try {
      await loadGigs(newFilterBy);
      navigate(`/gig`);
      setSearchQuery("");
    } catch (err) {
      console.error("Failed to load filtered gigs:", err);
    }
  }

  function setCatFilter(category) {
    dispatch(setFilter({ ...filterBy, cat: category }));
  }

  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg("Bye now");
    } catch (err) {
      console.error("Logout error:", err);
      showErrorMsg("Cannot logout. Please try again.");
    }
  }

  return (
    <header
      className={`app-header flex column full main-container ${
        isHomePage ? "home-page" : ""
      }`}
    >
      <nav className="main-nav">
        <div className="main-nav-header container flex row">
          <div
            className={`dropdown flex ${notification ? "notification" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowAsideMenu(!showAsideMenu);
              setNotification(false);
            }}
            ref={asideMenuRef}
          >
            <SvgIcon
              iconName={
                headerStage === 0 ? "headerDropdownWhite" : "headerDropdownGray"
              }
            />
            {showAsideMenu && (
              <AsideMenu
                loggedInUser={loggedinUser}
                onClose={() => setShowAsideMenu(false)}
              />
            )}
          </div>
          <div className="logo-search-bar-container flex row">
            <Link to="/" style={{ color: headerStyles.color }}>
              <h1 style={{ color: "#404145" }} className="logo flex row">
                {/* <h1 style={{ color: logoColor }} className="logo flex row"> */}
                gigster
                <span className=" dot-icon flex">
                  <SvgIcon iconName={"greenDotIcon"} />
                </span>
              </h1>
            </Link>
            <SearchBar
              placeholder={headerPlaceholderText}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              visibility={headerStage >= 1 ? "visible" : "hidden"}
            />
          </div>
          <div className="header-options">
            <NavLink to="gig">
              <div className="sign-header-btn">Explore</div>
            </NavLink>
            {loggedinUser ? (
              <>
                <div className="orders-container" ref={ordersRef}>
                  {/* <NavLink to="/orders"> */}
                    <div className="sign-header-btn"  onClick={(e) => {
                      e.stopPropagation();
                      setShowUserOrdersDropdownMenu((prev) => !prev);
                    }}      
              >Orders</div>
                  {/* </NavLink> */}

                  {showUserOrdersDropdownMenu && (
                    <UserOrdersDropdownMenu
                    topOffset={'calc(6% + 20px'}
                      loggedInUser={loggedinUser}
                      onClose={() => setShowUserDropdownMenu(false)}
                    />
                  )}
                </div>

                <div className="user-container" ref={userRef}>
                  <div
                    className="user-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdownMenu((prev) => !prev);
                    }}
                  >
                    <img src={loggedinUser.avatar} alt="User avatar" />
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
                  <button onClick={handleLoginClick}>Sign In</button>{" "}
                  {/* shinoi6 */}
                </div>
                <div className="join-btn">
                  <button onClick={handleJoinClick}>Join</button>{" "}
                  {/* shinoi6 */}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Modal logic */} {/* shinoi6 */}
      {(isSignDivVisible || isJoinDivVisible) &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={handleCloseModal}>
            {/* shinoi6 */}
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
      <NavBar
        categories={categories}
        display={headerStage === 2 ? "flex" : "none"}
        headerStage={headerStage}
        setCatFilter={setCatFilter}
        style={navBarStyles}
      />
    </header>
  );
}

// import { useEffect, useState, useRef } from "react"
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { useDeviceType } from "../customHooks/DeviceTypeContext.jsx"
// import outsideClick from "../customHooks/outsideClick.js"
// import { loadGigs } from "../store/actions/gig.actions.js"
// import { SearchBar } from "./SearchBar.jsx"
// import { NavBar } from "./NavBar.jsx"
// import { AsideMenu } from "../cmps/AsideMenu.jsx"
// import SvgIcon from "./SvgIcon.jsx"
// import { category } from "../services/gig.service.js"
// import { setFilter } from "../store/actions/gig.actions.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
// import { logout } from "../store/actions/user.actions"
// import { LoginSignup } from "./LoginSignup.jsx"
// import { UserDropdownMenu } from "./UserDropdownMenu.jsx"

// export function AppHeader() {

//   const [searchQuery, setSearchQuery] = useState("")
//   const [headerStage, setHeaderStage] = useState(0)
//   const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false)
//   const [showOrdersDropdown, setShowOrdersDropdown] = useState(false)
//   const [showAsideMenu, setShowAsideMenu] = useState(false)
//   const [notification, setNotification] = useState(false)
//   const [headerPlaceholderText, setHeaderPlaceholderText] = useState("")

//   const userRef = useRef(null)
//   outsideClick(userRef, () => setShowUserDropdownMenu(false))

//   const ordersRef = useRef(null)
//   outsideClick(ordersRef, () => setShowOrdersDropdown(false))

//   const asideMenuRef = useRef(null)
//   outsideClick(asideMenuRef, () => setShowAsideMenu(false))

//   const dispatch = useDispatch()

//   const loggedinUser = useSelector((storeState) => storeState.userModule.user)
//   const [isSignup, setIsSignup] = useState(true)
//   const [isLoginSignUpShow, setIsLoginSignUpShow] = useState(false)

//   const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

//   const deviceType = useDeviceType()

//   const categories = category
//   const location = useLocation()
//   const isHomePage = location.pathname === "/"
//   const isDashboardSellerPage = location.pathname === "/dashboard"
//   const isDashboardBuyerPage = location.pathname === "/orders"
//   const isGigPage = location.pathname.startsWith("/gig/")
//   const isChatPage = location.pathname.startsWith("/chat/")
//   const navigate = useNavigate()

//   const handleJoinClick = () => {
//     setIsSignup(true)
//     setIsLoginSignUpShow(true)
//   }

//   const handleLoginClick = () => {
//     setIsSignup(false)
//     setIsLoginSignUpShow(true)
//   }

//   const logoColor = headerStage === 0 ? "#fff" : "$fiverr-classic-dark-grey"
//   const headerStyles = {
//     backgroundColor: headerStage >= 1 ? "#fff" : "transparent",
//     color: isHomePage && headerStage === 0 ? "#fff" : "#62646a",
//   }
//   const navBarStyles = {
//     borderBottom: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
//     borderTop: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
//     display: isDashboardSellerPage || isDashboardBuyerPage ? "none" : "",
//   }
//   const joinButtonStyles = {
//     color: headerStage === 0 && isHomePage ? "#fff" : "#1dbf73",
//     borderColor: headerStage === 0 && isHomePage ? "#fff" : "#1dbf73",
//   }

//   useEffect(() => {
//     if (!isHomePage) {
//       setHeaderStage(2);
//       setHeaderPlaceholderText("What service are you looking for today?");
//     } else {
//       setHeaderStage(0);
//       setHeaderPlaceholderText("What service are you looking for today?");
//     }
//   }, [deviceType, isHomePage]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (deviceType !== "mini-tablet" && deviceType !== "mobile") {
//         const newStage = window.scrollY < 50 ? 0 : window.scrollY < 150 ? 1 : 2;
//         setHeaderStage(newStage);
//       }
//     };
//     if (isHomePage && deviceType !== "mini-tablet" && deviceType !== "mobile") {
//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//     }
//   }, [isHomePage, deviceType]);

//   function handleSearchChange(e) {
//     const newSearchQuery = e.target.value
//     setSearchQuery(newSearchQuery)
//   }

//   async function handleSearchSubmit(e) {
//     e.preventDefault()
//     if (!searchQuery) return

//     const newFilterBy = { ...filterBy, txt: searchQuery }
//     console.log("Setting filter with:", newFilterBy)
//     dispatch(setFilter(newFilterBy))

//     try {
//       await loadGigs(newFilterBy)
//       navigate(`/gig`)
//       setSearchQuery("")
//     } catch (err) {
//       console.error("Failed to load filtered gigs:", err)
//     }
//   }

//   function setCatFilter(category) {
//     dispatch(setFilter({ ...filterBy, cat: category }));
//   }

//   async function onLogout() {
//     try {
//       await logout()
//       navigate("/")
//       showSuccessMsg("Bye now")
//     } catch (err) {
//       console.error("Logout error:", err)
//       showErrorMsg("Cannot logout. Please try again.")
//     }
//   }
//   if (
//     (isGigPage && deviceType === "mobile") ||
//     (isChatPage && (deviceType === "mobile" || deviceType === "mini-tablet"))
//   ) {
//     return null
//   }

//   return (
//     <header
//       className={`app-header flex column full main-container ${isHomePage ? "home-page" : ""}`}
//     // style={headerStyles}
//     >
//       <nav className="main-nav">
//         <div className="main-nav-header container flex row">
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
//                 headerStage === 0 ? "headerDropdownWhite" : "headerDropdownGray"
//               }
//             />
//             {showAsideMenu && (
//               <AsideMenu
//                 loggedInUser={loggedinUser}
//                 onClose={() => setShowAsideMenu(false)}
//               />
//             )}
//           </div>
//           <div className="logo-search-bar-container flex row">
//             <Link to="/" style={{ color: headerStyles.color }}>
//               <h1 style={{ color: logoColor }} className="logo flex row">
//                 gigster
//                 <span className=" dot-icon flex">
//                   <SvgIcon iconName={"greenDotIcon"} />
//                 </span>
//               </h1>
//             </Link>
//             <SearchBar
//               placeholder={headerPlaceholderText}
//               searchQuery={searchQuery}
//               onSearchChange={handleSearchChange}
//               onSearchSubmit={handleSearchSubmit}
//               visibility={headerStage >= 1 ? "visible" : "hidden"}
//             />
//           </div>
//           <div className="header-options">
//             {/* <NavLink to="/become-seller">
//               <div className="sign-header-btn">Become a Seller</div>
//             </NavLink> */}
//             {/* <NavLink to="/orders">
//               <div className="sign-header-btn">Orders</div>
//             </NavLink> */}
//             {/* <NavLink to="/profile">
//               <div className="sign-header-btn">my-profile</div>
//             </NavLink> */}
//             <NavLink to="gig">
//               <div className="sign-header-btn">Explore</div>
//             </NavLink>

//             {/* <div className="orders-prereview">
//               <button className="btn-orders-prereview"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setOpenOrdersDropdown(!showOrdersDropdown)
//                 }}
//                 ref={ordersRef}
//               >
//                 Orders
//               </button>
//               {showOrdersDropdown && (
//                 <BuyerOrdersDropdown
//                   onClose={() => setOpenOrdersDropdown(false)}
//                 />
//               )}

//             </div> */}
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
//           </div>
//         </div>
//       </nav>

//       <NavBar
//         categories={categories}
//         display={headerStage === 2 ? "flex" : "none"}
//         headerStage={headerStage}
//         setCatFilter={setCatFilter}
//         style={navBarStyles}
//       />
//       {isLoginSignUpShow && <LoginSignup
//         isLoginSignUpShow={isLoginSignUpShow}
//         setIsLoginSignUpShow={setIsLoginSignUpShow}
//         isSignup={isSignup}
//         setIsSignup={setIsSignup}

//       />}
//     </header>
//   )
// }
