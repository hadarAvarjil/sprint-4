import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../customHooks/ModalContext.jsx";
import { useDeviceType } from "../customHooks/DeviceTypeContext.jsx";
import outsideClick from "../customHooks/outsideClick.js";

import { SearchBar } from "./SearchBar.jsx";
import { NavBar } from "./NavBar.jsx";
import { AsideMenu } from "../cmps/AsideMenu.jsx";
import SvgIcon from "./SvgIcon.jsx";
import { category } from "../services/gig.service.js";
import { setFilter } from "../store/actions/gig.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";

export function AppHeader() {
  // מצבים מקומיים
  const [searchQuery, setSearchQuery] = useState("");
  const [headerStage, setHeaderStage] = useState(0);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState("");

  // רפרנסים
  const userInfoRef = useRef(null);
  const ordersRef = useRef(null);
  const asideMenuRef = useRef(null);
  const dispatch = useDispatch();

  // טיפול בקליקים מחוץ לאזורים מסוימים
  outsideClick(userInfoRef, () => setShowUserDropdown(false));
  outsideClick(ordersRef, () => setShowOrdersDropdown(false));
  outsideClick(asideMenuRef, () => setShowAsideMenu(false));

  // סטור רדקס
  const loggedinUser = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);

  // הוקס מותאמים
  const { openLogin, openSignup } = useModal();
  const deviceType = useDeviceType();

  // נתיבים ודפים
  const categories = category;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboardSellerPage = location.pathname === "/dashboard";
  const isDashboardBuyerPage = location.pathname === "/orders";
  const isGigPage = location.pathname.startsWith("/gig/");
  const isChatPage = location.pathname.startsWith("/chat/");
  const navigate = useNavigate();

  // סגנונות דינמיים
  const logoColor = headerStage === 0 ? "#fff" : "#404145";
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? "#fff" : "transparent",
    color: isHomePage && headerStage === 0 ? "#fff" : "#62646a",
  };
  const navBarStyles = {
    borderBottom: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
    borderTop: headerStage >= 2 ? "1px solid #e4e5e7" : "none",
    display: isDashboardSellerPage || isDashboardBuyerPage ? "none" : "",
  };
  const joinButtonStyles = {
    color: headerStage === 0 && isHomePage ? "#fff" : "#1dbf73",
    borderColor: headerStage === 0 && isHomePage ? "#fff" : "#1dbf73",
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

  // פונקציות טיפול
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

  function setCatFilter(category) {
    dispatch(setFilter({ ...filterBy, cat: category }));
  }

  // פונקציית הלוגאוט
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

  // תנאי רינדור לדפים מסוימים
  if (
    (isGigPage && deviceType === "mobile") ||
    (isChatPage && (deviceType === "mobile" || deviceType === "mini-tablet"))
  ) {
    return null;
  }

  return (
    <header
      className={`app-header flex column full ${isHomePage ? "home-page" : ""}`}
      style={headerStyles}
    >
      <nav className="main-nav">
        <div className="container flex row">
          {/* כפתור תפריט צדדי */}
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

          {/* לוגו */}
          <Link to="/" style={{ color: headerStyles.color }}>
            <h1 style={{ color: logoColor }} className="flex row">
              gigster
              <span className="flex">
                <SvgIcon iconName={"greenDotIcon"} />
              </span>
            </h1>
          </Link>

          {/* סרגל חיפוש */}
          <SearchBar
            placeholder={headerPlaceholderText}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            visibility={headerStage >= 1 ? "visible" : "hidden"}
          />

          <div className="header-options">
            <NavLink to="/become-seller">
              <div className="sign-header-btn">Become a Seller</div>
            </NavLink>
            <NavLink to="gig">
              <div className="sign-header-btn">Explore</div>
            </NavLink>
            <NavLink to="gig">
              <div className="sign-header-btn">Sign in</div>
            </NavLink>
            <NavLink to="gig">
              <div className="join-btn">Join</div>
            </NavLink>
          </div>
        </div>
      </nav> 
      

      {/* סרגל ניווט נוסף */}
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
