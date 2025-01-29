import { useEffect, useState } from "react"
import { GigPreview } from '../cmps/GigPreview.jsx'
import { useNavigate } from "react-router-dom";



export function UserOwnerGigs({ loggedInUser, gigs }) {
    const [userGigs, setUserGigs] = useState([])
    const navigate = useNavigate()

    console.log("heloooo",loggedInUser, gigs );
    


    useEffect(() => {
        if (loggedInUser?._id && gigs?.length) {
            const filteredGigs = gigs.filter((gig) => gig.ownerId === loggedInUser._id);
            setUserGigs(filteredGigs)
        }
    }, [loggedInUser, gigs])

    return (
        <div className="user-gigs-owner-container">
            <div className="user-gigs">
                    <h2 style={{textDecoration:"underline"}}>My Gigs:</h2>
                    <ul className="gigs-list">
                      {userGigs.map((gig) => (
                        <GigPreview
                          key={gig._id}
                          gig={gig}
                          isFrom="userProfile"
                          suppressOwner={true}
                        />
                      ))}
                    </ul>
                    {/* <button
                      className="create-gig-btn"
                      onClick={() => navigate('/gig/edit')}
                    >
                      Create Gig
                    </button> */}
                  </div>
         </div>
    )
}