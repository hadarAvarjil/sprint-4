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
import ReactDOM from "react-dom"; 
import { AddImg } from "./AddImg.jsx";

import { UserOrdersDropdownMenu } from "./UserOrdersDropdownMenu.jsx";

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [headerStage, setHeaderStage] = useState(0);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const [showUserOrdersDropdownMenu, setShowUserOrdersDropdownMenu] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState("");
  const [isSignDivVisible, setIsSignDivVisible] = useState(false); 
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);


  const navBarStyles = {
    borderBottom: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
    borderTop: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
  };

  const userRef = useRef(null)
  outsideClick(userRef, () => setShowUserDropdownMenu(false))

  const ordersRef = useRef(null)
  outsideClick(ordersRef, () => setShowUserOrdersDropdownMenu(false));

  const asideMenuRef = useRef(null);
  outsideClick(asideMenuRef, () => setShowAsideMenu(false));

  const dispatch = useDispatch();

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const [isSignup, setIsSignup] = useState(true)
  const [isLoginSignUpShow, setIsLoginSignUpShow] = useState(false)

  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

  const deviceType = useDeviceType()

  const categories = category;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsSignup(false);
    setIsSignDivVisible(true);
    setIsJoinDivVisible(false);
  };
  
  const handleJoinClick = () => {
    setIsSignup(true);
    setIsJoinDivVisible(true);
    setIsSignDivVisible(false);
  };
  

  const handleCloseModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false); 
      setIsJoinDivVisible(false); 
    }
  }; 

  const logoColor = headerStage === 0 ? "#fff" : "$fiverr-classic-dark-grey";
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? "#fff" : "transparent",
    color: isHomePage && headerStage === 0 ? "#fff" : "#62646a",
  }

  useEffect(() => {
    if (!isHomePage) {
      setHeaderStage(2)
      setHeaderPlaceholderText("What service are you looking for today?")
    } else {
      setHeaderStage(0)
      setHeaderPlaceholderText("What service are you looking for today?")
    }
  }, [deviceType, isHomePage])

  useEffect(() => {
    const handleScroll = () => {
      if (deviceType !== "mini-tablet" && deviceType !== "mobile") {
        const newStage = window.scrollY < 50 ? 0 : window.scrollY < 150 ? 1 : 2
        setHeaderStage(newStage);
      }
    }
    if (isHomePage && deviceType !== "mini-tablet" && deviceType !== "mobile") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isHomePage, deviceType])

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;

    const newFilterBy = { ...filterBy, search: searchQuery };
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
      className={`app-header flex column full main-container ${isHomePage ? "home-page" : ""
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
                <NavLink  to="/my-lists" className='liked-heart'>
                  <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738583678/heart-svgrepo-com_cramwf.svg'/> 
                </NavLink>


                <div className="orders-container" ref={ordersRef}>
                  <div
                    className="sign-header-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserOrdersDropdownMenu((prev) => !prev);
                    }}
                  >
                    Orders
                  </div>

                  {showUserOrdersDropdownMenu && (
                    <UserOrdersDropdownMenu
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
                  <button onClick={handleLoginClick}>Sign In</button>{" "}
                </div>
                <div className="join-btn">
                  <button onClick={handleJoinClick}>Join</button>{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {(isSignDivVisible || isJoinDivVisible) &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              {isSignDivVisible && (
                <LoginSignup
                isLoginSignUpShow={isSignDivVisible || isJoinDivVisible}
                setIsLoginSignUpShow={setIsSignDivVisible}
                isSignup={isSignup}
                setIsSignup={setIsSignup}
  
                />
              )}
              {isJoinDivVisible && ( 
                <LoginSignup
                isLoginSignUpShow={isSignDivVisible || isJoinDivVisible}
                setIsLoginSignUpShow={setIsSignDivVisible}
                isSignup={isSignup}
                setIsSignup={setIsSignup}
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
