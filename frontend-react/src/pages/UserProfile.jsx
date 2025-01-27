import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { loadUser } from "../store/actions/user.actions.js";
import { loadGigs } from "../store/actions/gig.actions.js";
import { useNavigate } from "react-router-dom";

import { ProfileCard } from "../cmps/ProfileCard.jsx";
import { UserOwnerGigs } from "../cmps/UserOwnerGigs.jsx";

export function UserProfile() {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user);
    const { gigs } = useSelector((storeState) => storeState.gigModule)


    const [user, setUser] = useState(null);
    const [userGigs, setUserGigs] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // Load user and gigs data
    useEffect(() => {
        if (!loggedInUser?._id) {
            navigate("/explore")
            return;
        }

        // Load user data and gigs if not already loaded
        async function loadData() {
            try {
                const userData = await loadUser(loggedInUser._id);
                setUser(userData);
                await loadGigs()
            } catch (err) {
                console.error("Error loading data: ", err);
            }
        }

        loadData();
    }, [loggedInUser, navigate, dispatch]);

    useEffect(() => {
        if (loggedInUser?._id && gigs?.length) {
            const filteredGigs = gigs.filter((gig) => gig.ownerId === loggedInUser._id)
            setUserGigs(filteredGigs)
        }
    }, [loggedInUser, gigs])

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <section className="user-profile-main">
            <div className="user-profile flex">
                <ProfileCard user={user} />
                <div className="position-taker-UserOwnerGigs" style={{width:'772px'}}>
                <UserOwnerGigs loggedInUser={loggedInUser} gigs={userGigs} />
            </div>
            </div>
        </section>
    );
}