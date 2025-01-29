import { useEffect, useState } from "react"
import { GigPreview } from '../cmps/GigPreview.jsx'
import { useNavigate } from "react-router-dom";
import { AddImg } from "./AddImg.jsx";


export function UserOwnerReviews({ loggedInUser, gigs }){
    const [userGigs, setUserGigs] = useState([])
    const navigate = useNavigate()

    console.log(loggedInUser, gigs );
    if(!loggedInUser.reviews){
        
    return(
        <div className="user-owener-reviews">
<h2>Reviews from freelancers</h2> 
<div className="no-reviews-msg">

    <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1738162829/svg_xml_base64_PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjYzIiB2aWV3Qm94PSIwIDAgMTQwIDYzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMy44MDI2IDQ2LjI4MTdDMTYuNzk4NyA0Ni43NDUgMTAuOTQyNyA2MS4_vxhg0z.svg"/>
    <h2>{loggedInUser.userName} doesn't have any reviews yet.</h2> 
</div>
        </div>
    )
}

}