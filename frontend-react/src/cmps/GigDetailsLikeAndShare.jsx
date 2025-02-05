
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import SvgIcon from './SvgIcon.jsx'



export function GigDetailsLikeAndShare({gig}) {

    console.log(gig.likedByUsers);
    console.log('heyyy');
    
    return (
        <div className="gig-details-likeAndShare flex">
            <span className="heart" onClick={(e) => likeGig(e)} title='like the gig'>
                {gig.likedByUsers.length > 0 ? (
                    <SvgIcon iconName={'heartDetailsFull'} />
                ) : (
                    <SvgIcon iconName={'heartDetailsEmpty'} />
                )}
            </span>
            <span className="liked-count flex">
                {gig.likedByUsers.length}
            </span>
            <button className="share-gig flex" title="share the gig">
                <SvgIcon iconName={'share'} />
            </button>
        </div>
    )
}