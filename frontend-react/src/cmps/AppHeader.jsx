import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'
import outsideClick from '../customHooks/outsideClick.js'

import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'
import { AsideMenu } from '../cmps/AsideMenu.jsx'
import SvgIcon from './SvgIcon.jsx'
import { category } from '../services/gig.service.js'
import { setFilter } from '../store/actions/gig.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
  // מצבים מקומיים
  const [searchQuery, setSearchQuery] = useState('')
  const [headerStage, setHeaderStage] = useState(0)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false)
  const [showAsideMenu, setShowAsideMenu] = useState(false)
  const [notification, setNotification] = useState(false)
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState('')

  // רפרנסים
  const userInfoRef = useRef(null)
  const ordersRef = useRef(null)
  const asideMenuRef = useRef(null)
  
  // טיפול בקליקים מחוץ לאזורים מסוימים
  outsideClick(userInfoRef, () => setShowUserDropdown(false))
  outsideClick(ordersRef, () => setShowOrdersDropdown(false))
  outsideClick(asideMenuRef, () => setShowAsideMenu(false))

  // סטור רדקס
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

  // הוקס מותאמים
  const { openLogin, openSignup } = useModal()
  const deviceType = useDeviceType()

  // נתיבים ודפים
  const categories = category
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isDashboardSellerPage = location.pathname === '/dashboard'
  const isDashboardBuyerPage = location.pathname === '/orders'
  const isGigPage = location.pathname.startsWith('/gig/')
  const isChatPage = location.pathname.startsWith('/chat/')
  const navigate = useNavigate()

  // סגנונות דינמיים
  const logoColor = headerStage === 0 ? '#fff' : '#404145'
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? '#fff' : 'transparent',
    color: isHomePage && headerStage === 0 ? '#fff' : '#62646a',
  }
  const navBarStyles = {
    borderBottom: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
    borderTop: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
    display: (isDashboardSellerPage || isDashboardBuyerPage) ? 'none' : '',
  }
  const joinButtonStyles = {
    color: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
    borderColor: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
  }

  // שימוש באפקטים
  useEffect(() => {
    if (!isHomePage) {
      setHeaderStage(2)
      setHeaderPlaceholderText('Find services...')
    } else {
      setHeaderStage(0)
      setHeaderPlaceholderText('What service are you looking for today?')
    }
  }, [deviceType, isHomePage])

  useEffect(() => {
    const handleScroll = () => {
      if (deviceType !== 'mini-tablet' && deviceType !== 'mobile') {
        const newStage = window.scrollY < 50 ? 0 : window.scrollY < 150 ? 1 : 2
        setHeaderStage(newStage)
      }
    }
    if (isHomePage && deviceType !== 'mini-tablet' && deviceType !== 'mobile') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage, deviceType])

  // פונקציות טיפול
  function handleSearchChange(e) {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!searchQuery) return
    setFilter({ ...filterBy, search: searchQuery })
    // navigate(`/explore`)
    setSearchQuery('')
  }

  function setCatFilter(category) {
    setFilter({ ...filterBy, cat: category })
  }

  // פונקציית הלוגאוט
  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg('Bye now')
    } catch (err) {
      console.error('Logout error:', err)
      showErrorMsg('Cannot logout. Please try again.')
    }
  }

  // תנאי רינדור לדפים מסוימים
  if (
    (isGigPage && deviceType === 'mobile') ||
    (isChatPage && (deviceType === 'mobile' || deviceType === 'mini-tablet'))
  ) {
    return null
  }

  return (
    <header
      className={`app-header flex column full ${isHomePage ? 'home-page' : ''}`}
      style={headerStyles}
    >
      <nav className="main-nav">
        <div className="container flex row">
          {/* כפתור תפריט צדדי */}
          <div
            className={`dropdown flex ${notification ? 'notification' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setShowAsideMenu(!showAsideMenu)
              setNotification(false)
            }}
            ref={asideMenuRef}
          >
            <SvgIcon
              iconName={
                headerStage === 0 ? 'headerDropdownWhite' : 'headerDropdownGray'
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
                <SvgIcon iconName={'greenDotIcon'} />
              </span>
            </h1>
          </Link>

          {/* סרגל חיפוש */}
          <SearchBar
            placeholder={headerPlaceholderText}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            visibility={headerStage >= 1 ? 'visible' : 'hidden'}
          />
          <ul className="nav-links flex">
            <li>
              <NavLink to="/explore" style={{ color: headerStyles.color }}>
                Explore
              </NavLink>
            </li>

            {/* קישורים למשתמש מחובר */}
            {loggedinUser ? (
              <>
                <li
                  className="orders-info"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowOrdersDropdown(!showOrdersDropdown)
                  }}
                  ref={ordersRef}
                >
                  <button
                    className="header-btn orders"
                    style={{ color: headerStyles.color }}
                  >
                    Orders
                  </button>
                  {showOrdersDropdown && (
                    <BuyerOrdersDropdown
                      loggedInUser={loggedinUser}
                      onClose={() => setShowOrdersDropdown(false)}
                    />
                  )}
                </li>

                {/* קישור לצ'אט */}
                <li>
                  <Link
                    to={`/chat/${loggedinUser._id}`}
                    className={headerStage === 0 ? 'clr-one' : 'clr-two'}
                  >
                    <SvgIcon iconName={'appEnvelopeIcon'} />
                  </Link>
                </li>

                {/* מידע על המשתמש */}
                <li
                  className="user-info flex"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowUserDropdown(!showUserDropdown)
                  }}
                  ref={userInfoRef}
                >
                  {loggedinUser.imgUrl && (
                    <img src={loggedinUser.imgUrl} alt={`${loggedinUser.fullname}'s avatar`} />
                  )}
                  {loggedinUser.fullname}
                  {showUserDropdown && (
                    <UserDropdown
                      loggedInUser={loggedinUser}
                      onClose={() => setShowUserDropdown(false)}
                    />
                  )}
                </li>

                {/* כפתור לוגאוט */}
                <li>
                  <button onClick={onLogout} className="header-btn logout" aria-label="Logout" style={{ color: headerStyles.color }}>
                    Logout
                  </button>
                </li>

                {/* קישור לאדמין אם המשתמש הוא אדמין */}
                {loggedinUser.isAdmin && (
                  <li>
                    <NavLink to="/admin" style={{ color: headerStyles.color }}>
                      Admin
                    </NavLink>
                  </li>
                )}
              </>
            ) : (
              /* קישורים למשתמשים שאינם מחוברים */
              <>
                <li>
                  <NavLink to="/become-seller" style={{ color: headerStyles.color }}>
                    Become a Seller
                  </NavLink>
                </li>

                <li>
                  <button
                    className="header-btn login"
                    onClick={openLogin}
                    style={{ color: headerStyles.color }}
                  >
                    Sign In
                  </button>
                </li>

                <li>
                  <button
                    className="header-btn join"
                    onClick={openSignup}
                    style={joinButtonStyles}
                  >
                    Join
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* סרגל ניווט נוסף */}
      <NavBar
        categories={categories}
        display={headerStage === 2 ? 'flex' : 'none'}
        headerStage={headerStage}
        setCatFilter={setCatFilter}
        style={navBarStyles}
      />
    </header>
  )
}
