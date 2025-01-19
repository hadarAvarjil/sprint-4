import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.actions"
import { NavBar } from "./NavBar"
import { SignDiv } from "./SignDiv"
import { JoinDiv } from "./JoinDiv"
import SvgIcon from "./SvgIcon.jsx"
import { setFilter } from "../store/actions/gig.actions.js"
import { SearchBar } from "./SearchBar.jsx"

export function HomeAppHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  const [showMiniHeader, setShowMiniHeader] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  async function onLogout() {
    try {
      await logout()
      navigate("/")
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const greenDiv = document.querySelector(".green-search-div")
      const greenDivOffset = greenDiv?.offsetTop || 0
      const scrollPosition = window.scrollY-200

      setShowMiniHeader(scrollPosition > greenDivOffset)

      const categoriesOffset = greenDivOffset + 450
      setShowCategories(scrollPosition > categoriesOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, [])

  const [isSignDivVisible, setIsSignDivVisible] = useState(false)
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false)

  const handleOpenSignDiv = () => {
    setIsSignDivVisible(true)
  }
  const handleOpenJoinDiv = () => {
    setIsJoinDivVisible(true)
  }

  const handleCloseSignDiv = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false)
    }
  }

  const handleCloseJoinDiv = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsJoinDivVisible(false)
    }
  }

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!searchQuery) return
    setFilter({ ...filterBy, search: searchQuery })
    navigate(`/gig`)
    setSearchQuery("")
  }

  return (
    <>
      <header className="app-header-home full">
        <nav className="home-nav-bar">
          <NavLink to="/">
            <h1
              style={{
                color: "#404145",
                fontSize: "30px",
                lineHeight: "24px",
                fontWeight: "bold",
                fontFamily: "$fiverr-defult-font",
              }}
              className="flex row"
            >
              gigster
              <span className="flex">
                <SvgIcon iconName={"greenDotIcon"} />
              </span>
            </h1>
          </NavLink>

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
            <NavLink to="/orders">
              <div className="sign-header-btn big-resp-br">Orders</div>
            </NavLink>
            <NavLink to="/profile">
              <div className="sign-header-btn big-resp-br">my-profile</div>
            </NavLink>
            <NavLink to="gig">
              <div className="sign-header-btn big-resp-br">Explore</div>
            </NavLink>

            {isSignDivVisible && (
              <div className="modal-overlay" onClick={handleCloseSignDiv}>
                <SignDiv />
              </div>
            )}
            {isJoinDivVisible && (
              <div className="modal-overlay" onClick={handleCloseJoinDiv}>
                <JoinDiv />
              </div>
            )}

            <div onClick={handleOpenSignDiv} className=" big-resp-br sign-header-btn">
              Sign in
            </div>

            <div onClick={handleOpenJoinDiv} className="join-btn">
              Join
            </div>

            {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </div>
          {user && (
            <div className="user-info">
              <Link to={`user/${user._id}`}>{user.fullname}</Link>
              <button onClick={onLogout}>logout</button>
            </div>
          )}
        </nav>
        {showCategories && (
          <NavBar
            categories={[
              "Graphics & Design",
              "Programming & Tech",
              "Digital Marketing",
              "Video & Animation",
              "Writing & Translation",
              "Music & Audio",
              "Business",
            ]}
          />
        )}
      </header>
    </>
  )
}
