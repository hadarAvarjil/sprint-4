import { useEffect, useState } from "react"
import { GigPreview } from '../cmps/GigPreview.jsx'
import { useNavigate } from "react-router-dom";
import  { AddImg } from '../cmps/AddImg.jsx'



export function UserOwnerGigs({ loggedInUser, gigs }) {
    const [userGigs, setUserGigs] = useState([])
    const navigate = useNavigate()

    console.log(loggedInUser, gigs );
    


    useEffect(() => {
        if (loggedInUser?._id && gigs?.length) {
            const filteredGigs = gigs.filter((gig) => gig.ownerId === loggedInUser._id);
            setUserGigs(filteredGigs)
        }
    }, [loggedInUser, gigs])
    console.log('helololololo', userGigs)

    if (userGigs.length === 0) {
      return(
        <div className="user-gigs-owner-container">
        <div className="user-gigs">
                <h2>My Gigs</h2>
          <div className="no-gigs-div"> 
            <h3>You dont have any gigs...</h3>
<AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738336463/bc9ae1fd5c38fdc7fda900212ba10319504284ec_1_igeq5v.svg'></AddImg>

          </div>
              </div>
     </div>
      )
    }
    return (
        <div className="user-gigs-owner-container">
            <div className="user-gigs">
                    <h2>My Gigs</h2>
                    <ul className="gigs-list">
                      {userGigs.map((gig) => (
                        <GigPreview
                          key={gig._id}
                          gig={gig}
                          isFrom="user-profile-gigs-owner"
                          suppressOwner={true}
                        />
                      ))}
                    </ul>
                  </div>
         </div>
    )
}