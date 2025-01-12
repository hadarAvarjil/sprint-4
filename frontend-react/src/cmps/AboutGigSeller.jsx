// import { userPreviewGigDetails } from '../cmps/UserPreviewGigDetails'
import { useSelector } from 'react-redux'

export function AboutGigSeller({ owner }) {
    if (!owner) return null


    return (
        <div className="about-gig-seller">
            <div className="gig-seller-details">
                <div className="gig-seller-row-from">
                    <strong>From</strong>
                    <p>{owner.from}</p>
                </div>
                <div className="gig-seller-row-member-since">
                    <strong>Member since</strong>
                    <p>{owner.createAt}</p>
                </div>
                <div className="gig-seller-row-avg">
                    <strong>Avg. response time</strong>
                    <p>about 3 hours ago</p>
                </div>
                <div className="gig-seller-row-last-delivery">
                    <strong>Last delivery</strong>
                    <p>January 2025</p>
                </div>
                <div className="gig-seller-row-languages">
                    <strong>Languages</strong>
                    <p>{owner.languages.join(', ')}</p>
                </div>
            </div>
        </div >
    )
}
