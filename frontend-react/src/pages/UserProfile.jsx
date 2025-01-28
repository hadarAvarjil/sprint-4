import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from "../store/actions/user.actions.js";
import { loadGigs } from "../store/actions/gig.actions.js";
import { useNavigate } from "react-router-dom";

import { ProfileCard } from "../cmps/ProfileCard.jsx";
import { UserOwnerGigs } from "../cmps/UserOwnerGigs.jsx";
import { AddImg } from "../cmps/AddImg.jsx";

export function UserProfile() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const { gigs } = useSelector((storeState) => storeState.gigModule);

  const [user, setUser] = useState(null);
  const [userGigs, setUserGigs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load user and gigs data
  useEffect(() => {
    if (!loggedInUser?._id) {
      navigate("/explore");
      return;
    }

    // Load user data and gigs if not already loaded
    async function loadData() {
      try {
        const userData = await loadUser(loggedInUser._id);
        await loadGigs({});
        setUser(userData);
      } catch (err) {
        console.error("Error loading data: ", err);
      }
    }

    loadData();
  }, [loggedInUser, navigate, dispatch]);

  if (!user) {
    return <div className="loading"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>;
  }

  return (
    <section className="user-profile-main">
      <div className="user-profile flex">
        <ProfileCard user={user} />
        <div
          className="position-taker-UserOwnerGigs"
          style={{ width: "772px" }}
        >
          <div className="profile-become-seller-ad">
            <h2>
              Become a seller by creating your own gig
             
            </h2>
            {/* <div className="create-gig-btn-container"> */}
            <button
              onClick={() => navigate("/gig/edit")}
              className="create-gig-btn"
              style={{
        
              }}
            >
              <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738100584/create-svgrepo-com_et16mj.svg'></AddImg>
              Create Gig
            </button>

            {/* <button
                      className="create-gig-btn"
                      onClick={() => navigate('/gig/edit')}
                    >
                      Create Gig
                    </button> */}
            {/* </div> */}
          </div>
          
          <UserOwnerGigs loggedInUser={loggedInUser} gigs={gigs} />
        </div>
      </div>
    </section>
  );
}
