import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../store/actions/user.actions.js";
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
    return <div>Loading...</div>;
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
              {/* Ready To Earn?{" "} */}
              {/* <span style={{fontSize:'20px'}}> */}
              {/* <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738001580/svg_xml_base64_PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ2YXIoLS1hOHJlMjUxaSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2R_eed29c.svg'></AddImg> */}
              Become a seller by creating your own gig
              {/* </span> */}
              {/* <span className="profile-become-seller-ad-span">
                {" "}
                Create a Gig{" "}
                <span style={{ WebkitTextStroke: " 1px #1D3369" }}>!</span>
              </span>{" "} */}
            </h2>
            {/* <div className="create-gig-btn-container"> */}
            <button
              onClick={() => navigate("/gig/edit")}
              className="create-gig-btn"
              style={{
                // "--slist": "#1dbf73, black,blue",
                margin: "auto",
                marginTop: "-6px",
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
