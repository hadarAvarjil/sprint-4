import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";

export function HomeAppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  return (
    <header className="app-header-home full">
      <nav className="home-nav-bar">
        <NavLink to="/">
          <img
            className="logo"
            src="src\services\imgs\design.imgs\logo.png"
            alt="Navigate to Target Page"
            style={{ width: "90px", height: "70px" }}
          />
        </NavLink>
        <div className="header-options">
          {/* <NavLink to="about">About</NavLink> */}
          <NavLink to="gig">
            <div className="sign-header-btn">Explore</div>
          </NavLink>
          <NavLink to="gig">
            <div className="sign-header-btn">Sign in</div>
          </NavLink>
          <NavLink to="gig">
            <div className="join-btn">Join</div>
          </NavLink>
          {/* <NavLink to="chat">Chat</NavLink> */}
          {/* <NavLink to="review">Review</NavLink> */}

          {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

          {/* {!user && <NavLink to="login" className="login-link">Login</NavLink>} */}
        </div>
        {user && (
          <div className="user-info">
            <Link to={`user/${user._id}`}>
              {/* {user.imgUrl && <img src={user.imgUrl} />} */}
              {user.fullname}
            </Link>
            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
            <button onClick={onLogout}>logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}
