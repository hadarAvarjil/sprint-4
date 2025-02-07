import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useModal } from "../customHooks/ModalContext.jsx";
import { NavLink } from "react-router-dom";

import { logout } from "../store/actions/user.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import SvgIcon from "./SvgIcon.jsx";

export function AsideMenu({ loggedInUser, onClose }) {
  const navigate = useNavigate();
  const { openLogin, openSignup } = useModal();
  const handleLoginClick = () => {
    setIsSignDivVisible(true);
  };
  const [isSignDivVisible, setIsSignDivVisible] = useState(false);
  const [isJoinDivVisible, setIsJoinDivVisible] = useState(false);
  const handleOpenSignDiv = () => {
    setIsSignDivVisible(true);
  };

  const handleOpenJoinDiv = () => {
    setIsJoinDivVisible(true);
  };
  const handleCloseModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsSignDivVisible(false);
      setIsJoinDivVisible(false);
    }
  };

  async function onLogout() {
    try {
      navigate("/");
      await logout();
    } catch (err) {
      showErrorMsg(
        {
          title: "FAILED TO LOGOUT",
          body: `This is awkward...`,
        },
        {
          userMsgLeft: "55%",
          messageAreaPadding: "2em 1.5em 2em 8em",
          msgStatusTranslateX: "-12em",
        }
      );
    }
  }

  return (
    <main className="aside-menu-wrapper flex">
      <section
        className="aside-menu flex column"
        onClick={(e) => e.stopPropagation()}
      >
        {loggedInUser ? (
          <>
            <div className="top-icons flex row">
              <div className="user-info flex row">
                <img src={loggedInUser.imgUrl} alt="user" />
                <span>{loggedInUser.username}</span>
              </div>
            </div>
            <Link to={`/profile/${loggedInUser._id}`} onClick={onClose}>
              Profile
            </Link>

            <NavLink to="gig">
              <div
                className="sign-burger-header-btn burger-explore-btn"
                onClick={onClose}
              >
                Explore
              </div>
            </NavLink>

            <Link to="/dashboard" onClick={onClose}>
              Dashboard
            </Link>

            <Link to="/orders" onClick={onClose}>
              Orders
            </Link>
            <Link to="/terms" onClick={onClose}>
              Terms Of Service
            </Link>
            <Link to="/privacy" onClick={onClose}>
              Privacy Policy
            </Link>
            <button className="logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
       <Link to="/" >
              <h1 style={{ color: "#404145",marginBottom:'30px' }} className="logo flex row">
                gigster
                <span className=" dot-icon flex">
                  <SvgIcon iconName={"greenDotIcon"} />
                </span>
              </h1>
            </Link>
            <NavLink to="gig">
              <div
                className="sign-burger-header-btn burger-explore-btn"
                onClick={onClose}
              >
                Explore
              </div>
            </NavLink>
            <Link to="/terms" onClick={onClose}>
              Terms Of Service
            </Link>
            <Link to="/privacy" onClick={onClose}>
              Privacy Policy
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
