import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { NavBar } from "../cmps/NavBar.jsx";
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
import { AddImg } from "./AddImg.jsx";
import { loadGigs } from "../store/actions/gig.actions.js";

import { UserOrdersDropdownMenu } from "./UserOrdersDropdownMenu.jsx";


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

  const [showUserOrdersDropdownMenu, setShowUserOrdersDropdownMenu] = useState(false);
  const handleJoinClick = () => {
    setIsJoinDivVisible(true); // shinoi6
  };

  const handleLoginClick = () => {
    setIsSignDivVisible(true); // shinoi6
  };


  const categories = category;

  const userInfoRef = useRef(null);
  const ordersRef = useRef(null);
  const asideMenuRef = useRef(null);
  const dispatch = useDispatch();

  const userRef = useRef(null);
  outsideClick(userRef, () => setShowUserDropdownMenu(false));

  const loggedinUser = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);

  useEffect(() => {
    console.log("Filter changed:", filterBy);
    loadGigs(filterBy);
  }, [filterBy]);

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

  async function handleSearchSubmit(e) {
    e.preventDefault()
    if (!searchQuery) return
    //Important  *****!@!@!@!#!!@!@!@!@#
    //when switch to server and build 
    // switch this { ...filterBy, txt: searchQuery } to this { ...filterBy, search: searchQuery }
    const newFilterBy = { ...filterBy, txt: searchQuery }
    console.error('NEED TO SWITCH FIELD IN NEW FILTERBY TO SEARCH INSTEAD OF TXT',newFilterBy)
    dispatch(setFilter(newFilterBy))

    try {
      await loadGigs(newFilterBy)
      navigate(`/gig`)
      setSearchQuery("")
    } catch (err) {
      console.error("Failed to load filtered gigs:", err)
    }
  }

  function setCatFilter(category) {
    dispatch(setFilter({ ...filterBy, cat: category }))
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
                <NavLink to="/my-lists">
                  <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738583678/heart-svgrepo-com_cramwf.svg' />
                </NavLink>
                <div className="orders-container" ref={ordersRef}>
                  {/* <NavLink to="/orders"> */}
                  <div className="sign-header-btn" onClick={(e) => {
                    e.stopPropagation();
                    setShowUserOrdersDropdownMenu((prev) => !prev);
                  }}
                  >Orders</div>
                  {/* </NavLink> */}

                  {showUserOrdersDropdownMenu && (
                    <UserOrdersDropdownMenu
                      topOffset={'calc(6% + 60px'}

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
                  {/* shinoi6 */}
                </div>
                <div className="join-btn">
                  <button onClick={handleJoinClick}>Join</button>{" "}
                  {/* shinoi6 */}
                </div>
              </>
            )}
          </div>
        </nav>
        <div className="header-inner-border"></div>
        {showCategories && (
          <NavBar
            categories={categories}
            setCatFilter={setCatFilter} />
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

